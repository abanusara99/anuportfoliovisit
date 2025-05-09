# Firebase Studio - ABAnuSara Portfolio

This is a Next.js starter project for the ABAnuSara portfolio website, built within Firebase Studio.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository (if you haven't already):**
    ```bash
    # If you're using HTTPS
    git clone <your-repository-url>
    cd <repository-directory-name>

    # Or if you're using SSH
    git clone <your-repository-ssh-url>
    cd <repository-directory-name>
    ```

2.  **Install dependencies:**
    Make sure you have Node.js (version 20 or later recommended) and npm installed.
    ```bash
    npm install
    ```
    *(Alternatively, you can use `yarn install` or `pnpm install` if you prefer)*

3.  **Run the development server:**
    This command starts the Next.js development server, usually on `http://localhost:9002`.
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:9002` (or the port specified in your terminal) to see the application running.

## Project Structure

-   `src/app/page.jsx`: The main page component for the portfolio.
-   `src/app/layout.jsx`: The root layout component that wraps all pages.
-   `src/app/globals.css`: Global styles and Tailwind CSS/ShadCN theme configuration.
-   `src/components/`: Reusable UI components.
    -   `ui/`: Components from the ShadCN library.
    -   `icons/`: Custom SVG icon components.
    -   `Header.jsx`: The main navigation header.
-   `src/hooks/`: Custom React hooks (e.g., `use-toast`, `use-mobile`).
-   `public/`: Static assets (images, fonts, etc. - though currently using placeholder images).
-   `tailwind.config.js`: Tailwind CSS configuration.
-   `next.config.mjs`: Next.js configuration file.

To start customizing, take a look at `src/app/page.jsx`.
