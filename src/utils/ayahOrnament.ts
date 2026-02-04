export const toArabicIndic = (n: number | string) => {
  const map = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(n).replace(/\d/g, d => map[Number(d)]);
};
