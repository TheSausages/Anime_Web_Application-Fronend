import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ReportIcon from '@material-ui/icons/Report';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import { FormControl, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import * as yup from "yup"
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostUserStatus } from '../../../data/Forum/Post';
import { IconWithNumber } from '../../Miscellaneous/IconWithNumber';
import { ForumService } from '../../../Scripts/Services/ForumService';
import { snackbarError, snackbarInfo } from '../../../data/General/SnackBar';
import { BackendError } from '../../../data/General/BackendError';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import ButtonCollored from '../../Miscellaneous/ButtonCollored';

interface PostReactionFormProps {
    nrOfPlus: number;
    nrOfMinus: number;
    postUserStatus?: PostUserStatus;
    color: string;
    isLoggedUser: boolean;
}

const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true }

export default function PostReactionForm(props: PostReactionFormProps) {
    const { nrOfPlus, nrOfMinus, postUserStatus, color, isLoggedUser } = props;
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [nrOfLiked, setNrOfLiked] = useState<number>(nrOfPlus)
    const [nrOfDisliked, setNrOfDisliked] = useState<number>(nrOfMinus)
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        isLiked: yup.boolean().notRequired(),
        isDisliked: yup.boolean().notRequired(),
        isReported: yup.boolean().notRequired()
    })

    const { control, handleSubmit, setValue, getValues } = useForm<PostUserStatus>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            isLiked: postUserStatus?.isLiked ?? false,
            isDisliked: postUserStatus?.isDisliked ?? false,
            isReported: postUserStatus?.isReported ?? false
        }
    })

    function updateStatus(status: PostUserStatus) {
        if (postUserStatus !== undefined) {
            ForumService.updatePostUserStatus(postUserStatus?.ids.post.postId, { ...postUserStatus, ...status })
            .then(_ => enqueueSnackbar("Opinion submitted!", snackbarInfo))
            .catch((error: BackendError) => {
                enqueueSnackbar(error.message, snackbarError)
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(updateStatus)}>
            <FormControl>
                <Controller render={({field}) => (
                    <IconWithNumber iconToShow={
                        <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={data => {
                                const newVal = Boolean(data.target.checked);

                                setValue('isLiked', newVal, setValueOptions);
                                if (newVal && getValues().isDisliked) {
                                    setValue('isDisliked', false, setValueOptions);
                                    setNrOfDisliked(nrOfDisliked - 1)
                                }
                                setNrOfLiked(newVal ? (nrOfLiked + 1) : (nrOfLiked - 1))
                                handleSubmit(updateStatus)();
                            }}
                            icon={<ThumbUpAltOutlinedIcon htmlColor={color} />}
                            checkedIcon={<ThumbUpIcon htmlColor={color} />}
                            disabled={isLoggedUser}
                        /> 
                    }
                    numberToShow={nrOfLiked} />
                )}
                control={control}
                name="isLiked"
                />
            </FormControl>

            <FormControl>
                <Controller render={({field}) => (
                    <IconWithNumber iconToShow={
                        <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={data => {
                                const newVal = Boolean(data.target.checked);

                                setValue('isDisliked', newVal, setValueOptions);
                                if (newVal && getValues().isLiked) {
                                    setValue('isLiked', false, setValueOptions);
                                    setNrOfLiked(nrOfLiked - 1)
                                }
                                setNrOfDisliked(newVal ? (nrOfDisliked + 1) : (nrOfDisliked - 1))
                                handleSubmit(updateStatus)();
                            }}
                            icon={<ThumbDownAltOutlinedIcon htmlColor={color} />}
                            checkedIcon={<ThumbDownIcon htmlColor={color} />}
                            disabled={isLoggedUser}
                        /> 
                    }
                    numberToShow={nrOfDisliked} />
                )}
                control={control}
                name="isDisliked"
                />
            </FormControl>

            <IconButton onClick={() => setOpenReport(true)} disabled={isLoggedUser}>
                {getValues().isReported ? <ReportIcon htmlColor={color} /> : <ReportOutlinedIcon htmlColor={color} />}
            </IconButton>

            <Dialog open={openReport}>
                <DialogTitle>
                    {`Report this Post`}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to report this posts?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <ButtonCollored onClick={() => setOpenReport(false)} text="Close"/>
                    <ButtonCollored onClick={() => {
                        setValue('isReported', true, setValueOptions);
                        setOpenReport(false);
                        handleSubmit(updateStatus)();
                    }} text="Report"/>
                </DialogActions>
            </Dialog>
        </form>
    )
}