import React,{forwardRef} from 'react'
import './Post.scss'
import { Avatar } from '@mui/material'
import InputOption from '../InputOption/InputOption'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
const Post = forwardRef(({name,description,message,photoUrl},ref) => {
  return (
    <div ref={ref} className='post'>
        <div className="post__header">
            <Avatar src={photoUrl}>{name[0]}</Avatar>
            <div className="post__info">
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
        </div>
        <div className="post__body">
            {message}
        </div>
        <div className="post__buttons">
            <InputOption Icon={ThumbUpAltOutlinedIcon} title='Like' color='gray' />
            <InputOption Icon={ChatOutlinedIcon} title='Comment' color='gray' />
            <InputOption Icon={ShareOutlinedIcon} title='Share' color='gray' />
            <InputOption Icon={SendOutlinedIcon} title='Send' color='gray' />

        </div>

    </div>
  )
})

export default Post