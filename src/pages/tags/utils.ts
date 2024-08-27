import { getCollection } from "astro:content";
import { dateComparer } from "../../utils/date-comparer";

export async function getPostList(options?: { filteredByTags?: string[] }) {
    const filteredByTags = options?.filteredByTags ?? [];

    const allPosts = await getCollection("posts", (post) => {
        if (filteredByTags.length > 0) {
            return post.data.tags.some((tag) => filteredByTags.includes(tag));
        }
        return true;
    });

    return allPosts
        .sort(dateComparer((post) => post.data.pubDate))
        .reverse();
}

export async function getTagList(options?: { filteredByTags?: string[] }) {
    const filteredByTags = options?.filteredByTags ?? [];

    const allPosts = await getPostList(options);

    let uniqueTags = [...new Set(allPosts.flatMap((post) => post.data.tags))].sort();

    if (filteredByTags.length > 0) {
        uniqueTags = uniqueTags.filter((tag) => filteredByTags.includes(tag));
    }

    return uniqueTags.map((tag) => {
        const posts = allPosts
            .filter((post) => post.data.tags.includes(tag))
            .sort(dateComparer((post) => post.data.pubDate))
            .reverse();

        const postCount = posts.length;

        return {
            tag,
            posts,
            postCount,
        };
    });
}
