export interface PostFrontmatter {
    title: string;
    pubDate: Date;
    description: string;
    author: string;
    image: {
        url: string;
        alt: string;
    };
    tags: string[];
}
