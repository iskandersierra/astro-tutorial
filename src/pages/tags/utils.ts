import type { MarkdownInstance } from "astro";
import type { PostFrontmatter } from "../posts/types";
import { dateComparer } from "../../utils/date-comparer";

export function filterPostsByTag(posts: MarkdownInstance<PostFrontmatter>[], tag: string) {
    return posts
        .filter((post) => post.frontmatter.tags?.includes(tag))
        .sort(dateComparer((post => post.frontmatter.pubDate)))
        .reverse();
}

export function getOrganizedTags(posts: MarkdownInstance<PostFrontmatter>[]) {
    const tags = posts.flatMap((post) => post.frontmatter.tags ?? []);

    const uniqueTags = [...new Set(tags)];

    return uniqueTags.map((tag) => {
        return {
            tag,
            posts: filterPostsByTag(posts, tag),
        };
    });
}
