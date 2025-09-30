// @ts-nocheck

import { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { Product, ProductVariant } from "../../../../payload-types";
import { shippingAddressField } from "../../fields/shippingAddress";

// This hook is responsible for checking inventory and decrementing stock before an order is created.
const checkInventoryAndDecrement: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation === 'create' && data.items) {
    const { payload } = req;

    try {
      // Use a transaction to ensure all stock updates succeed or none do.
      await payload.db.transaction(async (tx) => {
        for (const item of data.items) {
          const quantityToOrder = item.quantity || 1;
          const productID = typeof item.product === 'string' ? item.product : item.product.id;

          if (!productID) {
            throw new Error('Một sản phẩm trong giỏ hàng bị thiếu ID.');
          }

          // Get the full product object to check its type
          const parentProduct: Product = await payload.findByID({
            collection: 'products',
            id: productID,
            depth: 0,
            req: { ...req, transaction: tx },
          });

          if (parentProduct.productType === 'variable') {
            // --- VARIABLE PRODUCT LOGIC ---
            const variantID = typeof item.variant === 'string' ? item.variant : item.variant?.id;
            if (!variantID) {
              throw new Error(`Bạn phải chọn một biến thể cho sản phẩm "${parentProduct.title}".`);
            }

            const variant: ProductVariant = await payload.findByID({
              collection: 'product-variants',
              id: variantID,
              depth: 0,
              req: { ...req, transaction: tx },
            });

            const stock = variant.inventory?.stock ?? 0;
            if (stock < quantityToOrder) {
              throw new Error(`Biến thể "${variant.name}" của sản phẩm "${parentProduct.title}" không đủ hàng. Chỉ còn ${stock}.`);
            }

            // Decrement stock on the variant
            await payload.update({
              collection: 'product-variants',
              id: variantID,
              data: { inventory: { ...variant.inventory, stock: stock - quantityToOrder } },
              req: { ...req, transaction: tx },
            });
          } else {
            // --- SIMPLE PRODUCT LOGIC ---
            const stock = parentProduct.inventory?.stock ?? 0;
            if (stock < quantityToOrder) {
              throw new Error(`Sản phẩm "${parentProduct.title}" không đủ hàng. Chỉ còn ${stock}.`);
            }

            // Decrement stock on the simple product
            await payload.update({
              collection: 'products',
              id: productID,
              data: { inventory: { ...parentProduct.inventory, stock: stock - quantityToOrder } },
              req: { ...req, transaction: tx },
            });
          }
        }
      });
    } catch (error) {
      throw new Error(error.message || 'Có lỗi xảy ra khi kiểm tra tồn kho.');
    }
  }

  return data;
};

// This hook is responsible for updating the sales count on the parent product.
const updateProductSales: AfterChangeHook = async ({ doc, req, operation }) => {
  if (operation === 'create' && doc.items) {
    const { payload } = req;

    for (const item of doc.items) {
      const productId = typeof item.product === 'string' ? item.product : item.product.id;
      const quantity = item.quantity || 1;

      if (!productId) continue;

      try {
        const product: Product = await payload.findByID({ collection: 'products', id: productId, depth: 0 });
        if (product) {
          const currentSales = product.sales || 0;
          payload.update({ collection: 'products', id: productId, data: { sales: currentSales + quantity } });
        }
      } catch (error) {
        payload.logger.error(`Error updating sales count for product ${productId}: ${error.message}`);
      }
    }
  }
};

export const Orders: CollectionConfig = {
  slug: "orders",
  labels: { singular: { vi: "Đơn hàng", en: "Order" }, plural: { vi: "Đơn hàng", en: "Orders" } },
  admin: {
    useAsTitle: "id",
    group: { vi: "Quản lý bán hàng", en: "Sales Management" },
    defaultColumns: ["id", "user", "total", "status"],
  },
  hooks: {
    beforeChange: [checkInventoryAndDecrement],
    afterChange: [updateProductSales],
  },
  access: { read: () => true, create: () => true, update: () => true, delete: () => true },
  fields: [
    { name: "user", type: "relationship", relationTo: "users", label: { vi: "Khách hàng", en: "Customer" }, required: true },
    {
      name: "items",
      type: "array",
      label: { vi: "Sản phẩm trong đơn", en: "Order Items" },
      fields: [
        { name: "product", type: "relationship", relationTo: "products", required: true },
        { name: "quantity", type: "number", label: { vi: "Số lượng", en: "Quantity" }, min: 1, required: true },
        {
          name: "price",
          type: "number",
          label: { vi: "Đơn giá", en: "Price" },
          admin: { description: "Giá của sản phẩm tại thời điểm đặt hàng." },
        },
      ],
    },
    { name: "total", type: "number", label: { vi: "Tổng tiền", en: "Total" }, required: true },
    {
      name: "status",
      type: "select",
      label: { vi: "Trạng thái đơn hàng", en: "Order Status" },
      options: [
        { value: "pending", label: "Pending" },
        { value: "processing", label: "Processing" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
      ],
      defaultValue: "pending",
    },
    shippingAddressField(),
    { name: "paymentMethod", type: "text", label: { vi: "Phương thức thanh toán", en: "Payment Method" } },
  ],
};