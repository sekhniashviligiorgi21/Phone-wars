const sqlite3 = require("sqlite3").verbose();

// This creates (or opens) a SQLite database file named votes.db
const db = new sqlite3.Database("./votes.db");

// Create a table for votes if it doesn’t exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS votes (choice TEXT PRIMARY KEY, count INTEGER)");

  // Insert Samsung/iPhone/Google if they’re not already there
    const stmt = db.prepare("INSERT OR IGNORE INTO votes (choice, count) VALUES (?, ?)");
    stmt.run("samsung", 0);
    stmt.run("iphone", 0);
    stmt.run("google", 0);
    stmt.finalize();
});

module.exports = db;