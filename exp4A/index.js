import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Fix __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");

// ================= ROUTES =================

// Home → open form directly
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// About
app.get("/about", (req, res) => {
  res.send("Name: Ved Yadav, Roll No: XX, Course: Computer Engineering");
});

// Contact
app.get("/contact", (req, res) => {
  res.send("Email: ved@email.com");
});

// POST register
app.post("/register", (req, res) => {
  res.status(201).send("Student Registered ✅");
});

// PUT update
app.put("/update", (req, res) => {
  res.status(200).send("Student Updated 🔄");
});

// Form route (optional)
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// ================= FORM SUBMIT (PRO UI) =================

app.post("/submit", (req, res) => {
  const { name, branch, year } = req.body;

  res.send(`
    <html>
    <head>
      <title>Submitted Data</title>
      <style>
        body {
          margin: 0;
          font-family: "Segoe UI", Arial;
          background: linear-gradient(135deg, #1e1e2f, #3a3a5a);
          color: white;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          width: 320px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
        }

        p {
          font-size: 18px;
          margin: 10px 0;
        }

        a {
          display: inline-block;
          margin-top: 15px;
          padding: 10px 15px;
          background: linear-gradient(to right, #0072ff, #00c6ff);
          color: white;
          text-decoration: none;
          border-radius: 8px;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="card">
          <h2>Submitted Data</h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Branch:</b> ${branch}</p>
          <p><b>Year:</b> ${year}</p>

          <a href="/">Go Back</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// ================= EJS =================

app.get("/profile", (req, res) => {
  res.render("profile", {
    name: "Ved",
    branch: "Computer Engineering",
    year: "SE"
  });
});

// ================= START SERVER =================

export default app;