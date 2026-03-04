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

        const systemPrompt = `You are an expert resume writer and career coach. Your job is to take raw user input about their work experience and skills, and generate a polished, highly professional resume. 
Enhance the work experience descriptions into powerful, action-oriented bullet points (using strong verbs, quantifying results where possible).
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
Experience: ${JSON.stringify(parsedData.experience)}
Education: ${JSON.stringify(parsedData.education)}
Skills: ${parsedData.skills}

Please process this data and provide the JSON output.`;

        // Call OpenRouter API via OpenAI SDK
        const completion = await openai.chat.completions.create({
            model: 'google/gemini-2.0-flash-001',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' }
        });

        const aiContent = completion.choices[0]?.message?.content;

        if (!aiContent) {
            throw new Error("Failed to generate AI content");
        }

        const generatedResume = JSON.parse(aiContent);

        // Save to Supabase
        const { data: insertedData, error: dbError } = await supabase
            .from('resumes')
            .insert([
                {
                    personal_info: parsedData.personalInfo,
                    experience: parsedData.experience,
                    education: parsedData.education,
                    skills: parsedData.skills.split(',').map(s => s.trim()),
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
