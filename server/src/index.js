import express from "express";
import bodyParser from "body-parser";
import config from "config";
import "colors";
import errorHandle from "@/middlewares/errorHandle";
import routers from "@/routers";
import apiRouter from "@/api";

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.enable("trust proxy");
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,DELETE,POST,PUT");
  next();
});

app.use("/api-self/v1/", routers);

app.use(apiRouter);

app.use(errorHandle);

const port = process.env.PORT || config.port;

app.listen(port, e => {
  console.log("\nAPI server listening at ".green);
  console.log(("=> http://127.0.0.1:" + port).cyan + "\n");
});
