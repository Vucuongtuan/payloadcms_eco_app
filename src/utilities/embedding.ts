import { Category, Page, Product } from "@/payload-types";
import { google } from "@ai-sdk/google";
import { embed } from "ai";

// Tạo embedding text từ text
export const embedding = async (text: string) => {
  const { embedding } = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: text,
  });
  return embedding;
};

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_KEY;

export const saveEmbeddingToQdrant = async ({
  data,
  type,
}: {
  data: Product | Category | Page;
  type: "product" | "category" | "page";
}) => {
  let text = "";
  let payload: Record<string, any> = { slug: data.slug, title: data.title };

  if (type === "product") {
    const product = data as Product;
    text = productEmbeddingToText(product); // function formatter
    payload.price = product.priceInUSD;
    payload.thumbnail = product.meta?.image ?? undefined;
  } else if (type === "category") {
    const category = data as Category;
    text = categoryEmbeddingToText(category);
  } else if (type === "page") {
    const page = data as Page;
    text = pageEmbeddingToText(page);
    payload.thumbnail = page.meta?.image ?? undefined;
  }

  const vector = await embedding(text);

  const res = await fetch(
    `${QDRANT_URL}/collections/content_vector/points?wait=true`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(QDRANT_API_KEY ? { "X-API-Key": QDRANT_API_KEY } : {}),
      },
      body: JSON.stringify({
        points: [
          {
            id: data.id,
            vector,
            payload: { ...payload, type },
          },
        ],
      }),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Qdrant upsert failed: ${errText}`);
  }

  console.log(`[Qdrant] Saved ${type} - ${data.slug}`);
};
export const deleteEmbeddingFromQdrant = async (id: string) => {
  const res = await fetch(
    `${QDRANT_URL}/collections/content_vector/points/delete?wait=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(QDRANT_API_KEY ? { "X-API-Key": QDRANT_API_KEY } : {}),
      },
      body: JSON.stringify({
        points: [id],
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Qdrant delete failed: ${errText}`);
  }

  console.log(`[Qdrant] Deleted point id: ${id}`);
};
// Product → text
export const productEmbeddingToText = (product: Product) => {
  const colors =
    product.gallery?.flatMap((g) =>
      g.variantOption ? [g.variantOption] : []
    ) || [];
  const material =
    product.shortContent
      ?.find((sc) => sc.name === "material")
      ?.content?.root?.children.map((c) => c.type)
      .join(", ") || "Unknown";
  const description =
    product.shortContent
      ?.find((sc) => sc.name === "description")
      ?.content?.root?.children.map((c) => c.type)
      .join(" ") || "No description";

  return `
Slug: ${product.slug}
Product Name: ${product.title}
Brand: ${product.meta?.title ?? "Unknown"}
Category: ${typeof product.taxonomies.category === "string" ? product.taxonomies.category : product.taxonomies.category.title}
Price: ${product.priceInUSDEnabled ? product.priceInUSD + " USD" : "Unknown"}
Colors: ${colors.join(", ") || "Unknown"}
Material: ${material}
Description: ${description}
`.trim();
};

// Category → text
export const categoryEmbeddingToText = (category: Category) => {
  return `
Slug: ${category.slug ?? "no-slug"}
Category Name: ${category.title}
Description: ${category.description ?? "No description"}
`.trim();
};

// Page → text
export const pageEmbeddingToText = (page: Page) => {
  const sectionsText =
    page.sections
      ?.map((s) => {
        if ("blockType" in s && s.blockType === "columnMedia")
          return s.blockName ?? "";
        if ("type" in s) return s.type;
        return "";
      })
      .join(" ") || "No content";

  return `
Slug: ${page.slug}
Page Title: ${page.title}
Content: ${sectionsText}
`.trim();
};
