//objective with this code is to test the network speed and return a timeout time based on it (slower = longer)

angular.module("placeholder").service("NetworkSpeedTest", function () {
  function getNetworkDownloadSpeed() {
    const baseUrl = "https://httpbin.org/stream-bytes/100000";
    const fileSizeInBytes = 100000;
    return new NetworkSpeed()
      .checkDownloadSpeed(baseUrl, fileSizeInBytes)
      .then((speed) => Promise.resolve(speed.mbps))
      .catch((err) => console.log(err));
  }

  function getNetworkUploadSpeed() {
    const options = {
      hostname: "www.httpbin.org",
      port: 80, //TODO: make dynamic, since 80 needed for localhost
      path: "/anything",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const fileSizeInBytes = 2000000;
    return new NetworkSpeed()
      .checkUploadSpeed(options, fileSizeInBytes)
      .then((speed) => Promise.resolve(speed.mbps))
      .catch((err) => console.log(err));
  }

  return {
    getSpeed: function getSpeedLoop() {
      return getNetworkDownloadSpeed()
        .then((down) => {
          console.log("down " + down + " mbps");
          return down;
        })
        .then((down) => {
          return getNetworkUploadSpeed().then((up) => {
            console.log("up " + up + " mbps");
            console.log(up < 2 || down < 2 ? 500 : 60);
            return up < 2 || down < 2 ? 500 : 60;
          });
        });
    },
  };
});
