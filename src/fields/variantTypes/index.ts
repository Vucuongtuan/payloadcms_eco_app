import type { Access, CollectionConfig, Field, FieldAccess } from "payload";

type Props = {
  access: {
    adminOnly: NonNullable<AccessConfig["adminOnly"]>;
    publicAccess: NonNullable<AccessConfig["publicAccess"]>;
  };
  /**
   * Slug of the variant options collection, defaults to 'variantOptions'.
   */
  variantOptionsSlug?: string;
};

export const createVariantTypesCollection: (
  props: Props
) => CollectionConfig = (props) => {
  const {
    access: { adminOnly, publicAccess },
    variantOptionsSlug = "variantOptions",
  } = props || {};

  const fields: Field[] = [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "options",
      type: "join",
      // @ts-expect-error
      collection: variantOptionsSlug,
      maxDepth: 2,
      on: "variantType",
      orderable: true,
    },
  ];

  const baseConfig: CollectionConfig = {
    slug: "variantTypes",
    access: {
      create: adminOnly,
      delete: adminOnly,
      read: publicAccess,
      update: adminOnly,
    },
    admin: {
      group: false,
      useAsTitle: "label",
    },
    fields,
    labels: {
      plural: ({ t }) =>
        // @ts-expect-error - translations are not typed in plugins yet
        t("plugin-ecommerce:variantTypes"),
      singular: ({ t }) =>
        // @ts-expect-error - translations are not typed in plugins yet
        t("plugin-ecommerce:variantType"),
    },
    trash: true,
  };

  return { ...baseConfig };
};
export type AccessConfig = {
  /**
   * Limited to only admin users.
   */
  adminOnly: Access;
  /**
   * Limited to only admin users, specifically for Field level access control.
   */
  adminOnlyFieldAccess: FieldAccess;
  /**
   * Is the owner of the document via the `customer` field or is an admin.
   */
  adminOrCustomerOwner: Access;
  /**
   * The document status is published or user is admin.
   */
  adminOrPublishedStatus: Access;
  /**
   * Authenticated users only. Defaults to the example function.
   *
   * @example
   * anyUser: ({ req }) => !!req?.user
   */
  authenticatedOnly?: Access;
  /**
   * Limited to customers only, specifically for Field level access control.
   */
  customerOnlyFieldAccess: FieldAccess;
  /**
   * Entirely public access. Defaults to the example function.
   *
   * @example
   * publicAccess: () => true
   */
  publicAccess?: Access;
};
