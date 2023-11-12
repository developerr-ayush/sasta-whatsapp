const express = require("express");
require("dotenv").config();

const app = express();
const path = require("path");
const { Chat } = require("./modals/Chat");
// setting up
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// running express
app.listen(8080, () => console.log("Server running on port 8080!"));
app.get("/", (req, res) => {
  Chat.find({}).then((chats) => {
    res.render("chats", { chats });
  });
});
app.post("/send", (req, res) => {
  let newChat = new Chat({ ...req.body, createdAt: Date.now() });
  newChat
    .save()
    .then(() => {
      {
        console.log("Chat saved");
      }
    })
    .catch((err) => {
      {
        console.log(err);
      }
    });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  let { id } = req.params;
  Chat.findById(id).then((chat) => {
    res.render("edit", { chat });
  });
});
app.post("/edit/:id", (req, res) => {
  let { id } = req.params;
  let { message } = req.body;
  Chat.findByIdAndUpdate(id, { message, updatedAt: Date.now() }).then(
    (chat) => {
      res.redirect("/");
      console.log(chat);
    }
  );
});
app.post("/delete/:id", (req, res) => {
  let { id } = req.params;
  Chat.findByIdAndDelete(id).then(() => {
    res.redirect("/");
  });
});
