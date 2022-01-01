import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from '@mui/icons-material';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => { //we create in Nov/06
        if (post?.likes?.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6} >
            <CardMedia onClick={openPost} className={classes.media} image={post.selectedFile || 'https://images.unsplash.com/photo-1602984338060-bfddce132ebc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post?.name || 'Memo'}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
                <Button
                    style={{ color: 'white' }}
                    size="large"
                    onClick={() => setCurrentId(post._id)}>
                    <MoreHoriz fontSize="default" />
                </Button>
            </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    {/* <ThumbUpAlt fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount} */}
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <Delete fontSize="small" />
                        Delete
                    </Button>
                )}

            </CardActions>
        </Card>
    )
}

export default Post
