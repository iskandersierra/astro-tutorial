import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getPostList } from "./tags/utils";

export async function GET(context) {
    const posts = await getPostList();

    const items = posts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/posts/${post.slug}`,
    }));

    return rss({
        title: 'Astro Learner | Blog',
        description: 'My journey learning Astro',
        site: context.site,
        items,
        customData: `<language>en-us</language>`,
    })
}
