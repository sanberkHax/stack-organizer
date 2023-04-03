export const toLocaleDate = (date) => {
  return new Date(date * 1000).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
};
