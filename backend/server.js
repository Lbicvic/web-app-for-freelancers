const express = require("express");
require("dotenv").config();
const { connect } = require("./db/connection");
const apiRouter = require("./routes/apiRouter");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(apiRouter);

(async function () {
  await connect();

  app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
  });
})();
