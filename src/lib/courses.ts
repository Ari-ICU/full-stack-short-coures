import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Course, Module, Lesson, LessonFrontmatter } from "@/types";

const COURSES_DIR = path.join(process.cwd(), "src", "courses");

const COURSE_TITLES: Record<string, string> = {
  "course-overview": "Course Overview",
  "git": "Git & GitHub",
  "html": "HTML & Semantic Web",
  "css": "Modern CSS Layouts",
  "bootstrap": "Bootstrap Framework",
  "javascript": "JavaScript Fundamentals",
  "typescript": "TypeScript",
  "react": "React Fundamentals",
  "nextjs": "Next.js & App Router",
  "backend": "Backend Architecture & Engineering",
  "rdbms": "Relational Database (RDBMS)",
  "deployment": "Deployment & Final Project",
};

const COURSE_DESCRIPTIONS: Record<string, string> = {
  "course-overview": "ស្វែងយល់ពី Full Stack Development, Tech Stack, ការដំឡើង Tools និង IDE សម្រាប់ការចាប់ផ្តើម។",
  "git": "ស្វែងយល់ពីការរក្សាទុកកូដ (Version Control), ការធ្វើការងារជាក្រុម និងការប្រើប្រាស់ GitHub។",
  "html": "រៀនពីមូលដ្ឋានគ្រឹះនៃការសរសេរកូដរចនាសម្ព័ន្ធគេហទំព័រ ដោយប្រើប្រាស់ HTML និង Semantic Web។",
  "css": "រៀនពីការរចនាគេហទំព័រអោយមានភាពស្រស់ស្អាត និង Responsive ដោយប្រើប្រាស់ CSS។",
  "bootstrap": "រៀនពីការប្រើប្រាស់ Bootstrap Framework ដើម្បីបង្កើតគេហទំព័របានយ៉ាងឆាប់រហ័ស។",
  "javascript": "ស្វែងយល់ពីភាសា Programming ដ៏ពេញនិយមបំផុតសម្រាប់បង្កើតភាពរស់រវើកនៅលើគេហទំព័រ។",
  "typescript": "រៀនពីការសរសេរ JavaScript ដែលមាន Static Typing ដើម្បីកាត់បន្ថយបញ្ហា និងងាយស្រួលថែទាំ។",
  "react": "បង្កើតកម្មវិធី web ដ៏ទំនើប (Single Page Applications) ដោយប្រើប្រាស់ React។",
  "nextjs": "រៀនពីការសាងសង់ Full-stack App ដែលមានល្បឿនលឿន និង SEO ល្អជាមួយ Next.js App Router។",
  "backend": "រៀនពីការរៀបចំ Server-side, RESTful API, PostgreSQL, TypeORM, Auth, Security, Docker និង Production Architecture ជាមួយ Node.js។",
  "rdbms": "ស្វែងយល់ពីការរចនាមូលដ្ឋានទិន្នន័យ (Database Design), SQL, និងទំនាក់ទំនងទិន្នន័យ។",
  "deployment": "រៀនពីការដាក់អោយដំណើរការ (Deploy) ទាំង Frontend និង Backend ព្រមទាំងការបង្ហាញគម្រោងចុងក្រោយ។",
};

