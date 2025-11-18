import { defaultColors } from "@payloadcms/richtext-lexical";
import { colorConfig } from "./colorConfig";
export const extendDefaultColor = {
  text: {
    ...defaultColors.text,
    ...colorConfig.text,
  },
  background: {
    ...defaultColors.background,
    ...colorConfig.background,
  },
};
