// projectInterfaces.ts
export interface ProjectPreview {
    title: string;
    description: string;
    date: string;
    techStack: TechStack;
    imageUrl: string;
    url: string;
    gitLink: string;
}

export interface TechStack {
    languages: string[];
    frameworks: string[];
}

export interface Dependency {
    name: string;
    description: string;
}

export interface FullProject extends ProjectPreview {
    summary: string;
    dependencies: Dependency[];
    inspiration: string;
}

export type Projects = FullProject[];