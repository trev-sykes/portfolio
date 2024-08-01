// Define a base interface for common properties
export interface ProjectPreview {
    title: string;
    description: string;
    date: string;
    languages: string[];
    frameworks: string[];
    imageUrl: string;
}

// Define an interface for sections
export interface Dependency {
    name: string;
    description: string;
}

// Define an interface for the full blog article, extending the preview
export interface FullProject extends ProjectPreview{
    summary: string;
    dependencies: Dependency[];
}
export type Projects = FullProject[];