const MODULE_TITLES: Record<string, string> = {
  "module-1-introduction": "Module 1 — Introduction to Full Stack",
  "module-1-git": "Module 1 — Git Fundamentals",
  "module-2-advanced-git": "Module 2 — Advanced Git & Workflows",
  "module-1-html": "Module 1 — HTML & Semantic Web",
  "module-1-css": "Module 1 — Modern CSS Layouts",
  "module-1-bootstrap": "Module 1 — Bootstrap Framework",
  "module-1-js": "Module 1 — JavaScript Fundamentals",
  "module-1-fundamentals": "Module 1 — JavaScript Fundamentals",
  "module-2-functions-data-structures": "Module 2 — Functions & Data Structures",
  "module-3-modern-features": "Module 3 — Modern JavaScript Features",
  "module-4-oop": "Module 4 — Object-Oriented Programming",
  "module-5-dom": "Module 5 — DOM Manipulation & Web APIs",
  "module-6-async": "Module 6 — Asynchronous JS & API Integration",
  "module-7-projects": "Module 7 — Hands-on Projects",
  "module-1-typescript": "Module 1 — TypeScript Fundamentals",
  "module-2-advanced-typescript": "Module 2 — Advanced TypeScript",
  "module-3-oop": "Module 3 — Object-Oriented Programming",
  "module-4-modern-typescript": "Module 4 — Modern TypeScript",
  "module-1-tooling-architecture": "Module 1 — Modern Tooling & Component Architecture",
  "module-2-props-lists-conditional": "Module 2 — Props, Lists & Conditional Rendering",
  "module-3-state-events": "Module 3 — State Management & Event Handling",
  "module-4-useeffect": "Module 4 — The useEffect Hook",
  "module-5-styling-ui": "Module 5 — Component Styling & UI Kits",
  "module-6-routing": "Module 6 — Client-Side Routing",
  "module-7-global-state": "Module 7 — Global State & Context API",
  "module-8-performance-patterns": "Module 8 — Performance & Advanced Patterns",
  "module-1-nodejs-fundamentals": "Module 1 — Node.js Fundamentals",
  "module-2-expressjs": "Module 2 — Express.js & RESTful APIs",
  "module-3-postgresql": "Module 3 — PostgreSQL & Database Design",
  "module-4-orm": "Module 4 — TypeORM & Data Modeling",
  "module-5-authentication": "Module 5 — Authentication & Authorization (JWT)",
  "module-6-security": "Module 6 — Backend Security & Best Practices",
  "module-7-testing": "Module 7 — Automated Testing (Unit & Integration)",
  "module-8-capstone": "Module 8 — Full-Stack E-Commerce API Capstone",
  "module-1-rdbms-setup": "Module 1 — RDBMS Architecture & Tooling",
  "module-2-rdbms-schema": "Module 2 — Schema Design & Database Modeling",
  "module-3-rdbms-sql": "Module 3 — SQL Queries & CRUD Operations",
  "module-4-rdbms-advanced": "Module 4 — Transactions & Backend Integration",
  "module-1-deployment": "Module 1 — App Deployment",
  "module-2-final-project": "Module 2 — Final Project Demo",
};

