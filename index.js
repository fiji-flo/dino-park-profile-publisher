import { load, logger } from "./lib/config";
import App from "./lib/app";

let app;

async function main() {
  try {
    const cfg = await load("config.json");

    app = new App(cfg);

    logger.info(`starting to serve on port: ${cfg.port}`);
    app.run();
  } catch (e) {
    logger.error(`Something went batshit wrong: ${e}`);
    process.exit(1);
  }
}

async function shutdown() {
  try {
    logger.info("shutting down…");
    await app.stop();
    logger.info("shut down gracefully :)");
    process.exit(0);
  } catch (e) {
    logger.error(`faild to stop: ${e}`);
    logger.error("exiting with exit code 1 :/");
    process.exit(1);
  }
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

main();
