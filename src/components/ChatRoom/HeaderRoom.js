import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Spin, Tooltip } from 'antd'
import React from 'react'
import styles from './styles/headerRoom.module.scss'


export default function HeaderRoom({selectedRoom,members,setInviteMemberModalVisible}) {

    return (
        <div className={styles.headerRoom}>
            <div className={styles.headerRoomInfo}>
                <p className={styles.headerRoomTitle}>
                    {selectedRoom?selectedRoom.name:<Spin size="small"/>}
                </p>
                <span className={styles.headerRoomDescription}>
                    {selectedRoom?selectedRoom.description:<Spin size="small" />}
                </span>
            </div>
            <div className={styles.buttonGroup}>
                <Button type="text" icon={<UserAddOutlined />} onClick={()=>setInviteMemberModalVisible(true)}>Mời</Button>
                <Avatar.Group size="small" maxCount={2}>
                    {
                        members.map(member=><Tooltip title={member.displayName}>
                        <Avatar src={member.photoURL}>
                            {member.photoURL?'':member.displayName?.charAt(0).toUpperCase()}
                        </Avatar>
                    </Tooltip>)
                    }
                </Avatar.Group>
            </div>

        </div>
    )
}
