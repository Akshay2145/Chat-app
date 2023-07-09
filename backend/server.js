// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");
// const AesCtr = require("./encryption/aes-ctr");
// // const FileReaderSync = require("filereader");

// dotenv.config();
// connectDB();
// const app = express();

// app.use(express.json()); // to accept json data

// // app.get("/", (req, res) => {
// //   res.send("API Running!");
// // });

// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

// // --------------------------deployment------------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// // --------------------------deployment------------------------------

// // Error Handling middlewares

// const arr = ["128" , "192" , "256"];
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT;

// const server = app.listen(
//   5000,
//   console.log(`Server running on ${PORT} ...`.yellow.bold)
// );

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     // credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     // var timeNow = new Date();
//     // newMessageRecieved.createdAt = timeNow;
//     // console.log("message is: " , newMessageRecieved.content);
//     // console.log("time before encryption: " , timeNow.getTime());
//     // newMessageRecieved.content = AesCtr.encrypt(newMessageRecieved.content , 'akshay' , 128);
//     // console.log("time after encryption: " , new Date().getTime());
//     // console.log("encryption delay is: " , new Date().getTime() - timeNow.getTime());

//     // console.log("encrypted to: " , newMessageRecieved.content);
//     console.log(`\nmessage is: ${newMessageRecieved.content}`.blue.bold);
 

//     arr.forEach((keySize) => {
//       var timeNow = new Date();
//       console.log(`\n\nfor key size: ${parseInt(keySize)}`.blue.bold);
//       console.log("time before encryption: " , timeNow.getTime());
//       newMessageRecieved.content = AesCtr.encrypt(newMessageRecieved.content , 'akshay' , parseInt(keySize));
//       console.log("time after encryption: " , new Date().getTime());
//       console.log("encryption delay is: " , new Date().getTime() - timeNow.getTime());

//       var timeNow2 = new Date();
//       console.log("time before decryption: " , timeNow2.getTime());
//       newMessageRecieved.content = AesCtr.decrypt(newMessageRecieved.content , 'akshay' , parseInt(keySize));
//       console.log("time after decryption: " , new Date().getTime());
//       console.log("decryption delay is: " , new Date().getTime() - timeNow2.getTime());

//     });
//     // var reader = new FileReaderSync();
//     // var plaintext = reader.readAsText(newMessageRecieved.content, 'utf-8');
//     // var ciphertext = AesCtr.encrypt(plaintext, msg.data.password, msg.data.bits);
//     // return encrypted file as Blob; UI thread can then use saveAs()

//     var chat = newMessageRecieved.chat;

//     // var ciphertext = AesCtr.encrypt(newMessageRecieved.content , 'akshay' , 128);
//     // newMessageRecieved.content = new Blob([ciphertext], { type: 'text/plain' });
//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;
//       socket.in(user._id).emit("message recieved", newMessageRecieved);
  
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });



const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const AesCtr = require("./encryption/aes-ctr");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares

const arr = ["128" , "192" , "256"];
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  5000,
  console.log(`Server running on ${PORT} ...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    // var timeNow = new Date();
    // newMessageRecieved.createdAt = timeNow;
    // console.log("message is: " , newMessageRecieved.content);
    // console.log("time before encryption: " , timeNow.getTime());
    // newMessageRecieved.content = AesCtr.encrypt(newMessageRecieved.content , 'akshay' , 128);
    // console.log("time after encryption: " , new Date().getTime());
    // console.log("encryption delay is: " , new Date().getTime() - timeNow.getTime());

    // console.log("encrypted to: " , newMessageRecieved.content);
    console.log(`\nmessage is: ${newMessageRecieved.content}`.blue.bold);
 

    arr.forEach((keySize) => {
      var timeNow = new Date();
      console.log(`\n\nfor key size: ${parseInt(keySize)}`.blue.bold);
      console.log("time before encryption: " , timeNow.getTime());
      newMessageRecieved.content = AesCtr.encrypt(newMessageRecieved.content , 'akshay' , parseInt(keySize));
      console.log("time after encryption: " , new Date().getTime());
      console.log("encryption delay is: " , new Date().getTime() - timeNow.getTime());

      var timeNow2 = new Date();
      console.log("time before decryption: " , timeNow2.getTime());
      newMessageRecieved.content = AesCtr.decrypt(newMessageRecieved.content , 'akshay' , parseInt(keySize));
      console.log("time after decryption: " , new Date().getTime());
      console.log("decryption delay is: " , new Date().getTime() - timeNow2.getTime());

    });

    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
  
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
