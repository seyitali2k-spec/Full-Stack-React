import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
connectionString: process.env.DATABASE_URL,
});



app.get("/games", async (req, res) => {
try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
}
});



app.post("/games", async (req, res) => {
try {
    const { title, platform, status, rating, notes, image } = req.body;

    const result = await pool.query(
    `INSERT INTO games (title, platform, status, rating, notes, image)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
[title, platform, status, rating, notes, image]
);

res.json(result.rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Failed to add game" });
}
});

app.delete("/games/:id", async (req, res) => {
try {
const { id } = req.params;
await pool.query("DELETE FROM games WHERE id = $1", [id]);
res.json({ message: "Game deleted" });
} catch (err) {
console.error(err);
res.status(500).json({ error: "Delete failed" });
}
});


app.listen(5000, () => {
console.log("Server running on port 5000");
});