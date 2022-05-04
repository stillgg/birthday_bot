require("dotenv").config();
const token = process.env.TOKEN;
const chatId = process.env.TEST_CHAT_ID;

const TelegramBot = require("node-telegram-bot-api");
const CronJob = require("cron").CronJob;
const bot = new TelegramBot(token, { polling: true });

const { randomIntFromInterval, getCurrentDate } = require("./helpers");
const { users } = require("./data");

const everyDay = "0 0 */11 * * *";
const everyMinute = "0 */1 * * * *";
const every5Second = "*/5 * * * * *";

const generateRandomImage = () => `img${randomIntFromInterval(1, 40)}.jpeg`;

const job = new CronJob(everyDay, function () {
  const currentDate = getCurrentDate();

  for (user of users) {
    if (user.birthday === currentDate) {
      const img = generateRandomImage();
      bot.sendPhoto(chatId, `./assets/${img}`).then(() => {
        bot.sendMessage(
          chatId,
          `
          <b>Happy birthday ${user.name}!!!</b>
          `,
          {
            parse_mode: "HTML",
          }
        );
      });
    }
  }
});

job.start();
