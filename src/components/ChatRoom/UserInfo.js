import { Button, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { auth, db } from '../../firebase/config'
import styles from './styles/userInfo.module.scss'

export default function UserInfo() {
    const handleSignout=()=>{
        auth.signOut()
    }
    

    const {user:{
        displayName,
        photoURL
    }}=useContext(AuthContext);
    return (
        <div className={styles.userInfoWrapper}>
            <div>
                <Avatar src={photoURL}>{photoURL?'':displayName?.charAt[0].toUpperCase()}</Avatar>
                <Typography.Text className={styles.userInfoName}>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={handleSignout}>Đăng xuất</Button>
        </div>
    )
}
