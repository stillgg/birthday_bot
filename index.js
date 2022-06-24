require("dotenv").config();

const token = process.env.TOKEN;
const chatId = process.env.PRODUCKTV_DEV_CHAT_ID;
// const chatId = process.env.TEST_CHAT_ID;

const TelegramBot = require("node-telegram-bot-api");
const CronJob = require("cron").CronJob;
const bot = new TelegramBot(token, { polling: true });

const { randomIntFromInterval, getCurrentDate } = require("./helpers");
const { users } = require("./data");

const everyDay = "0 12 * * *";
const everyMinute = "0 */1 * * * *";
const every5Second = "*/5 * * * * *";

const generateRandomImage = () => `img${randomIntFromInterval(1, 60)}.jpeg`;

const job = new CronJob(everyDay, async function () {
  const currentDate = getCurrentDate();

  for (user of users) {
    if (user.birthday === currentDate) {
      try {
        const img = generateRandomImage();

        await bot.sendPhoto(chatId, `./assets/${img}`);

        await bot.sendMessage(
          chatId,
          `
          <b>Happy birthday ${user.nickname}!!!</b>
          `,
          {
            parse_mode: "HTML",
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
});

job.start();
