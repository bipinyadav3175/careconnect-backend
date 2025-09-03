import express from "express"
import router from "./routes.js"
import dbConnect from "./dbConnect.js"
import geo from "./services/geo.js"
import mongoose from "mongoose"
import hospital from "./modals/hospital.js"
// import dotenv from 'dotenv'
// dotenv.config()


const app = express()
const PORT = process.env.PORT || 5000

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