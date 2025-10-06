import express from 'express'
import cors from 'cors'

let app = express()

app.use(cors())
app.use(express.json())


app.get('/',(req, res)=> {
    res.send({
        message: "You are now connected to backend..."
    })
})

app.listen(5000, ()=> console.log("Server is listening on port no. 5000...."))