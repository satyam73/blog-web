# Blog Web App

A blogging platform where users can create, edit, and share blog posts with a rich text editor.

## Tech Stack

- **Framework:** Next.js 13 (Pages Router)
- **UI:** Material UI (MUI) 5
- **State Management:** Redux Toolkit
- **Backend/Auth:** Firebase (Firestore, Authentication)
- **Image Uploads:** Cloudinary
- **Rich Text Editor:** Quill
- **Testing:** Jest, React Testing Library

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Yarn](https://yarnpkg.com/)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/satyam73/blog-web.git
   cd blog-web
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env
   ```

4. Fill in the values in `.env` with your Firebase and Cloudinary credentials.

5. Start the development server:
   ```bash
   yarn dev
   ```

6. Open [http://localhost:3030](http://localhost:3030) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server on port 3030 |
| `yarn build` | Create production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn test` | Run tests with coverage |
| `yarn test:watch` | Run tests in watch mode |
| `yarn serve` | Lint, build, and start production server |

## Project Structure

```
blog-web/
├── app/
│   ├── components/   # Reusable UI components
│   ├── contexts/     # React context providers
│   ├── firebase/     # Firebase configuration
│   └── store/        # Redux store and slices
├── pages/            # Next.js pages (routing)
├── services/         # External service integrations (Cloudinary)
├── styles/           # Global and module CSS
├── tests/            # Test files
├── utilities/        # Helper functions
├── lottie/           # Lottie animation assets
└── public/           # Static assets
```
