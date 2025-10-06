import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const uri = process.env.MONGO_URI;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

let app = express()

app.use(cors())
app.use(express.json())


app.get('/',(req, res)=> {
    res.send({
        message: "You are now connected to backend..."
    })
})

app.listen(5000, ()=> console.log("Server is listening on port no. 5000...."))