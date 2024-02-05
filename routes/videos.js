const express = require('express')
const fs = require('fs')
const router = express.Router();
const videosData = require("../data/videos.json");
const { v4: uuidv4 } = require('uuid');

// get all videos with data
router.route("/")
    .get((req, res)=> {
        res.status(200).json(videosData)
    })

    // post video
    .post((req, res)=>{
        const {title, description} = req.body;

        if(!title || !description) return res.status(400).json("Please input all video details!")
        const imagePath = "/public/images/Upload-video-preview.jpg"
        // new video object
        const newVideo = {
            id: uuidv4(),
            title,
            channel:"channel",
            image: imagePath,
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
        res.status(201).json(newVideo)
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

// put likes
router.route("/:videoId/likes")
    .put((req, res) => {
        const { videoId } = req.params;
        const video = videosData.find((video) => video.id === videoId);

        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        video.likes += 1;
        fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
        res.status(200).json({ message: "Liked successfully", likes: video.likes });
    });
    
module.exports = router;