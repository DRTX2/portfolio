/**
 * Projects i18n Helper
 * Merges static project data with translations
 */
import type { ProjectData } from '../data/projects';

interface TranslatedProject extends Omit<ProjectData, 'title' | 'description' | 'highlights' | 'detailedDescription' | 'challenges' | 'solutions'> {
  title: string;
  description: string;
  highlights?: { label: string; text: string }[];
  detailedDescription?: string;
  challenges?: string[];
  solutions?: string[];
}

export function getTranslatedProjects(projects: ProjectData[], translations: any): TranslatedProject[] {
  return projects.map(project => {
    const translatedData = translations.projects.items?.[project.slug];
    
    if (!translatedData) {
      // If no translation exists, return original data
      return project;
    }

    return {
      ...project,
      title: translatedData.title || project.title,
      description: translatedData.description || project.description,
      highlights: translatedData.highlights || project.highlights,
      detailedDescription: translatedData.detailedDescription || project.detailedDescription,
      challenges: translatedData.challenges || project.challenges,
      solutions: translatedData.solutions || project.solutions,
    };
  });
}
