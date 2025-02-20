// Define an interface for code blocks
interface CodeBlock {
    language: string;
    code: string;
}

// Define an interface for sections
export interface Section {
    sectionTitle: string;
    content: string[];
    codeBlocks?: CodeBlock[];  // Optional array of code blocks
}
// Define a base interface for common properties
export interface BlogPreview {
    previewTitle: string;
    description: string;
    date: string;
    topic: string[];
    imageUrl: string;
}

// Define an interface for the full blog article
export interface FullArticle extends BlogPreview {
    title: string;
    sections: Section[];
    tableOfContents: string[];
}

export type Magazine = FullArticle[];