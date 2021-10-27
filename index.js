import cors from 'cors';
import 'dotenv/config';

const NetworkSpeed = require("network-speed");
const express = require("express");
const app = express();
const port = process.env.PORT;
const testNetworkSpeed = new NetworkSpeed();

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    //getSpeedLoop();
    next();
}
  
app.use(cors());
app.use(requestTime);

app.get("/", (req, res) => res.send("Hello Worl2d! - " + req.requestTime));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

setInterval(getSpeedLoop, 2000);

function getSpeedLoop() {
  getNetworkDownloadSpeed()
    .then((down) => console.log("down " + down))
    .then(() => {
      getNetworkUploadSpeed().then((up) => console.log("up " + up));
    });
}

async function getNetworkDownloadSpeed() {
  const baseUrl =
    "https://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg"; //'https://httpbin.org/stream-bytes/100000';
  const fileSizeInBytes = 4995374;
  const speed = await testNetworkSpeed.checkDownloadSpeed(
    baseUrl,
    fileSizeInBytes
  );
  return await Promise.resolve(speed.mbps);
}

async function getNetworkUploadSpeed() {
  const options = {
    hostname: "www.httpbin.org",
    port: 443,
    path: "https://httpbin.org/anything",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fileSizeInBytes = 4995374;
  const speed = await testNetworkSpeed.checkUploadSpeed(
    options,
    fileSizeInBytes
  );
  return await Promise.resolve(speed.mbps);
}