export function getModuleTitle(slug: string): string {
  if (MODULE_TITLES[slug]) return MODULE_TITLES[slug];
  return slug
    .replace(/-\d+$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getModuleOrder(slug: string): number {
  const match = slug.match(/module-(\d+)/i);
  return match ? parseInt(match[1], 10) : 1;
}

export function getAllCourseSlugs(): string[] {
  if (!fs.existsSync(COURSES_DIR)) return [];
  return fs
    .readdirSync(COURSES_DIR)
    .filter((f) => fs.statSync(path.join(COURSES_DIR, f)).isDirectory());
}

export function getCourseLessons(courseSlug: string): Lesson[] {
  const courseDir = path.join(COURSES_DIR, courseSlug);
  if (!fs.existsSync(courseDir)) return [];

  const lessons: Lesson[] = [];
  const moduleDirs = fs
    .readdirSync(courseDir)
    .filter((f) => fs.statSync(path.join(courseDir, f)).isDirectory());

  for (const moduleSlug of moduleDirs) {
    const moduleDir = path.join(courseDir, moduleSlug);
    const files = fs
      .readdirSync(moduleDir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    for (const file of files) {
      const lessonSlug = file.replace(/\.mdx?$/, "");
      const filePath = `${process.cwd()}/src/courses/${courseSlug}/${moduleSlug}/${file}`;
      const read = fs.readFileSync;
      const raw = read(filePath, "utf-8");
      const { data } = matter(raw);
      const fm = data as LessonFrontmatter;

      lessons.push({
        slug: lessonSlug,
        title: fm.title ?? lessonSlug,
        description: fm.description ?? "",
        descriptionKm: fm.descriptionKm,
        objectives: fm.objectives ?? [],
        objectivesKm: fm.objectivesKm,
        module: fm.module ?? moduleSlug,
        order: fm.order ?? 1,
        quiz: fm.quiz,
        courseSlug,
        moduleSlug,
      });
    }
  }

  return lessons;
}

export function getCourse(courseSlug: string): Course | null {
  const courseDir = path.join(COURSES_DIR, courseSlug);
  if (!fs.existsSync(courseDir)) return null;

  const moduleDirs = fs
    .readdirSync(courseDir)
    .filter((f) => fs.statSync(path.join(courseDir, f)).isDirectory())
    .sort((a, b) => getModuleOrder(a) - getModuleOrder(b));

  const modules: Module[] = moduleDirs.map((moduleSlug) => {
    const moduleDir = path.join(courseDir, moduleSlug);
    const files = fs
      .readdirSync(moduleDir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    const lessons: Lesson[] = files
      .map((file) => {
        const lessonSlug = file.replace(/\.mdx?$/, "");
        const filePath = `${process.cwd()}/src/courses/${courseSlug}/${moduleSlug}/${file}`;
        const read = fs.readFileSync;
        const raw = read(filePath, "utf-8");
        const { data } = matter(raw);
        const fm = data as LessonFrontmatter;
        return {
          slug: lessonSlug,
          title: fm.title ?? lessonSlug,
          description: fm.description ?? "",
          descriptionKm: fm.descriptionKm,
          objectives: fm.objectives ?? [],
          objectivesKm: fm.objectivesKm,
          module: fm.module ?? moduleSlug,
          order: fm.order ?? 1,
          quiz: fm.quiz,
          courseSlug,
          moduleSlug,
        };
      })
      .sort((a, b) => a.order - b.order);

    return {
      slug: moduleSlug,
      title: getModuleTitle(moduleSlug),
      order: getModuleOrder(moduleSlug),
      lessons,
    };
  });

  return {
    slug: courseSlug,
    title: COURSE_TITLES[courseSlug] ?? courseSlug,
    description: COURSE_DESCRIPTIONS[courseSlug] ?? "",
    modules,
  };
}

const COURSE_ORDER = [
  "course-overview",
  "html",
  "css",
  "bootstrap",
  "javascript",
  "typescript",
  "git",
  "react",
  "nextjs",
  "rdbms",
  "backend",
  "deployment"
];

export function getAllCourses(): Course[] {
  return getAllCourseSlugs()
    .map((slug) => getCourse(slug))
    .filter(Boolean)
    .sort((a, b) => {
      // @ts-ignore
      const aIndex = COURSE_ORDER.indexOf(a.slug);
      // @ts-ignore
      const bIndex = COURSE_ORDER.indexOf(b.slug);
      
      const aRank = aIndex !== -1 ? aIndex : 999;
      const bRank = bIndex !== -1 ? bIndex : 999;
      
      return aRank - bRank;
    }) as Course[];
}

export function getLesson(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): { lesson: Lesson; content: string } | null {
  const extensions = [".mdx", ".md"];
  for (const ext of extensions) {
    const filePath = `${process.cwd()}/src/courses/${courseSlug}/${moduleSlug}/${lessonSlug}${ext}`;
    if (fs.existsSync(filePath)) {
      const read = fs.readFileSync;
      const raw = read(filePath, "utf-8");
      const { data, content } = matter(raw);
      const fm = data as LessonFrontmatter;
      return {
        lesson: {
          slug: lessonSlug,
          title: fm.title ?? lessonSlug,
          description: fm.description ?? "",
          objectives: fm.objectives ?? [],
          module: fm.module ?? moduleSlug,
          order: fm.order ?? 1,
          quiz: fm.quiz,
          courseSlug,
          moduleSlug,
        },
        content,
      };
    }
  }
  return null;
}

export function getAdjacentLessons(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): { prev: Lesson | null; next: Lesson | null } {
  const course = getCourse(courseSlug);
  if (!course) return { prev: null, next: null };

  const allLessons = course.modules
    .sort((a, b) => a.order - b.order)
    .flatMap((m) => m.lessons.sort((a, b) => a.order - b.order));

  const idx = allLessons.findIndex(
    (l) => l.moduleSlug === moduleSlug && l.slug === lessonSlug
  );

  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}
