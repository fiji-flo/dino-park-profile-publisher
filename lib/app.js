import http from "http";

import express from "express";
import bodyParser from "body-parser";

import UserUpdate from "./userUpdate";
import ExternalUpdate from "./externalUpdate";

class App {
  constructor(cfg) {
    this.port = cfg.port;
    this.shutdownTimeout = cfg.shutdownTimeout;
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.post("/userupdate", UserUpdate.createHandler(cfg));
    this.app.post("/externalupdate", ExternalUpdate.createHandler(cfg));
  }

  run() {
    this.server = http.createServer(this.app);
    return this.server.listen(this.port);
  }

  stop() {
    let timer;
    const killer = new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new Error("timed out closing http server")),
        this.shutdownTimeout
      );
    });
    const close = new Promise(resolve =>
      this.server.close(() => {
        clearTimeout(timer);
        resolve();
      })
    );
    return Promise.race([close, killer]);
  }
}

export { App as default };
