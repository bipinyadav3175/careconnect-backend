import mongoose from "mongoose"

const dbConnect = () => {
    mongoose.connect("mongodb+srv://bipinyadav3175_db_user:Cd8MrmTwdANRA9ht@cluster0.5hgfomp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Database connected :)"))
        .catch((err) => console.error(err))
}

export default dbConnect