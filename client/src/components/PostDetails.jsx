import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Paper, Divider, Button, Chip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import noImage from '../images/noimage.jpg'
import { fetchSinglePost } from '../actions/post'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(8),
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    content: {
        marginTop: theme.spacing(3),
    },
    image: {
        width: "100%",
        borderRadius: 5,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
    chip: {
        marginTop: theme.spacing(1),
    },
}));

const PostDetails = ({ history, location, match }) => {

    const dispatch = useDispatch();

    const { id } = match.params;

    const selectedPost = useSelector(state => state.posts.selectedPost);

    useEffect(() => {
        dispatch(fetchSinglePost(id));
    }, [dispatch])

    const convertRelativeTime = date => {
        return moment(date).fromNow();
    }

    const classes = useStyles();
    return (
        <Paper className={classes.paper} elevation={0}>
            <div>
                <div className={classes.header}>
                    <Typography variant="h5" gutterBottom>
                        {selectedPost?.title}
                    </Typography>
                </div>
                <Button
                    color='primary'
                    variant='outlined'
                    startIcon={<EditIcon />}>
                    Duzenle
                </Button>
                <Button
                    color='primary'
                    variant='outlined'
                    startIcon={<DeleteIcon />}>
                    Sil
                </Button>
            </div>

            <Divider />

            <Typography variant="overline" gutterBottom>
                {selectedPost?.subtitle}
            </Typography>

            <Typography variant="caption" component='p'>
                {convertRelativeTime(selectedPost?.createdAt)}
            </Typography>
            <Chip label={`# ${selectedPost?.tag}`} variant="outlined" className={classes.chip} />
            <div className={classes.content}>
                <img src={selectedPost?.image || noImage} alt="post" className={classes.image}></img>
                <Typography variant="body1">
                    {selectedPost?.content}
                </Typography>
            </div>
        </Paper>
    )
}

export default PostDetails
