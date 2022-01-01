import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
export const getPosts = async (req, res) => {

    const { page } = req.query;
    
    try {
        const LIMIT = 8; //no of posts per page

        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page and Number(page) means req.query gets string but we want number.

        const total = await PostMessage.countDocuments({}); // how many post we have.

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    // const { page } = req.query; //we are passing through the url query

    // try {
    //     const LIMIT = 8; //no of posts per page
    //     const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    //     const total = await PostMessage.countDocuments({}); // how many post we have.
        
    //     const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    //     res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    // } catch (error){
    //     res.status(404).json({ message: error.message });
    // }

    // try {
    //     const postMessage = await PostMessage.find();
    //     res.status(200).json(postMessage);
    // } catch (error){
    //     res.status(404).json({ message: error.message });
    // }

}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// QUERY -> /posts?page=1 -> page = 1
// PARAMS -> /posts/123 -> id = 123
export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query

    try {
        const title = new RegExp(searchQuery, 'i');  // i --> Test test TEST -> test

        // console.log(tags)

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') }}] });

        res.json({ data: posts });

    } catch (error) {
        res.status(404).json({ message: error.message })
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

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id); // get the post from DB equal to that id

    post.comments.push(value); // adding the comments to that post

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true }); // update the database that post contains the new comment

    res.json(updatedPost);
}