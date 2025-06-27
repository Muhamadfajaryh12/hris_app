export const useFormattedDate = (date) => {
  const dates = new Date(date);
  return dates.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
