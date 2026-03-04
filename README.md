# ProResume: AI-Powered Resume Maker

A full-stack web application built with Next.js that helps users create highly professional resumes using AI (Groq API) and stores them securely in Supabase.

## Features
- **Modern User Interface**: Built with Tailwind CSS and Lucide React.
- **Dynamic Forms**: Comprehensive payload generation using React Hook Form + Zod.
- **AI Integration**: Groq API leverages Llama 3 to enhance mundane work experiences into action-oriented professional bullet points.
- **Database Storage**: Supabase integration properly stores user records.
- **Export capabilities**: Built-in CSS optimized for printing exactly as A4 size to PDF.

## Local Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Open `.env.local` and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   GROQ_API_KEY=your_groq_key
   ```

3. **Database Schema (Supabase)**
   Run the following SQL in your Supabase SQL Editor:
   ```sql
   create table resumes (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     personal_info jsonb not null,
     experience jsonb not null,
     education jsonb not null,
     skills text[] not null,
     generated_content jsonb
   );
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

## Deploying & Version Control (GitHub)

To push this codebase to your GitHub account:

1. Create a new empty repository on [GitHub](https://github.com/new).
2. Run the following commands:
   ```bash
   git add .
   git commit -m "Initial commit: Full stack AI resume maker"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
