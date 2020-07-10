
const AWS = require("aws-sdk");
const express = require('express');
const router = express.Router();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "us-east-2",
    accessKeyId: "AKIA5HCZRDOBS7GS5XYC",
    secretAccessKey: "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"
})

// get all to-dos
const allTodos = [];
router.get('/', (req, res) => {
    const params = {
        TableName: "todos"
    };

    dynamoDB.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(todo) {
                allTodos.unshift(todo);
            });
        }
    })
})

// add to-do
router.post('/', (req, res) => {
    const params = {
        TableName : "todos",
        Item : {
            "task": req.body.todo
        }
    }
    dynamoDB.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    res.redirect('/');
})

module.exports = router