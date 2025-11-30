// src/api/users.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("myDB"); // Database name

    if (req.method === "GET") {
      const users = await db.collection("users").find({}).toArray();
      res.status(200).json(users);
    } else if (req.method === "POST") {
      const newUser = req.body;
      const result = await db.collection("users").insertOne(newUser);
      res.status(201).json(result);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
