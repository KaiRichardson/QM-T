var express = require("express");

var router = express.Router();

// Import the model (post.js) to use its database functions.
var post = require("../models/post.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    post.all(function(data) {
        var hbsObject = {
            posts: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/posts", function(req, res) {
    post.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/posts/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    post.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/posts/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    post.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;