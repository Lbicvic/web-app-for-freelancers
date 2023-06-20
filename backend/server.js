const express = require("express");
require("dotenv").config();
const { connect } = require("./db/connection");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true
}))

app.use(express.json({ limit: '50mb' }));
app.use(apiRouter);

(async function () {
  await connect();

  app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
  });
})();
