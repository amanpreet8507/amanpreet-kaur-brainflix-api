const express = require('express')
const fs = require('fs')
const router = express.Router();
const videosData = require("../data/videos.json")


router.route("/")
    .get((req, res)=> {
        res.status(200).json(videosData)
    })

router.route("/:id")
    .get((req, res) => {
        const {id} = req.params;
        const videoMatch = videosData.find((video)=>video.id == id);
        res.status(200).json(videoMatch);

        if(!videoMatch) return res.status(404).json("No videos found!");
    })

    // POST /videos/:id/comments
    // :id must be swapped out with the numeric id of a video as found in the list of videos
    // Creates a new comment for a specific video
    // Post body example
    // {
    //               "name": "Nigel",
    //               "comment": "This is a test"
    //             }
                
router.route("/:id/comments")
    .post((req, res) => {
        const {comments} = req.body;
        if(!comments.name || !comments.name) return res.status(400).json("Plese input comment")

        const newComment = {name, comment};
        newComment.id = newComment.length + 1;

        const freshCommentsList = JSON.parse(fs.readFileSync("../data/videos.json"))
        freshCommentsList.push(newComment);
        fs.writeFileSync("../data/videos.json", JSON.stringify(freshCommentsList))
        res.status(201).json(videosData)
    })  

module.exports = router;