const EMPTY = {
  port: 8080,
  shutdownTimeout: 10,
  cisUpdateUrl: "http://localhost/",
  cisStatusUrl: "http://localhost/",
  cisStatusTimeout: 10,
  cisStatusRetryCount: 3,
  personApiUrl: "http://localhost/"
};

Object.freeze(EMPTY);

export { EMPTY };
