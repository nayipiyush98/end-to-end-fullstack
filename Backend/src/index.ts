import Express from "express";

const app = Express();

app.use(Express.json());

app.post("/api", (req,res) => {
    
})

app.listen(3000)