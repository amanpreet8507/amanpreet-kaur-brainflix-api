const express = require('express')
const fs = require('fs')
const router = express.Router();
const videosData = require("../data/videos.json")
const { v4: uuidv4 } = require('uuid');

// get all videos with data
router.route("/")
    .get((req, res)=> {
        res.status(200).json(videosData)
    })

// get video by id
router.route("/:id")
    .get((req, res) => {
        const {id} = req.params;
        const videoMatch = videosData.find((video)=>video.id == id);
        res.status(200).json(videoMatch);

        if(!videoMatch) return res.status(404).json("No videos found!");
    })
// post video


// post comments               
router.route("/:id/comments")
    .post((req, res) => {
        const {name, comment} = req.body;

        if(!name || !comment) return res.status(400).json("Plese input comment")

        const videoId = req.params.id;
        const freshCommentsList = JSON.parse(fs.readFileSync("./data/videos.json"))
        
        // Find the video
        const video = freshCommentsList.find( video => videoId === videoId);
        if(!video){
            return res.status(404).json("video not found");
        }

        // new comment object
        const newComment = {
            id: uuidv4(),
            name, 
            comment,
            likes:0,
            timestamp: Date.now(),
        }

        video.comments.push(newComment);

        // putting the new comments to the file
        fs.writeFileSync("./data/videos.json", JSON.stringify(freshCommentsList))

        res.status(201).json(video)
    })  

module.exports = router;