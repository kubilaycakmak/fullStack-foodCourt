import Post from "../models/posts.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        // if(error)
        res.status(404).json({
            createdAt:{
                type:Date,
                default:new Date()
            },
            message:error.message
        })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        // if(error)
        res.status(409).json({
            createdAt:{
                type:Date,
                default:new Date()
            },
            message:error.message
        })
    }
}