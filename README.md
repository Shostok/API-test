# API Test App: Users & Posts Explorer


This repository hosts a React application built with Vite, designed to interact with the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. It allows users to browse, search, and view detailed information about users and posts.

## 🌟 Features

*   **👤 User Management & 📝 Post Management:**
    *   Display lists of users and posts fetched from the API.
    *   View detailed information for each user (including address and company details) and post.
*   **🔍 Powerful Search Functionality:**
    *   Search users by name, username, or email.
    *   Search posts by title or body content.
    *   Dynamic filtering of results as you type (Debounced for performance if `useSearch` hook implies it, though current code is direct).
*   **📱 Responsive Design:**
    *   Interactive cards for concise display of user and post information.
    *   Grid-based layout that adapts to different screen sizes for optimal viewing on desktop and mobile.
*   **Seamless Navigation:**
    *   Client-side routing implemented with React Router for a smooth single-page application experience.
    *   Clear navigation links in the header to switch between Users and Posts sections.
    *   "Back" buttons for easy return from detail views to lists.
*   **✨ User Experience Enhancements:**
    *   Loading indicators while fetching data.
    *   Clear error messages for API issues or when data is not found.
    *   A "Not Found" page for invalid routes.
*   **🛠️ Modern Tech Stack:**
    *   Built with React 19 and Vite.
    *   Asynchronous API calls managed with Axios.
    *   Scoped styling using CSS Modules to prevent class name conflicts.
    *   Code quality maintained with ESLint and Prettier.

## 🛠️ Tech Stack

*   **Core:** React 19, JavaScript (ES6+)
*   **Build Tool:** Vite
*   **Routing:** React Router v7
*   **HTTP Client:** Axios
*   **Styling:** CSS Modules, Global CSS
*   **Linting/Formatting:** ESLint, Prettier
*   **API Source:** [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

## 📁 Project Structure

The project is organized into a standard Vite React application structure:

```
shostok-api-test/
├── public/                   # Static assets (e.g., site.webmanifest)
├── src/
│   ├── api/                  # API service functions (postApi.js, userApi.js)
│   ├── components/           # React components (UI and feature-specific)
│   │   ├── App/              # Main App component, routing setup
│   │   ├── Button/           # Reusable button component
│   │   ├── Card/             # Generic card wrapper (used by UserCard/PostCard indirectly)
│   │   ├── Error/            # Error display component
│   │   ├── Layout/           # Main application layout with header navigation
│   │   ├── Loader/           # Loading spinner component
│   │   ├── NotFound/         # 404 Not Found page component
│   │   ├── PostCard/         # Component for displaying a single post in a list
│   │   ├── PostDetails/      # Component for displaying detailed post information
│   │   ├── Posts/            # Page component for listing posts
│   │   ├── SearchBar/        # Reusable search input component
│   │   ├── UserCard/         # Component for displaying a single user in a list
│   │   ├── UserDetails/      # Component for displaying detailed user information
│   │   └── Users/            # Page component for listing users
│   ├── constant/             # Application-wide constants (api.js, search.js)
│   ├── hooks/                # Custom React hooks (e.g., useSearch.js)
│   ├── utils/                # Utility functions (e.g., stringToSearch.js)
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── .eslintrc.mjs             # ESLint configuration
├── .prettierrc               # Prettier configuration
├── index.html                # Main HTML template
├── package.json              # Project metadata and dependencies
└── vite.config.js            # Vite configuration
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (v9 or higher, typically comes with Node.js) or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shostok/api-test.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd api-test
    ```
3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

### Available Scripts

This project uses npm scripts for common tasks:

*   **`npm run dev`** or **`yarn dev`**
    Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) (or the port specified in your terminal) to view it in the browser. The page will reload if you make edits.

*   **`npm run dev-custom`** or **`yarn dev-custom`**
    Runs the app in development mode on host `0.0.0.0` and port `3000`.

*   **`npm run build`** or **`yarn build`**
    Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

*   **`npm run lint`** or **`yarn lint`**
    Lints the project files using ESLint according to the configured rules.

*   **`npm run lint:fix`** or **`yarn lint:fix`**
    Lints the project files and attempts to automatically fix any ESLint violations.

*   **`npm run format`** or **`yarn format`**
    Formats the codebase using Prettier according to the rules in `.prettierrc`.

*   **`npm run preview`** or **`yarn preview`**
    Serves the production build from the `dist` folder locally. This is useful for checking the production build before deployment.

### Running the Application

1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).