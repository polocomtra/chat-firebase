import { Button, Form, Input } from "antd";
import React, { useMemo, useState } from "react";
import Message from "./Message";
import styled from "styled-components";
import styles from './styles/contentRoom.module.scss'
import { FirebaseService } from "../../firebase/services";
import { useForm } from "antd/lib/form/Form";
import useFireStore from "../../hooks/useFireStore";

const FormStyled=styled(Form)`
    .ant-form-item{
        flex:1;
        margin-bottom: 0;
    }
`
export default function ContentRoom({selectedRoom,user}) {
    const {uid,photoURL,displayName}=user
    const [inputValue,setInputValue]=useState('');
    const [form]=Form.useForm()
    const handleChange=(e)=>{
        setInputValue(e.target.value)
    }
    const handleSubmit=()=>{
        FirebaseService.addDocument('messages',{
            text:inputValue,
            uid,
            photoURL,
            roomId:selectedRoom.id,
            displayName
        })
        form.resetFields(['message'])
    }
    const messageCondition=useMemo(()=>({
        fieldName:'roomId',
        operator:'==',
        compareValue:selectedRoom.id
    }),[selectedRoom.id])
    const messages=useFireStore('messages',messageCondition)
    console.log({messages})
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.messageList}>
                {
                    messages.map(mess=>(
                        <Message
                            text={mess.text}
                            displayName={mess.displayName}
                            createdAt={mess.createdAt}
                            photoURL={mess.photoURL}
                />
                    ))
                }
                
            </div>
            <FormStyled className={styles.form} form={form}>
                <Form.Item name="message">
                    <Input bordered={false} placeholder="Nhập tin nhắn..." autoComplete="off" onChange={handleChange} onPressEnter={handleSubmit}></Input>
                </Form.Item>
                <Button type="primary" onClick={handleSubmit}>Gửi</Button>
            </FormStyled>
        </div>
    );
}
