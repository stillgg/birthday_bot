require("dotenv").config();

const token = process.env.TOKEN;
const chatId = process.env.TEST_CHAT_ID;

const TelegramBot = require("node-telegram-bot-api");
const CronJob = require("cron").CronJob;
const bot = new TelegramBot(token, { polling: true });

const users = [
  {
    name: "Egor",
    birthday: "03.07.2002",
  },
  {
    name: "Petya",
    birthday: "03.05.2022",
  },
];

const everyDay = "0 0 */11 * * *";

const everyMinute = "0 */1 * * * *";

const every10Second = "*/10 * * * * *";

const getCurrentDate = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [year, month, day] = currentDate.split("-");
  return `${day}.${month}.${year}`;
};

const job = new CronJob(everyDay, function () {
  const currentDate = getCurrentDate();
  for (user of users) {
    if (user.birthday === currentDate) {
      bot.sendMessage(chatId, `happy birthday ${user.name}!!!`);
    }
  }
});

job.start();
