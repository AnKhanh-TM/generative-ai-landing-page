# Generative AI Masterclass Landing Page

This is the landing page for the Generative AI Masterclass, built with React, Vite, and TailwindCSS. It includes detailed course information, instructor profiles, testimonials, and a registration form integrated with Google Sheets.

## Features

- **Responsive Design**: Looks great on desktop and mobile.
- **Dynamic Content**: Sections for Curriculum, Instructors, Testimonials, and Pricing.
- **Registration Form**: Submits data to a Google Sheet via Google Apps Script.
- **Visual Effects**: Particle background and reveal-on-scroll animations.

## Setup & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd generative-ai-landing-page
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    - Copy `.env.example` to `.env.local`:
      ```bash
      cp .env.example .env.local
      ```
    - The `VITE_GOOGLE_SCRIPT_URL` should be pre-filled with the production URL in `.env.example`, but you can update it if needed.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Deployment

Build the application for production:

```bash
npm run build
```

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icons)
