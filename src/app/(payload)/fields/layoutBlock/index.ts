import { Field, Option, SelectField } from "payload";

<<<<<<< HEAD
const layoutOptions: Option[] = [
  {
    label: "grid",
    value: "grid",
  },
  {
    label: "list",
    value: "list",
  },
];
=======
const layoutOptions: Option[] = [];
>>>>>>> 4544019ae85173e44fdbc8897c62b598e02bf364

interface LayoutBlockOptions {
  name?: string;
  label?: string | { en: string; vi: string };
  defaultValue?: string;
  overrides?: Partial<Field>;
}

export const createLayoutBlockField = ({
  name = "layout",
  label = { en: "Layout", vi: "Bố cục" },
  defaultValue = "grid",
  overrides = {},
}: LayoutBlockOptions): Field => ({
  name,
  label,
  type: "select",
  options: layoutOptions,
  defaultValue,
  admin: {
    components: {
      Field:
        "@/app/(payload)/fields/layoutBlock/LayoutSelectComponent#LayoutSelectComponent",
    },
    ...(overrides.admin || {}),
  } as any,
  ...overrides,
});

export const layoutBlock: Field = createLayoutBlockField({});
