import type { APIRoute } from "astro";

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ request, site }) => {
  const posts = await getCollection("blog");

  return rss({
    // `<title>` field in output xml
    title: "Erickson's Blog",
    // `<description>` field in output xml
    description: "A humble Astronaut’s guide to the stars",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: site ?? "",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `/posts/${slug}`,
    })),
    // (optional) inject custom xml
    customData: `<language>es-mx</language>`,
  });
};
