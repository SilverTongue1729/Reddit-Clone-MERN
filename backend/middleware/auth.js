import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.status(200).send({ name: "John Doe" });
});