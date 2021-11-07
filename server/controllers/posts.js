import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

// export const updatePost = async (req, res) => {
//     //id eka smana karanava _id ekata, tharamaka apehedili.
//     const { id: _id } = req.params;
//     //ewapu updated post eka post ekata gannava
//     const post = req.body;

//     if(!mongoose.types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

//     const updatedPost = postMessage.findByIdAndUpdate(_id, post, { new: true });

//     res.json(updatedPost);
// }

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post delete successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        // like a post
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(likePost);
}