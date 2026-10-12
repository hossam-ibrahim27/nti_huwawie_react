# VisionAI Frontend

Web app for VisionAI: a cited clinical assistant for cataract care and an eye-image screening tool. It talks to the [VisionAI backend](../FastAPI/README.md) over HTTP.

> **Disclaimer:** VisionAI summarises a published guideline and runs an automated screening model. It is not a medical device and does not replace clinical judgement or a diagnosis by a qualified ophthalmologist.

## Pages

| Route | Page | What it does |
|-------|------|--------------|
| `/` | Home | Hero, covered topics and a call to action |
| `/clinical-rag` | Clinical Assistant | Ask a question, get a cited answer from NICE NG77, with a source table, confidence and retrieved evidence |
| `/eye-detection` | Eye Detection | Upload an eye photo and see the detection drawn on the image, with a severity banner |

## Features

- Light and dark theme with a toggle (follows the system setting by default, no flash on load)
- Suggested questions, loading skeletons and clear error messages
- Retrieved-evidence panel with relevance bars per chunk
- Drag-and-drop image upload with client-side type and size checks (JPG, PNG or WEBP, up to 10 MB)
- Bounding boxes and per-detection confidence over the uploaded image
- Responsive layout with a mobile menu

## Tech stack

- React and React Router (framework mode)
- Vite and TypeScript
- Tailwind CSS v4 (theme tokens, dark variant and animations live in `app/app.css`)
- lucide-react icons

## Project structure

```
React/
├── app/
│   ├── components/      # Layout, Navbar, Hero, Services, CtaBanner, Footer, ChatbotFab, ThemeToggle
│   ├── interfaces/      # clinical.ts, detection.ts (API response types)
│   ├── lib/             # eyeClasses.ts (class id -> label, advice, severity)
│   ├── pages/           # ClinicalDashboard.tsx, EyeDetection.tsx
│   ├── routes/          # home.tsx, clinical-rag.tsx, eye-detection.tsx
│   ├── services/        # api.ts (askQuestion, detectImage)
│   ├── app.css
│   ├── root.tsx
│   └── routes.ts
├── package.json
└── ...
```

## Getting started

Requirements: Node.js 20+ and npm (or yarn).

```bash
cd React
npm install
```

Create a `.env` file in `React/`:

```env
VITE_API_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`. The backend must be running at `VITE_API_URL` (see the backend README).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (TODO: confirm in `package.json`) |
| `npm run typecheck` | Generate route types and run TypeScript (TODO: confirm in `package.json`) |

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the backend, without a trailing slash. It is baked in at **build time**, so rebuild or redeploy after changing it |

## Customising the eye classes

The mapping from the model's class ids to labels, advice text and severity is in `app/lib/eyeClasses.ts`:

| ID | Meaning | Severity |
|----|---------|----------|
| 0 | Cataract (not urgent, monitor) | Monitor |
| 1 | TODO | Monitor |
| 2 | TODO | Monitor |
| 3 | Immediate surgical intervention may be needed | Urgent |

The ids must match the class order used when the model was trained (the `data.yaml` of the training run).

## Deploy (Vercel)

1. Push the repository to GitHub.
2. Import it in Vercel and set **Root Directory** to `React`. This also keeps Vercel from trying to build the Python backend.
3. Under **Settings → Environment Variables** add `VITE_API_URL` with the public backend URL (HTTPS).
4. Redeploy.
5. Add the Vercel domain to the CORS `allow_origins` list in the backend.

## Troubleshooting

| Problem | Cause and fix |
|---------|---------------|
| Build works locally but fails on Vercel with an unresolved import | A file was never pushed. Check `git status` and `git ls-files`. A broad `lib/` rule in `.gitignore` also ignores `app/lib`; use `/lib/` instead. |
| Import works on Windows or macOS but not on Vercel | Linux file names are case-sensitive. Make the import match the file name exactly. |
| Requests fail with a CORS error | Add the frontend origin to the backend's `allow_origins`. |
| Requests are blocked from the deployed site | The backend URL must be HTTPS, because browsers block HTTP calls from an HTTPS page. |
| Changing `VITE_API_URL` has no effect | It is read at build time. Redeploy after changing it. |
| The Clinical Assistant page is blank | The route file needs a default export and must be registered in `app/routes.ts`. |
| Detection returns an error about the file | Use a JPG, PNG or WEBP image under 10 MB. |

## Limitations

- Answers are limited to NICE guideline NG77.
- The detection model is a screening aid trained on a small public dataset. Results can be wrong, and non-eye photos can still produce a detection. Always confirm with a qualified ophthalmologist.

## Credits

- [NICE guideline NG77: Cataracts in adults](https://www.nice.org.uk/guidance/ng77)
- [React Router](https://reactrouter.com), [Tailwind CSS](https://tailwindcss.com), [lucide](https://lucide.dev)
