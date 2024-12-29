// projectInterfaces.ts
export interface TechStack {
    languages: string[];
    frameworks: string[];
    tools?: string[];  // Adding tools section for things like Git, AWS, etc.
    databases?: string[];  // For any databases used
}

export interface ProjectLink {
    url: string;
    type: 'live' | 'github' | 'demo' | 'documentation';
    label: string;
}

export interface Dependency {
    name: string;
    version?: string;  // Adding version for better documentation
    description: string;
    purpose?: string;  // Why this dependency was chosen
}

export interface CodeBlock {
    language: string;
    content: string;
    description?: string;  // Explanation of what the code does
    fileName?: string;     // Original file name
}

export interface ProjectPreview {
    title: string;
    shortDescription: string;  // Brief overview for cards/previews
    description: string;       // Detailed description
    date: {
        started: string;
        completed: string;
        lastUpdated?: string;
    };
    techStack: TechStack;
    images: {
        thumbnail: string;
        preview: string;
        screenshots?: string[];
    };
    links: ProjectLink[];
    status: 'completed' | 'in-progress' | 'maintained' | 'archived';
    featured?: boolean;
}

export interface FullProject extends ProjectPreview {
    summary: string;
    features: string[];          // List of key features
    challenges: {               // Technical challenges faced
        description: string;
        solution: string;
    }[];
    dependencies: Dependency[];
    inspiration: string;
    codeBlocks: CodeBlock[];
    futureImprovements?: string[]; // Planned features/improvements
    metrics?: {                   // Any relevant metrics
        performance?: string[];
        users?: string;
        other?: Record<string, string>;
    };
    learnings?: string[];        // Key takeaways and learnings
}
