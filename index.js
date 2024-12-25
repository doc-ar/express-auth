const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db-connection");
const userRoutes = require("./routes/userRoutes");

const PORT = 3000;
const app = express();
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(express.json());

connectDB();
app.use("/", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
