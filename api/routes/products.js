import express from "express";
import axios from "axios";
import { addScore, JSON_SERVER_URL } from "../utils/product.js";
import ProductCache from "../caches/product.js";
const productCache = new ProductCache();

const router = express.Router();

// Route to get all posts from JSON Server
router.get("/", async (req, res) => {
  try {
    const chars = req.query.characteristic;
    const result = [...(await productCache.getFilteredProducts(chars))];
    res.json(result);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

router.get("/scores", async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/products`);
    const result = addScore(response.data);

    res.json(result);
  } catch (error) {
    console.error("Error fetching posts with scores:", error);
    res.status(500).send("Error fetching posts with scores");
  }
});

export default router;
