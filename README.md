# GitHub PR Analyzer

## Overview

GitHub PR Analyzer is a web application that allows users to fetch and analyze Pull Request (PR) changes from GitHub repositories using AI. This tool streamlines the code review process by providing automated analysis of PR changes.




## Tech Stack

<p align="center">
    <img alt="NextJs" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" height=40 width=40 />
    <img alt="TailwindCSS" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height=40 width=40/>
    <img alt="ShadCn" src="https://raw.githubusercontent.com/nur-zaman/better-usis/master/docs/shadcn.png" height=40 width=40/>
        <img alt="Gemini" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" height=40 width=40/>
            <img alt="Vercel AI SDK" src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Vercel-Dark.svg" height=40 width=40/>
</p>

## Prerequisites

- A GitHub account and personal access token (for accessing GitHub API)
- Access to Gemini AI API (for PR analysis)

## Installation

1. Clone the repository:

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   GEMINI_API_KEY=your_gemini_api_key
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter the GitHub repository (in the format `owner/repo`) and the PR number you want to analyze.

4. Click the "Analyze PR" button to fetch the PR changes and generate an AI analysis.

5. View the analysis results in the response section below the form.


## Contributing

Contributions to the GitHub PR Analyzer project are welcome. Please follow these steps to contribute:

1. Fork the repository


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository.

