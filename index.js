const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db-connection");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");

const PORT = 3000;
const app = express();
const corsOptions = { credentials: true, origin: process.env.URL || "*" };
const sessionOptions = {
  secret: "user-secret-key-very-secure-12345678",
  cookie: {
    maxAge: 20 * 60 * 1000,
    httpOnly: true,
    secure: false,
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session(sessionOptions));

connectDB();
app.use("/", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
