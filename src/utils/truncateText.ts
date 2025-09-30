export const truncate = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num - 3) + "...";
};
export const shorten = (str: string, num: number) => {
  if (str.length <= num) return str;

  const shortened = str.slice(0, num);
  const lastSpace = shortened.lastIndexOf(" ");
  return shortened.slice(0, lastSpace) + "...";
};
