import express from "express"
import router from "./routes.js"
import dbConnect from "./dbConnect.js"
import dotenv from "dotenv"
import geo from "./services/geo.js"
import mongoose from "mongoose"
import hospital from "./modals/hospital.js"
// import dotenv from 'dotenv'
dotenv.config()

import cors from "cors"


const app = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://fend-teal.vercel.app'], // Whitelist your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  credentials: true // Allow sending cookies and authorization headers
};
app.use(cors(corsOptions));

dbConnect()
app.use(express.json({ limit: "8mb" }))
app.use(express.urlencoded({ extended: true }))

// try {
//     const h = new hospital({
//         name: "xyz",
//         cords: [23.454454, 87.454545435],
//         departments: [
//             "ortho",
//             "ent"
//         ],
//         vacancy: 5
//     })
//     await h.save();
//     console.log("saved");
// } catch (err) {
//    console.log(err);
// }


app.use(router)
app.listen(PORT, () => console.log("Server running on port:", PORT))