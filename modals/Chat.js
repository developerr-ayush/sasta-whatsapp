const mongoose = require("mongoose");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const chatSchema = new mongoose.Schema({
  from: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
});
const Chat = mongoose.model("Chat", chatSchema);
module.exports.Chat = Chat;
