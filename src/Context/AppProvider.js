import { Spin } from 'antd';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext=createContext();

export default function AppProvider({children}) {
    const [addRoomModalVisible,setAddRoomModalVisible]=useState(false)
    const [inviteMemberModalVisible,setInviteMemberModalVisible]=useState(false)
    const [selectedRoomId,setSelectedRoomId]=useState('')
    const {user:{uid}}=useContext(AuthContext)
    const roomsCondition=useMemo(()=>{
        return {
            fieldName:'members',
            operator:'array-contains',
            compareValue:uid
        }
    },[uid])

    const rooms=useFireStore('rooms',roomsCondition)
    const selectedRoom=useMemo(()=>
        rooms.find(room=>room.id===selectedRoomId) 
    || {},[rooms,selectedRoomId])
    const usersCondition=useMemo(()=>{
        return {
            fieldName:'uid',
            operator:'in',
            compareValue:selectedRoom.members
        }
    },[selectedRoom.members])
    const members=useFireStore('users',usersCondition)
    return (
        <AppContext.Provider value={{rooms,selectedRoom,members,addRoomModalVisible,setAddRoomModalVisible,selectedRoomId,setSelectedRoomId,inviteMemberModalVisible,setInviteMemberModalVisible}}>
            {children}
        </AppContext.Provider>
        
    )
}
