const express = require("express");
const app = express();
require("dotenv").config(); // no need to assign to dotenv
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Connect DB
connectDb();

// Middlewares
app.use(cors({
  origin: "https://food-blog-frontend.netlify.app",  // React frontend
  credentials: true
}));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

// Start server
app.listen(PORT, () => {
  console.log(`✅ App is running on port ${PORT}`);
});
