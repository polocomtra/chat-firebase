import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns';
import React from 'react'
import styles from './styles/message.module.scss'

const formatDate=(seconds)=>{
    let formattedDate='';
    if(seconds){
        formattedDate=formatRelative(new Date(seconds * 1000),new Date());
        formattedDate=formattedDate.charAt(0).toUpperCase()+formattedDate.slice(1);
    }
    return formattedDate
}

export default function Message({text,displayName,createdAt,photoURL}) {
    return (
        <div className={styles.messageWrapper}>
            <div>
                <Avatar size="small" src={photoURL}>
                    {photoURL?'':displayName?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography.Text className={styles.author}>{displayName}</Typography.Text>
                <Typography.Text className={styles.date}>{formatDate(createdAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className={styles.content}>{text}</Typography.Text>
            </div>
        </div>
    )
}
