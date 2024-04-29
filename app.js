const fs = require("fs");
const express = require("express");

const app = express();


app.get("/", (req, res) => {
  res.send("Hello, world!");
});


app.get("/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Transfer-Encoding": "chunked",
  });

  const src = fs.createReadStream("hugefile.txt");

  src.on("data", (data) => {
    const write_success = res.write(data); 

    if (!write_success)
      src.pause();
  });

  src.on("drain", () => {
    src.resume();
  });

  src.on("end", () => {
    res.end();
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

