export const formatDate = (date) => {
  const inputDate = new Date(date);

  const options = { year: "numeric", month: "long", day: "numeric" };

  return inputDate.toLocaleDateString("id-ID", options);
};
