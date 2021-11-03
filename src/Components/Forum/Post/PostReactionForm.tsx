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
import { snackbarError, snackBarSuccess } from '../../../data/General/SnackBar';
import { BackendError } from '../../../data/General/BackendError';
import { useState } from 'react';
import ButtonCollored from '../../Miscellaneous/ButtonCollored';
import useBasicState from '../../../data/General/BasicState';
import { MiscellaneousProperties } from '../../../Properties/MiscellaneousProperties';
import { useTranslation } from 'react-i18next';

interface PostReactionFormProps {
    nrOfPlus: number;
    nrOfMinus: number;
    postUserStatus?: PostUserStatus;
    color: string;
    isLoggedUser: boolean;
}

export default function PostReactionForm(props: PostReactionFormProps) {
    const { nrOfPlus, nrOfMinus, postUserStatus, color, isLoggedUser } = props;
    const setValueOptions = MiscellaneousProperties.reactHookFormSetValueOption;
    const [nrOfLiked, setNrOfLiked] = useState<number>(nrOfPlus)
    const [nrOfDisliked, setNrOfDisliked] = useState<number>(nrOfMinus)
    const { snackbar, open, openElement, closeElement, t, i18n } = useBasicState()

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

    async function updateStatus(status: PostUserStatus) {
        if (postUserStatus !== undefined) {
            await ForumService.updatePostUserStatus(postUserStatus?.ids.post.postId, { ...postUserStatus, ...status }, t, i18n)
            .then(_ => snackbar(t("forum.post.generalPostForm.opinionSubmitted"), snackBarSuccess))
            .catch((error: BackendError) => {
                snackbar(error.message, snackbarError)
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

            <IconButton onClick={() => openElement()} disabled={isLoggedUser}>
                {getValues().isReported ? <ReportIcon htmlColor={color} /> : <ReportOutlinedIcon htmlColor={color} />}
            </IconButton>

            <Dialog open={open}>
                <DialogTitle>
                    {`Report this Post`}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {t("forum.post.generalPostForm.reportPostQuestion")}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <ButtonCollored onClick={() => closeElement()} text={t("input.close")}/>
                    <ButtonCollored onClick={() => {
                        setValue('isReported', true, setValueOptions);
                        closeElement()
                        handleSubmit(updateStatus)();
                    }} text={t("forum.post.generalPostForm.reportButton")} />
                </DialogActions>
            </Dialog>
        </form>
    )
}