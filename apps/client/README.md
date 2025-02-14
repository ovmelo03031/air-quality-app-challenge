# Air Quality Monitoring Dashboard

## Features

- Real-time air quality data visualization
- Historical data analysis
- Parameter-specific data views
- Interactive charts and graphs
- Responsive design

## Tech Stack

- React 19
- TypeScript
- TailwindCSS
- Chart.js/D3.js for visualizations

## Getting Started

1. Install dependencies:
```bash
cd apps/client
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_APP_URL`: Frontend application URL

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build      # Build the application
npm run start      # Start production server

# Testing
npm run test       # Run unit tests
npm run test:e2e   # Run end-to-end tests

# Code Quality
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # Reusable React components
├── hooks/         # Custom React hooks
├── lib/          # Utilities and helpers
├── modules/      # Feature-specific modules
└── types/        # TypeScript type definitions
```

## State Management

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
