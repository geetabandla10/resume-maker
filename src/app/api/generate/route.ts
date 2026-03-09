import { NextResponse } from 'next/server';
import { openai } from '@/lib/openRouterClient';
import { supabase } from '@/lib/supabaseClient';
import { resumeFormSchema } from '@/types/resume';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const parsedData = resumeFormSchema.parse(body);

        const systemPrompt = `You are an expert resume writer and career coach. Your job is to take raw user input about their education, work experience (if any), and skills, and generate a polished, highly professional resume. 

If the user has provided work experience, enhance the descriptions into powerful, action-oriented bullet points (using strong verbs, quantifying results where possible).
If the user HAS NOT provided work experience (e.g., they are a student or fresher), focus heavily on their education, academic projects, and skills to create a compelling entry-level profile.

Generate a compelling professional summary based on the user's overall profile.

Output your response ONLY as a JSON object matching this structure exactly:
{
  "summary": "Professional summary paragraph...",
  "enhancedExperience": [
    {
      "id": "original_id_from_input",
      "company": "Company Name",
      "position": "Job Title",
      "dateRange": "Start - End",
      "bullets": ["Action-oriented bullet 1", "Action-oriented bullet 2", "Action-oriented bullet 3"]
    }
  ]
}`;

        const userPrompt = `Here is the user's data:
Personal Info: ${JSON.stringify(parsedData.personalInfo)}
Experience: ${parsedData.experience && parsedData.experience.length > 0 ? JSON.stringify(parsedData.experience) : "None provided (Student/Fresher profile)"}
Education: ${JSON.stringify(parsedData.education)}
Skills: ${parsedData.skills}

Please process this data and provide the JSON output. If Experience is "None provided", return an empty array for "enhancedExperience".`;

        // Try generation with a more stable free model
        let completion;
        const models = [
            'google/gemma-3-12b-it:free',
            'mistralai/mistral-7b-instruct:free',
            'meta-llama/llama-3.3-70b-instruct:free',
            'google/gemini-2.0-flash-exp:free',
            'qwen/qwen-2.5-72b-instruct:free',
            'openrouter/free'
        ];

        let aiContent = '';
        let errorDetails = '';

        for (const model of models) {
            try {
                console.log(`Attempting generation with model: ${model}`);
                completion = await openai.chat.completions.create({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    // Not all models support json_object, so we parse it manually
                    // response_format: { type: 'json_object' } 
                }, { timeout: 15000 }); // Increased timeout slightly

                aiContent = completion.choices[0]?.message?.content || '';
                if (aiContent) {
                    console.log(`Success with model: ${model}`);
                    break;
                }
            } catch (err: any) {
                console.error(`Error with model ${model}:`, err.message);
                errorDetails += `${model}: ${err.message}; `;
                continue;
            }
        }

        if (!aiContent) {
            throw new Error(`AI Generation failed with all attempted models. Errors: ${errorDetails}`);
        }

        // Robust JSON extraction and repair
        let generatedResume;
        try {
            // Find the first '{' and last '}' to extract the JSON object
            const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
            let jsonString = jsonMatch ? jsonMatch[0] : aiContent;

            // Simple repair for truncated JSON
            const openBraces = (jsonString.match(/\{/g) || []).length;
            const closeBraces = (jsonString.match(/\}/g) || []).length;
            const openBrackets = (jsonString.match(/\[/g) || []).length;
            const closeBrackets = (jsonString.match(/\]/g) || []).length;

            if (openBrackets > closeBrackets) {
                jsonString += ' ]'.repeat(openBrackets - closeBrackets);
            }
            if (openBraces > closeBraces) {
                jsonString += ' }'.repeat(openBraces - closeBraces);
            }

            generatedResume = JSON.parse(jsonString);
        } catch (parseError) {
            console.error('JSON Parse Error. Content:', aiContent);
            throw new Error('Failed to parse AI response as JSON');
        }

        // Save to Supabase
        const { data: insertedData, error: dbError } = await supabase
            .from('resumes')
            .insert([
                {
                    personal_info: parsedData.personalInfo,
                    experience: parsedData.experience,
                    education: parsedData.education,
                    skills: parsedData.skills.split(',').map(s => s.trim()),
                    template_id: parsedData.templateId,
                    generated_content: generatedResume
                }
            ])
            .select('id')
            .single();

        if (dbError) {
            console.error('Supabase Error:', dbError);
            throw new Error('Failed to save to database: ' + dbError.message);
        }

        return NextResponse.json({ success: true, id: insertedData.id });

    } catch (error: any) {
        console.error('Generate Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
