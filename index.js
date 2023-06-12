const express = require("express")
const app = express()
const { connection } = require("./db")
const { userRouter } = require("./Routes/User.router")
const { postRouter } = require("./Routes/Post.router")
const cors = require("cors")

app.use(express.json())

app.use(cors());

app.use("/users", userRouter);

app.use("/posts", postRouter)

app.get("/", async(req,res)=>{
    res.status.json({msg:"Home page"})
})

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
        console.log("cannot connect to Database")
    }
})


// const user = {
//     name: "Lokendra",
//     email: "lokendra@gmail.com",
//     gender: "Male",
//     password: "1234",
//     age: 90,
//     city: "Jaipur",
//     is_married: false
// }