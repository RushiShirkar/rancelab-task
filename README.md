## Vercel link
Vercel Link = https://rancelab-task.vercel.app/

## .env file
DATABASE_URL
BREVO_API_KEY
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_BUCKET_NAME=

## IDE Name
IDE = Antigravity

## AI Tools and Models
1. Gemini 3 Pro
2. Claude Sonnet 4.5

## Prompts
Visit this Link - https://docs.google.com/document/d/1ABod3OYVWBpCzDIxpNuMyuB2wNk8mr28UdBsC5S9qD0/edit?usp=sharing

## Mistakes AI made that I caught and corrected
- Suggested an incorrect npm package name for Brevo and invalid code. So, I follow docs and use cURL
- Tried generating Prisma client into a custom folder that Vercel couldn’t bundle
- Some early component suggestions were too abstract and were simplified manually

I validated database connections, import paths, auth flow logic, and serverless performance considerations.

## Edge cases and error scenarios
- Preventing login if user is not registered
- Protected cookies
- Disabled submit while loading
- Graceful handling of unauthorized server IP errors (Brevo)
- Buttons fully keyboard-accessible
- Forms wrapped with semantic field grouping