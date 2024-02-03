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

    // post video
    .post((req, res)=>{
        const {title, image, description} = req.body;

        if(!title || !description || !image) return res.status(400).json("Please input all video details!")

        // new video object
        const newVideo = {
            id: uuidv4(),
            title,
            channel:"channel",
            image,
            description,
            views: 0,
            likes: 0,
            duration:0,
            video: "video",
            timestamp: Date.now(),
            comments:[]
        }
        const videosList = JSON.parse(fs.readFileSync("./data/videos.json"))
        videosList.push(newVideo)

        fs.writeFileSync("./data/videos.json", JSON.stringify(videosList))
        res.status(201).json("video uploaded!")
    })


// get video by id
router.route("/:id")
    .get((req, res) => {
        const {id} = req.params;
        const videoMatch = videosData.find((video)=>video.id == id);
        res.status(200).json(videoMatch);

        if(!videoMatch) return res.status(404).json("No videos found!");
    })

// post comments               
router.route("/:id/comments")
    .post((req, res) => {
        const {name, comment} = req.body;

        if(!name || !comment) return res.status(400).json("Plese input comment")

        const videoId = req.params.id;
        // read file
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