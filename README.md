# brew.

A mobile-first web application for home brewers to follow, customize, and time filter coffee recipes. Designed for touch-friendly use during brewing, with support for multiple methods, multi-stage pours, and recipe sharing via `localStorage`.

## Features

### Recipe Viewer & Timer

- Displays a brewing recipe including: Brewer type, Coffee dose (g), Water weight (ml), Ratio, Temperature (°C), Grind size, Bloom time, Multi-stage pour schedule (stage name, water weight, duration), and Drain time.
- Central **countdown timer** that changes color based on the current stage.
- Auto-progresses by default with an optional manual mode to advance stages.
- Provides audio cues at each stage transition.

### Custom Recipe Editor

- Create and edit recipes via a structured UI.
- Input fields for brewer type, coffee dose, water weight, ratio (linked), temperature, bloom time, drain time, and grind size.
- Functionality to add/remove multi-stage pour stages.
- Recipes are stored in `localStorage` and are versioned JSON.
- Can export all recipes as a single `.json` file.
- Can import recipes via `.json` file or raw paste.

### Recipe Management

- View a list of saved recipes, grouped by brewer type.
- Options to tap to start brewing, edit, or delete recipes.
- Includes placeholder default recipes per brewer.

### Timer Screen

- Minimal, full-screen countdown display.
- Highlights the current stage.
- Integrates audio cues (short chime or beep).
- Fluid animation for time flow (e.g., progress ring).
- Manual pause/next functionality available if auto-progress is off.

## Technologies Used

- **Platform**: Next.js (App Router)
- **Frontend Only**: No backend or database
- **UI Library**: shadcn/ui
- **Runtime**: Bun
- **Language**: TypeScript

## Getting Started

First, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Credits

- UI Completed Status Alert Notification SFX001.wav by Headphaze -- https://freesound.org/s/277033/ -- License: Attribution 4.0
