import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core';
import {
    Button,
    TextField,
    Select,
    Input,
    MenuItem,
} from '@material-ui/core';

import { useDispatch } from 'react-redux'
import FileBase64 from 'react-file-base64';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePost } from '../actions/post';


const useStyles = makeStyles((theme) => 
    ({
        textField:{
            marginBottom:theme.spacing(2),
        },
        buttons:{
            marginTop: theme.spacing(2),
        },
        button:{
            marginRight: theme.spacing(2)
        }
    })
);

const tags = ["dinner", "breakfast", "cookie", "desert"]
const postSchema = yup.object().shape(
    {
        title:yup.string().required(),
        subtitle:yup.string().required(),
        content:yup.string().min(20).required(),
        tag: yup.mixed().oneOf(tags)
    }
);

export const EditPostForm = ({ history, post, closeEditMode }) => {

    const dispatch = useDispatch();

    const [ file, setFile ] = useState(post?.image);    
    const { register, handleSubmit, control, errors, reset } = useForm({
        resolver: yupResolver(postSchema)
    });

    const onSubmit = (data) => {
        
        const updatedPost = {
            _id: post._id,
            ...data,
            image: file
        }
        dispatch(updatePost(post._id, updatedPost));
        reset();
        setFile(null);
        closeEditMode();
    };

    const classes = useStyles();
    
    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="title"
                    label="Başlık"
                    name='title'
                    variant='outlined'
                    className={classes.textField}
                    size='small'
                    inputRef={register}
                    error={errors.title ? true : false}
                    fullWidth
                    defaultValue={post?.title}
                />

                <TextField
                    id="subtitle"
                    label="Alt Başlık"
                    name='subtitle'
                    variant='outlined'
                    className={classes.textField}
                    size='small'
                    inputRef={register}
                    error={errors.subtitle ? true : false}
                    fullWidth
                    defaultValue={post?.subtitle}
                />

                <Controller 
                    as={
                        <Select
                        input={<Input />}
                        className={classes.textField}
                        defaultValue={post?.tag}
                        fullWidth
                        >
                            {
                                tags.map((tag, index) => (
                                    <MenuItem
                                    key={index}
                                    value={tag}
                                    >
                                        {tag}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    }

                    name='tag'
                    control={control}
                    error={errors.tag ? true : false}
                    defaultValue={tags[0]}
                />

                <TextField
                    id="content"
                    label="Açıklama"
                    name='content'
                    multiline
                    rows={4}
                    variant='outlined'
                    className={classes.textField}
                    size='small'
                    inputRef={register}
                    error={errors.content ? true : false}
                    fullWidth
                    defaultValue={post?.content}
                />

                <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)} />
                
                <div className={classes.buttons}>
                    <Button className={classes.button} color="secondary" variant="outlined" onClick={closeEditMode}>Vazgec</Button>
                    <Button color="primary" variant="outlined" type="submit">Kaydet</Button>
                </div>
            </form>
        </div>
    )
}

export default EditPostForm
