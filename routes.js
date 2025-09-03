import express from "express"
import searchController from "./controllers/searchController.js";
const router = express.Router()


router.get('/', (req, res)=> res.send("hello from server"));

router.post('/search', searchController.search);

export default router;