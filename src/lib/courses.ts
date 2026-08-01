import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Course, Module, Lesson, LessonFrontmatter } from "@/types";

const COURSES_DIR = path.join(process.cwd(), "src", "courses");

const COURSE_TITLES: Record<string, string> = {
  "course-overview": "Course Overview",
  "git": "Git & GitHub",
  "web-design": "Web Design",
  "typescript": "TypeScript",
  "frontend-engineering": "Frontend Engineering",
  "backend-architecture": "Backend Architecture",
  "rdbms": "Relational Database (RDBMS)",
  "deployment": "Deployment & Final Project",
};

const COURSE_DESCRIPTIONS: Record<string, string> = {
  "course-overview": "ស្វែងយល់ពី Full Stack Development, Tech Stack, ការដំឡើង Tools និង IDE សម្រាប់ការចាប់ផ្តើម។",
  "git": "ស្វែងយល់ពីការរក្សាទុកកូដ (Version Control), ការធ្វើការងារជាក្រុម និងការប្រើប្រាស់ GitHub។",
  "web-design": "រៀនពីមូលដ្ឋានគ្រឹះនៃ responsive design, HTML, CSS និងការបង្កើត interface ដ៏ស្រស់ស្អាត។",
  "typescript": "រៀនពីការសរសេរ JavaScript ដែលមាន Static Typing ដើម្បីកាត់បន្ថយបញ្ហា និងងាយស្រួលថែទាំ។",
  "frontend-engineering": "បង្កើតកម្មវិធី web (single-page applications) ដ៏ទំនើបដោយប្រើប្រាស់ React frameworks។",
  "backend-architecture": "រៀនពីការរៀបចំ Server-side, ការគ្រប់គ្រងទិន្នន័យ និង API ជាមួយ Node.js។",
  "rdbms": "ស្វែងយល់ពីការរចនាមូលដ្ឋានទិន្នន័យ (Database Design), SQL, និងទំនាក់ទំនងទិន្នន័យ។",
  "deployment": "រៀនពីការដាក់អោយដំណើរការ (Deploy) ទាំង Frontend និង Backend ព្រមទាំងការបង្ហាញគម្រោងចុងក្រោយ។",
};

const MODULE_TITLES: Record<string, string> = {
  "module-1-introduction": "Module 1 — Introduction to Full Stack",
  "module-1-git": "Module 1 — Git Fundamentals",
  "module-2-advanced-git": "Module 2 — Advanced Git & Workflows",
  "module-1-html": "Module 1 — HTML & Semantic Web",
  "module-2-css": "Module 2 — Modern CSS Layouts",
  "module-3-bootstrap": "Module 3 — Bootstrap Framework",
  "module-4-js": "Module 4 — JavaScript Fundamentals",
  "module-1-typescript": "Module 1 — TypeScript Fundamentals",
  "module-2-advanced-typescript": "Module 2 — Advanced TypeScript",
  "module-1-react": "Module 1 — React Fundamentals",
  "module-1-nodejs": "Module 1 — Node.js & Architecture",
  "module-2-express-and-rest": "Module 2 — Express.js & RESTful APIs",
  "module-3-database-integration": "Module 3 — Database Integration",
  "module-4-security-and-advanced": "Module 4 — Security & Advanced Concepts",
  "module-1-database-design": "Module 1 — Database Design & SQL",
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
  "web-design",
  "typescript",
  "git",
  "frontend-engineering",
  "rdbms",
  "backend-architecture",
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
