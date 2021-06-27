import { Alert } from 'antd'
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import ContentRoom from './ContentRoom'
import HeaderRoom from './HeaderRoom'

const WrapperStyled=styled.div`
    height: 100vh;
`

export default function ChatWindow() {
    const {selectedRoom,members,setInviteMemberModalVisible}=useContext(AppContext)
    const {user}=useContext(AuthContext)
    return (
        <WrapperStyled>
                {
                    selectedRoom.id?
                    <>
                        <HeaderRoom selectedRoom={selectedRoom} members={members} setInviteMemberModalVisible={setInviteMemberModalVisible}/>
                        <ContentRoom selectedRoom={selectedRoom} user={user} />
                    </>
                    :(
                        <Alert
                          message='Hãy chọn phòng'
                          type='info'
                          showIcon
                          style={{ margin: 5 }}
                          closable
                        />
                      )
                }
        </WrapperStyled>
    )
}
