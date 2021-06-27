import { Avatar, Form, Input, Modal, Select, Spin } from 'antd'
import { debounce } from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider';
import { db } from '../../firebase/config';
import { FirebaseService } from '../../firebase/services';

function DebounceSelect({fetchOptions,debounceTimeout=300,curMembers,...props}){
    const [fetching,setFetching]=useState(false);
    const [options,setOptions]=useState([]);

    const debounceFetcher=useMemo(()=>{
        const loadOptions=(value)=>{
            setOptions([]);
            setFetching(true);

            fetchOptions(value,curMembers).then((newOptions)=>{
                setOptions(newOptions);
                setFetching(false)
            })
        }
        return debounce(loadOptions,debounceTimeout)
    },[debounceTimeout,fetchOptions,curMembers])

    useEffect(()=>{
        return ()=>{
            setOptions([])
        }
    },[])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" />:null}
            {...props}
        >
            {options.map((opt)=>(
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}

async function fetchUserList(search,curMembers){
    return db
        .collection('users')
        .where('keywords','array-contains',search?.toLowerCase())
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot)=>{
            return snapshot.docs.map((doc)=>({
                label:doc.data().displayName,
                value:doc.data().uid,
                photoURL:doc.data().photoURL
            })).filter((opt)=>!curMembers.includes(opt.value))
        })
}

export default function InviteMemberModal() {
    const {inviteMemberModalVisible,setInviteMemberModalVisible,selectedRoomId,selectedRoom}=useContext(AppContext)
    const [form]=Form.useForm();
    const [value,setValue]=useState([])
    const handleOk=()=>{
        form.resetFields()
        setValue([]);
        const roomRef=db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members:[...selectedRoom.members,...value.map((val)=>val.value)]
        })
        setInviteMemberModalVisible(false)
    }
    const handleCancel=()=>{
        form.resetFields()
        setValue([])
        setInviteMemberModalVisible(false)
    }
    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                visible={inviteMemberModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect 
                        mode='multiple'
                        name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue)=>setValue(newValue)}
                        style={{width:'100%'}}
                        curMembers={selectedRoom.members}
                    />
                </Form>
                
            </Modal>
        </div>
    )
}
