
const AWS = require("aws-sdk");
const express = require('express');
const router = express.Router();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "us-east-2",
    accessKeyId: "",
    secretAccessKey: ""
})

// get all to-dos
router.get('/', (req, res) => {
    const params = {
        TableName: "todos"
    };

    dynamoDB.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            res.render('index', {
                items: data.Items
            })
        }
    })
})

// add to-do
router.post('/', (req, res) => {
    const date = new Date();
    const params = {
        TableName : "todos",
        Item : {
            "task": req.body.todo,
            "time": date.toUTCString()
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
});

// delete to-dos
router.get('/:todo', (req, res) => {
    const params = {
        TableName: "todos",
        Key: {
            "task": req.params.todo
        }
    };
  
    dynamoDB.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Successfully deleted.");
        }
    })
  });

module.exports = router