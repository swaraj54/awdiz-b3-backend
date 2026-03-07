import express, { application } from "express";
import MainRouter from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./models/user.schema.js";

const app = express();

dotenv.config();

// use - middleware to parse JSON bodies
// application level middleware
app.use(express.json()); // JSON -> JS

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`, "check");
//   if (req.url != "/") {
//     res.send("This is a middleware response");
//   }
//   next();
// });

function bodyDataCheck(req, res, next) {
  if (!req.body?.username || !req.body?.password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  } else {
    return next();
  }
  console.log("This is a middleware function");
}

app.post("/login", bodyDataCheck, (req, res) => {
  res.send("This is a login route");
});

const usersList = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1", MainRouter);

app.get("/get-users", (req, res) => {
  res.json({ users: usersList });
});

app.post("/add-user", (req, res) => {
  console.log(req.body);
  usersList.push(req.body);
  res.json({ message: "User added successfully", users: usersList });
});

// ROute paramter
// query parameter
app.put("/update-user/:id", (req, res) => {
  console.log(req.params.id);
  const userId = parseInt(req.params.id);

  const userIndex = usersList.findIndex((user) => user.id === userId);

  console.log(userIndex, "userIndex 2");

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  } else {
    usersList[userIndex] = { id: userId, name: req.body.name };
  }
  res.json({
    users: usersList,
    message: `User with id ${req.params.id} updated successfully`,
  });
});

app.delete("/delete-user", (req, res) => {
  console.log(req.query.user);
  const userId = parseInt(req.query.user);

  const userIndex = usersList.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  } else {
    usersList.splice(userIndex, 1);
  }
  res.json({ message: "User deleted successfully", users: usersList });
});

app.get("/add-user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const newUser = new UserSchema({
      name: name,
      email: email,
      password: password,
    });
    console.log(newUser, "newUser");

    await newUser.save(); 
    
    return res
      .status(201)
      .json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
