<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1g3mfu35x5zBLQUy7i36wNpsgGGdNzY-x

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Content workflow (static, no hosted backend)

The site reads `public/data/*.json` and `public/files/**`. There is no live PocketBase server.

**Edit content**
1. Download PocketBase, put your backup contents in `pb_data/`, run `./pocketbase serve`.
2. Edit in the dashboard at http://127.0.0.1:8090/_/
3. `npm run export-data`, then commit and push `public/data` and `public/files`.

**Contact form** goes through [Web3Forms](https://web3forms.com) (free, emails you the message).
Create an access key and set `VITE_WEB3FORMS_KEY` in your host's build environment (and in `.env.local` for dev).
