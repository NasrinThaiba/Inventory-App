// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");

// require("dotenv").config();

// const app = express();

// const DB_URL = process.env.DB_URL;
// const PORT = process.env.PORT;

// mongoose.connect(DB_URL)
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log("MongoDB Error", err))

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));


// app.use("/categories", require("./routes/categoryRoutes"));
// app.use("/items", require("./routes/itemRoutes"));

// app.get("/", (req, res) => {
//     res.render("index");
// });

// app.listen(PORT, () => {
// console.log("Server running at http://localhost:3000");
// }); before version 19

import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import dns from "node:dns/promises";

import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;


mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error", err));


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);


app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});