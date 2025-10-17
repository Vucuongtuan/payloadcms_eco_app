export default async function RelatedProducts() {
  const products = await findProductByTagsOrCategory();
  return (
    <section className="py-8 lg:py-12">
      <h2 className="text-2xl font-semibold">Related Products</h2>
    </section>
  );
}
