require("dotenv").config();

const express = require("express");
const app = express();
const routers = require("./routers");
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routers);

// app.listen(PORT, () => {
//   console.log("App running on port: ", PORT);
// });

module.exports = app;
