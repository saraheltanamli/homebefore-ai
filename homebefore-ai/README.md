# HomeBefore AI — GCU student prototype

A bilingual housing-stability planning web app built with Next.js. Features: assessment, Gemini-powered plan generation, fictional demo, budget calculator, eviction information, privacy/disclaimer.

## Free hosting setup (GitHub + Vercel)
1. Create a free GitHub account at https://github.com and a free Vercel account at https://vercel.com. No paid domain required.
2. Unzip this project. On GitHub create a **new repository** named `homebefore-ai`. Use **Add file > Upload files** to upload the project contents (the `app` directory and files at the root). If your GitHub interface does not accept folders, use GitHub Desktop or Git to push the project instead.
3. On Vercel choose **Add New > Project**, import your GitHub repository, select Next.js (normally detected automatically), then deploy.
4. For actual AI responses, create a Gemini API key using https://aistudio.google.com/apikey. Free-tier access, rate limits, model availability and billing requirements vary by account and region; verify the displayed terms before proceeding. **Do not enable billing if you require zero cost.**
5. In Vercel project **Settings > Environment Variables**, add `GEMINI_API_KEY` with your key as the value. Never put this key in GitHub or the browser. Optionally add `GEMINI_MODEL` if your available free-tier model differs. Redeploy under **Deployments** after adding the variable.
6. Open the Vercel deployment URL in a private/incognito browser window. Click **Load fictional demo**, then **Generate my AI plan**. Confirm it returns a plan. Test the budget calculator and Español toggle.
7. Copy the **actual** deployment URL into slide 9 of your PowerPoint and take screenshots for slide 10. Example URLs shown in guides are not your real URL.

## Local development (optional)
Install Node.js LTS, run `npm install`, create `.env.local` containing your API key, then `npm run dev`. Open http://localhost:3000.

## Privacy and limitations
This is an educational prototype, not a production housing service. It does not save assessments to a database. Requests go through the Vercel server to Google's Gemini API. Avoid entering private or identifying data. Logs, provider retention policies, and platform security settings should be reviewed before use with real people. It does not check current program availability or provide legal advice. Public deployments may exhaust free API quotas; avoid sharing widely. A production service would require abuse controls, rigorous safety reviews, vetted resource databases, accessibility testing, and legal/privacy review.
