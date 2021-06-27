import { Col, Row } from 'antd'
import React from 'react'
import RoomList from './RoomList'
import UserInfo from './UserInfo'
import styles from './styles/sidebar.module.scss'

export default function SideBar() {
    return (
        <div className={styles.sidebarWrapper}>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </div>
    )
}
