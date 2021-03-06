const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getCurrentDate = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [year, month, day] = currentDate.split("-");

  console.log("result", `${day}.${month}`);

  return `${day}.${month}`;
};

module.exports = {
  randomIntFromInterval,
  getCurrentDate,
};
