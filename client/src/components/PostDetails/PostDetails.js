import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'; // that deals with time
import { useParams, useHistory } from 'react-router-dom';

import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();       // posts/12o22

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if(post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',')}));    // we are not looking for search, tags use to recommend the posts 
        }
    }, [post])

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id); // current post cannot be in its own recommended post

    const openPost = (_id) => history.push(`/posts/${_id}`);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant='h3' component='h2'>{post.title}</Typography>
                    <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag}`)}</Typography>
                    <Typography gutterBottom variant='body1' component='p'>{post.message}</Typography>
                    <Typography variant='h6'> Created by: {post.name}</Typography>
                    <Typography>{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant='body1'><strong>Realtime Chat - comming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post}/>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://images.unsplash.com/photo-1640457298166-fe3eddec2d5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'} alt={post.title} />
                    {/* https://images.unsplash.com/photo-1638913971251-832d29947de6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80  */}
                </div>
            </div>
            {/* RECOMMENDED POSTS */}
            {recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'> You might also like: </Typography>
                    <Divider/>
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id}) => (
                            <div style={{ margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant='h6'>{title}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                                <Typography gutterBottom variant='subtitle1'> Likes: {likes?.length}</Typography>
                                <img src={selectedFile} alt={title} width='200px'/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails
