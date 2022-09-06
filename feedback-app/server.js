const fs = require("fs").promises;
const path = require("path");
const { urlencoded } = require("express");

const express = require("express");
const { open, close } = require("fs");

const app = express();

app.use(urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/feedback", express.static("feedback"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "pages", "feedback.html");
  res.sendFile(filePath);
});

app.get("/exists", (req, res) => {
  const filePath = path.join(__dirname, "pages", "exists.html");
  res.sendFile(filePath);
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, "temp", adjTitle + ".txt");
  const finalFilePath = path.join(__dirname, "feedback", adjTitle + ".txt");

  await fs.writeFile(tempFilePath, content);
  open(finalFilePath, "wx", async (err, fd) => {
    if (err) {
      if (err.code === "EEXIST") {
        console.error(`${finalFilePath} already exists`);
        res.redirect("/exists");
        return;
      }

      console.log(err);
      res.redirect("/");
    }

    try {
      await fs.rename(tempFilePath, finalFilePath);
      res.redirect("/");
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
});

app.listen(80);
