const express = require("express");
const app = express();
const port = 3021;
const MongooseHandler = require("./MongooseHandler.js")

const APIKey = "top-secret-key"

app.use(express.urlencoded({ extended: false }))

function validateAPIKey(req, res, next) {
    if(!req.headers["api-x-key"] || req.headers["api-x-key"] != APIKey) return res.json({ status: "error", message: "Invalid API Key provided" })

    next()
}

app.get("/", (req, res) => {
    res.json({
        status: "good",
        message: "Mongoose Datastore is Active"
    })
})

app.get("/get/:Index", validateAPIKey, async (req, res) => {
    let JSON = await MongooseHandler.Get(req.params.Index);
    return res.json(JSON)
});

app.post("/set", validateAPIKey, async (req, res) => {
    let body = req.body;
    let JSON = await MongooseHandler.Set(req.body.Index, req.body.Value);
    return res.json(JSON)
})

app.post("/delete/:Index", validateAPIKey, async (req, res) => {
    let JSON = await MongooseHandler.Delete(req.params.Index)
    return res.json(JSON)
})

app.listen(port, () => console.log("Express server is online on PORT " + port))