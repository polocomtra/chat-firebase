import { Button, Collapse, Typography } from 'antd'
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components';
import {PlusSquareOutlined} from '@ant-design/icons'
import { AuthContext } from '../../Context/AuthProvider';
import useFireStore from '../../hooks/useFireStore';
import AppProvider, { AppContext } from '../../Context/AppProvider';

const {Panel}=Collapse;

const PanelStyle=styled(Panel)`
    &&& {
        .ant-collapse-header, p{
            color:white
        }

        .ant-collapse-content-box{
            padding: 0 40px;
        }

        .add-room{
            color:white;
            padding:0
        }
    }
`

const LinkedStyle=styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color:white
`

const RoomList=()=> {
    const {rooms,setAddRoomModalVisible,setSelectedRoomId}=useContext(AppContext)
    const openAddRoomModal=()=>{
        setAddRoomModalVisible(true)
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyle header="Danh sách các phòng" key={1}>
            {
                rooms.map(room=><LinkedStyle key={room.id} onClick={()=>setSelectedRoomId(room.id)}>{room.name}</LinkedStyle>)
            }
                <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={openAddRoomModal}>Thêm phòng</Button>
            </PanelStyle>
        </Collapse>
    )
}

export default RoomList;
