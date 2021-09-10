import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { FormControl, Checkbox } from '@material-ui/core';
import * as yup from "yup"
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostUserStatus } from '../../../data/Forum/Post';
import { IconWithNumber } from '../../Miscellaneous/IconWithNumber';

interface PostReactionFormProps {
    nrOfPlus: number;
    nrOfMinus: number;
    postUserStatus?: PostUserStatus;
}

const setValueOptions = { shouldDirty: true, shouldTouch: true, shouldValidate: true }

export default function PostReactionForm(props: PostReactionFormProps) {
    const { nrOfPlus, nrOfMinus, postUserStatus } = props;

    const schema = yup.object().shape({
        isLiked: yup.boolean().notRequired(),
        isDisliked: yup.boolean().notRequired(),
        isReported: yup.boolean().notRequired()
    })

    const { control, setValue } = useForm<PostUserStatus>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            isLiked: postUserStatus?.isLiked ?? false,
            isDisliked: postUserStatus?.isDisliked ?? false,
            isReported: postUserStatus?.isReported ?? false
        }
    })

    return (
        <div>
            <FormControl>
                <Controller render={({field}) => (
                    <IconWithNumber iconToShow={
                        <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={data => setValue('isLiked', Boolean(data.target.checked), setValueOptions)}
                            icon={<ThumbUpAltOutlinedIcon htmlColor={'rgb(54, 192, 61)'} />}
                            checkedIcon={<ThumbUpIcon htmlColor={'rgb(54, 192, 61)'} />}
                        /> 
                    }
                    numberToShow={nrOfPlus} />
                )}
                control={control}
                name="isLiked"
                />
            </FormControl>
        </div>
    )
}