# Full Stack Web Development Curriculum

This repository contains an interactive, modern curriculum platform for teaching Full Stack Web Development. It is built with **Next.js (App Router)** and uses **MDX (Markdown + JSX)** to render high-quality, localized course content.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Content Rendering:** MDX (`react-markdown`, `remark-gfm`)
- **Styling:** Tailwind CSS 4 & Tailwind Typography (`@tailwindcss/typography`)
- **Diagrams:** Mermaid.js (Client-side rendering)
- **Language:** TypeScript

## 📚 Curriculum Structure

The curriculum is divided into comprehensive modules, with a specific focus on explaining concepts in Khmer while strictly maintaining technical terminology in English.

Current modules include:
- **Course Overview:** Introduction to the client-server model, HTTP/HTTPS, REST APIs, and development environment setup.
- **Web Design:** HTML structure, semantic tags, forms, tables, and CSS styling.
- **Git & GitHub:** Version control fundamentals, branching, merging, stashing, and conflict resolution.
- **TypeScript:** Typing fundamentals, generics, utility types, and strict mode.
- **RDBMS (PostgreSQL):** Database design, ERD diagrams, Normalization, SQL fundamentals, Joins, and JSONB.
- **Frontend Engineering:** React fundamentals, Hooks (`useState`, `useEffect`), State Management (Redux Toolkit), Routing, Forms (Zod + React Hook Form), and Axios API Integration.
- **Next.js (Optional):** App Router, Server vs Client Components, Data Fetching, and Vercel Deployment.

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the curriculum platform.

## 📝 Editing Content

Course contents are stored in the `src/courses/` directory. Each lesson is written in `.mdx` format. 
To create or modify a lesson:
1. Navigate to the relevant module inside `src/courses/`.
2. Edit or create an `.mdx` file.
3. Ensure the YAML frontmatter includes `title`, `description`, `objectives`, `module`, and `order`.
4. (Optional) You can include a `quiz` block in the frontmatter to test the student's understanding.

### Example Frontmatter

```yaml
---
title: "Lesson Title"
description: "A brief description in Khmer."
objectives:
  - "Objective 1"
  - "Objective 2"
module: module-1-name
order: 1
quiz:
  - question: "Question text?"
    options:
      - "Option 1"
      - "Option 2"
    correctAnswer: 1
    explanation: "Explanation text."
---
```

## 🗺️ Diagrams (Mermaid)

The platform supports **Mermaid.js** for rendering charts and diagrams (e.g., Entity Relationship Diagrams). Just use a standard markdown code block with the `mermaid` language tag:

```markdown
    ```mermaid
    erDiagram
        USERS ||--o{ ORDERS : "places"
    ```
```

## 🚀 Deployment

The easiest way to deploy this Next.js platform is to use [Vercel](https://vercel.com/) directly from your GitHub repository. It will automatically build and optimize the MDX files into static pages.
