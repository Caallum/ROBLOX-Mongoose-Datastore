const mongoose = require("mongoose");
const url = ""
const DatabaseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, DatabaseOptions).then(() => console.log("Connected to Mongoose, now able to take requests"))

const DatastoreSchema = mongoose.Schema({
    key: String,
    value: mongoose.Schema.Types.Mixed
})

const Model = mongoose.model("Datastore", DatastoreSchema, "datastore");

function ValidIndexType(Index) {
    if(typeof Index == "string") return true
    
    return false;
}

function Get(Index) {
    if(!ValidIndexType(Index)) return {
        status: "error",
        message: "Invalid 'Index' type"
    }
    
    return Model.findOne({ key: Index }).then(doc => {
        if(doc == null) return {
            status: "good",
            index: Index,
            value: "undefined"
        };

        return {
            status: "good",
            index: Index,
            value: doc.Value
        }
    })
}

function Set(Index, Value) {
    return Model.replaceOne({ key: Index }, { Index: Index, Value: Value}, { upsert: true })
        .then(() => { return { status: "good", message: `Set value: ${value}` } })
        .catch((error) => { return { status: "error", message: error } })
}

function Delete(Index) {
    return Model.deleteOne({ key: Index })
        .then(() => { return { status: "good", message: `Deleted value: ${value}`} })
        .catch((error) => { return { status: "error", message: error } })
}

module.exports = {
    Set,
    Get,
    Delete
}