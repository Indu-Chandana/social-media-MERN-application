import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import {useSelector} from 'react-redux'
import { Grid, CircularProgress } from '@mui/material';

const Posts = ({ setCurrentId }) => {
    // const posts = useSelector((state) => state.posts); // before we have only []
    const {posts, isLoading} = useSelector((state) => state.posts); // now we have { posts: []} // isLoading is we create in actions and reducers
    const classes = useStyles();

    // console.log(posts)

    if (!posts.length && !isLoading) return 'No posts'; // no post in MongoDB 

    return (
        // !posts?.length ---- we remove that now loading is manage by redux
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts
