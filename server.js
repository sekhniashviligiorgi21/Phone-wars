const express = require("express");
const path=require("path")
const dotenv = require("dotenv").config();
const db = require("./db");

const app = express();
const port = process.env.PORT || 5001;
const cors = require("cors")
app.use(cors())

// Middleware so Express can read JSON bodies
app.use(express.json());

// POST /vote (user votes for Samsung/iPhone/Google)
app.post("/vote", (req, res) => {
    const choice = req.body.choice;

    db.run(
    "UPDATE votes SET count = count + 1 WHERE choice = ?",
    [choice],
    function (err) {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, choice });
    }
    );
});

// GET /results (see vote counts)
app.get("/results", (req, res) => {
    db.all("SELECT choice, count FROM votes", [], (err, rows) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }

    // Convert rows (array) into object
    const results = {};
    rows.forEach((row) => {
        results[row.choice] = row.count;
    });

    res.json(results);
    });
});

// Serve the frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

