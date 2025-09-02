import { Field } from 'payload';

interface ColorFieldOptions {
  name?: string;
  label?: string;
}

export const createColorField = ({
  name = 'color',
  label = 'Color',
}: ColorFieldOptions): Field => ({
  name,
  type: 'text',
  label,
  admin: {
    components: {
      Field: '@/app/(payload)/fields/colorPicker/CustomTailWindColors#SelectColorFont', 
    },
  },
});
export const createBackgroundColorField = ({
  name = 'backgroundColor',
  label = 'Color',
}: ColorFieldOptions): Field => ({
  name,
  type: 'text',
  label,
  admin: {
    components: {
      Field: '@/app/(payload)/fields/colorPicker/CustomTailWindColors#SelectColorBackground',
    },
  },
});