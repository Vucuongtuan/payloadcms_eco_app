import { Media } from "@/payload-types";
import { CollectionBeforeChangeHook } from "payload";
import sharp from "sharp";
const blurAbleMimeTypes: string[] = ["image/jpeg", "image/png", "image/webp"];





export const generateBlurImage:CollectionBeforeChangeHook = async ({data,req}) => {
    const doc = data as Media;
    const file = req?.file;
    try {
      if (
        !doc.mimeType ||
        !blurAbleMimeTypes.includes(doc.mimeType) ||
        typeof doc.blurData === "string"
      ) {
        return doc;
      }
      if (file?.data) {
        console.log("Generating blur data...");
        const resized = await sharp(file.data).resize(10).blur().toBuffer();
  
        const base64 = resized.toString("base64");
        const mime = file.mimetype || "image/jpeg";
        doc.blurData = `data:${mime};base64,${base64}`
        return doc;
      }
    } catch (error) {
      console.error((error as Error).message);
      doc.blurData = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAASBAMAAADI5sFhAAAAKlBMVEXWzNzZ0OD37eXW1OHRyNbU0d7b4OfW3OTW2eLf1eXr5uvi4+vy6ujIwctyquTEAAAA3klEQVQY0yXQoQ7CMBAG4GvCA3BZELPTuGbJcBO1JEuWvkIR+BY/sT4Boa9Q0AjqkKQS23fhrvzu/9rcNYWOs/88T0uP2IYAe4b8ebpFAwvkmlgBAA8QX68Y451gAjWKFowx55SSIdgoRXBZnbPGnC4EG74hKd4752WdEWgyYiMHv/QEgrZQBOJu7vU0Aa9VahzpKmqOPFyhlCMZEXfvLUEpBFuhZ+mdPRN8vwSo52G19CQG7jvprUkpRig8AVGultojZ1C8oqk953fuqLbYDKtJj3f9GhAhhBuf/3v3A8XYZf1jUclIAAAAAElFTkSuQmCC'
      return doc;
    } 
}
