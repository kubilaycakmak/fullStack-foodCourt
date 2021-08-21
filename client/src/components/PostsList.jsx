import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import Post from './Post';
import ClipLoader from "react-spinners/ClipLoader";
import gridFour from "../images/grid_four.svg";
import gridThree from "../images/grid_three.svg";


const useStyles = makeStyles((theme) => ({
    layoutShifter: {
        float: "right",
        margin: theme.spacing(2)
    }
}));

const PostsList = () => {

    const posts = useSelector(state => state.posts.posts)

    const classes = useStyles();

    const [layout, setLayout] = useState("gridThree");

    const calculateMd = () => {
        return layout === "gridThree" ? 4 : 3;
    }

    if(posts.length === 0){
        return (
            <>
              <ClipLoader size={50} css={`
                display: block;
                margin: 120px auto;
                `} />  
            </>
        )
    }
    else
        return (
            <>
            { /*  */}
            <div className={classes.layoutShifter}>
                <Button variant="text" size="small" onClick={() => setLayout("gridThree")}>
                    <img src={gridThree} alt="Three Column" style={{ background: layout === "gridThree" ? "#ccc" : "" }} />
                </Button>

                <Button variant="text" size="small" onClick={() => setLayout("gridFour")}>
                    <img src={gridFour} alt="Four Column" style={{ background: layout === "gridFour" ? "#ccc" : "" }} />
                </Button>
            </div>
                <Grid container spacing={2} alignContent="stretch">
                    {
                        posts.length > 0 &&
                        posts.map((post) => (
                            <Grid item key={post?._id} xs={12} md={calculateMd()}>
                                <Post {...post} />
                            </Grid>
                        ))
                    }
                </Grid>
            </>
        )
}

export default PostsList
