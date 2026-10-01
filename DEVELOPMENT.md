# Development Guide

## Prerequisites

- Node.js >= 22.15.0
- npm >= 11.11.1



2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```env
# SMTP Configuration
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=your-email@gmail.com

# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check for code issues

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Locale-based routing
│   │   ├── projects/      # Projects pages
│   │   ├── skillstools/   # Skills & Tools page
│   │   ├── contact/       # Contact page
│   │   └── experience/    # Experience page
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── configs/           # Configuration files
│   ├── hooks/             # Custom React hooks
│   ├── libs/              # Utility libraries
│   ├── service/           # Service files
│   ├── store/             # Zustand stores
│   └── utils/             # Utility functions
├── components/            # Shared UI components
├── i18n/                  # Internationalization
├── lib/                   # Utility functions
└── messages/              # Translation files
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
