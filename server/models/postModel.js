const { Schema, model, SchemaTypes } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ['Agriculture', 'Buisiness', "Education", 'Entertainment', "Art", 'Investment', "Uncategorized", "Weather"], message: 'Value is not supported' },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true })

module.exports = model("Post", postSchema);