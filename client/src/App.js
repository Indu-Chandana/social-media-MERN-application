import React, { useEffect, useState } from "react";
import { Grow, Container, AppBar, Typography, Grid } from '@mui/material';
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from './styles'
import { useDispatch } from "react-redux";
import { getPosts } from './actions/posts'
const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const[currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                {/* <img className={classes.image} src="https://purepng.com/public/uploads/thumbnail//google-stadia-logo-hd4.png" alt="memories" height="60" width="60" /> */}
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;