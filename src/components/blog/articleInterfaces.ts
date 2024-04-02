// Define a base interface for common properties
interface BaseArticle {
    title: string;
    description: string;
    date: string;
    topic: string[];
    imageUrl: string;
}

// Define an interface for the blog preview, reusing the base interface
export interface BlogPreview extends BaseArticle {}

// Define an interface for sections
export interface Section {
    title: string;
    content: string;
}

// Define an interface for the full blog article, extending the preview
export interface FullArticle{
    sections: Section[];
    tableOfContents: string[];
}

export interface Blog extends BlogPreview, FullArticle{

}

export type Magazine = Blog[];