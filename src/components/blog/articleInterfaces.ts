// Define a base interface for common properties
interface BaseArticle {
    title: string;
    description: string;
    date: string;
    topic: string[];
    imageUrl: string;
}

// Define an interface for code blocks
interface CodeBlock {
    language: string;
    code: string;
}

// Define an interface for sections
export interface Section {
    title: string;
    content: string;
    codeBlocks?: CodeBlock[];  // Optional array of code blocks
}

// Define an interface for the blog preview
export interface BlogPreview extends BaseArticle { }

// Define an interface for the full blog article
export interface FullArticle {
    sections: Section[];
    tableOfContents: string[];
}

export interface Blog extends BlogPreview, FullArticle {
    titleHeader: string;
}

export type Magazine = Blog[];