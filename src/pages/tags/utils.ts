import type { MarkdownInstance } from "astro";
import type { PostFrontmatter } from "../posts/types";
import { dateComparer } from "../../utils/date-comparer";

export function filterPostsByTag(posts: MarkdownInstance<PostFrontmatter>[], tag: string) {
    return posts
        .filter((post) => post.frontmatter.tags?.includes(tag))
        .sort(dateComparer((post => post.frontmatter.pubDate)))
        .reverse();
}

export function getOrganizedTags(posts: MarkdownInstance<PostFrontmatter>[], options?: { filteredBy?: string[] }) {
    const tags = posts.flatMap((post) => post.frontmatter.tags ?? []);

    let uniqueTags = [...new Set(tags)].sort();

    if (options?.filteredBy) {
        uniqueTags = uniqueTags.filter((tag) => options.filteredBy.includes(tag));
    }

    return uniqueTags.map((tag) => {
        const tagPosts = filterPostsByTag(posts, tag);

        return {
            tag,
            posts: tagPosts,
            postCount: tagPosts.length,
        };
    });
}
