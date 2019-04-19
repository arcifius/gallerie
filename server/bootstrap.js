const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/uploaded", express.static("./server/uploaded"));

app.post("/upload", (req, res) => {
  console.log(req.body);

  req.body.images.forEach(image => {
    const base64Data = image.data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(
      `./server/uploaded/${image.name}-${new Date().getTime()}.png`,
      base64Data,
      "base64",
      function(err) {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  res.sendStatus(200);
});

app.get("/uploaded", (req, res) => {
  const uploaded = fs.readdirSync(`./server/uploaded`).map(file => {
    return `http://localhost:3005/uploaded/${file}`;
  });

  res.send(uploaded);
});

app.listen(3005);
