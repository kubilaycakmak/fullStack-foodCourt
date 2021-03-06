import React, { useState, useEffect } from 'react'
import { CssBaseline, Container, Grid, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PenIcon from '@material-ui/icons/Create'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PostsList from './components/PostsList.jsx';
import AddPostForm from './components/AddPostForm.jsx'
import { fetchPosts } from './actions/post';
import { useDispatch } from 'react-redux';
import PostDetails from './components/PostDetails.jsx';
const useStyles = makeStyles((theme) =>
({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3)
  }
})
)

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar
          position="static"
          color="inherit"
          elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
            </IconButton>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.title}
            >
              <a href="/posts">FoodCourt</a>
            </Typography>
            <Button color="primary" variant="outlined" startIcon={<PenIcon />} onClick={handleOpen}>Yeni Yazi</Button>
          </Toolbar>
        </AppBar>

        <Grid container className={classes.container}>
          <Grid item xs={12} >
            <Router>
              <Switch>
                <Route exact path="/posts" component={PostsList}></Route>
                <Route exact path="/posts/:id" component={PostDetails}></Route>
              </Switch>
              <Redirect from="/" to="/posts" ></Redirect>
            </Router>
          </Grid>
        </Grid>
      </Container>

      <AddPostForm open={open} handleClose={handleClose} />
    </>
  )
}

export default App;