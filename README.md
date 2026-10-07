# Generated Project

A modern content management platform built with TypeScript, React, and Vite.

## Features

- User authentication (login, registration)
- Blog post management (create, read, update, delete)
- User management for administrators
- Responsive design with Tailwind CSS
- Mock data support for development
- Type-safe codebase

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Form Handling**: Custom form components with validation

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd generated-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Configuration

Edit the `.env` file to configure the application:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCK_DATA=false
VITE_SENTRY_DSN=
VITE_GOOGLE_ANALYTICS_ID=
VITE_APP_TITLE=Generated Project
```

- `VITE_API_BASE_URL`: Base URL for the API
- `VITE_ENABLE_MOCK_DATA`: Set to `true` to use mock data during development
- `VITE_SENTRY_DSN`: Sentry DSN for error tracking
- `VITE_GOOGLE_ANALYTICS_ID`: Google Analytics ID
- `VITE_APP_TITLE`: Application title

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint to check code quality

## Project Structure

```
generated-project/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable UI components
│   ├── constants/         # Application constants
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── router.jsx         # Application router
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── index.html             # Main HTML template
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Development

### Mock Data

To enable mock data during development, set `VITE_ENABLE_MOCK_DATA=true` in your `.env` file. This will use the mock API implementation in `src/utils/mockData.js`.

### Authentication

The application uses JWT for authentication. The auth token is stored in localStorage and automatically included in API requests.

### Routing

The application uses React Router for client-side routing. Protected routes are implemented using the `ProtectedRoute` component.

## Deployment

### Building for Production

To create a production build, run:

```bash
npm run build
```

This will generate optimized files in the `dist` directory.

### Vercel

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

### Other Platforms

For other platforms, configure the build command as `npm run build` and set the output directory to `dist`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.