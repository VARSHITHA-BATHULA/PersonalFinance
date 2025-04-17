Personal Finance Visualizer
A modern web application for tracking personal finances, built with Next.js, TypeScript, shadcn/ui, Recharts, and MongoDB.
Features

Stage 1: Add/Edit/Delete transactions, transaction list, monthly expenses bar chart, form validation.
Stage 2: Predefined categories, category-wise pie chart, dashboard with summary cards.
Stage 3: Monthly category budgets, budget vs actual comparison chart, spending insights.
Responsive design with light/dark theme toggle.
Error handling and loading states.
Interactive charts with tooltips.

Tech Stack

Frontend: Next.js 14 (App Router), React, TypeScript, shadcn/ui, Tailwind CSS, Recharts, Framer Motion.
Backend: MongoDB for data storage, Next.js API routes.
Testing: Jest for unit tests.
Styling: Tailwind CSS with dark/light theme support.

Setup Instructions

Clone the repository:git clone https://github.com/yourusername/personal-finance-visualizer.git
cd personal-finance-visualizer


Install dependencies:npm install


Set up environment variables:Create a .env.local file and add your MongoDB URI:MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority


Run the development server:npm run dev

Open http://localhost:3000 in your browser.

Deployment

Deploy to Vercel:
Push your code to a GitHub repository.
Connect the repository to Vercel and set the MONGODB_URI environment variable in Vercel’s dashboard.
Deploy the application.


Live URL: https://your-vercel-app.vercel.app

Running Tests
npm test

Project Structure
personal-finance-visualizer/
├── app/                    # Next.js App Router pages and API routes
├── components/             # React components (UI, dashboard, layout)
├── lib/                   # MongoDB connection, types, utilities
├── public/                # Static assets (logo, favicon)
├── tests/                 # Jest unit tests
├── .env.local             # Environment variables
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.mjs        # Next.js configuration
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation

Evaluation Criteria

Feature Implementation (40%): All Stage 3 features implemented.
Code Quality (30%): Type-safe, modular, well-documented code with tests.
UI/UX Design (30%): Modern, responsive, accessible design with smooth animations.

Notes

Authentication/login is intentionally omitted as per requirements.
Ensure MongoDB Atlas is properly configured for production use.
The application is optimized for both desktop and mobile devices.

