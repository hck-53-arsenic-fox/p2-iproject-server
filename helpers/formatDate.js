const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const formatDate = (date) => {
  return new Date(`${date}`).toLocaleDateString("en-EN", options);
};

module.exports = { formatDate };
