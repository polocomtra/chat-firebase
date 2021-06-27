import { Form, Input, Modal } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider';
import { FirebaseService } from '../../firebase/services';

export default function AddRoomModal() {
    const {addRoomModalVisible,setAddRoomModalVisible}=useContext(AppContext)
    const {user:{uid}}=useContext(AuthContext)
    const [form]=Form.useForm();
    const handleOk=()=>{
        const data=form.getFieldsValue()
        FirebaseService.addDocument('rooms',{...data,members:[uid]})
        form.resetFields()
        setAddRoomModalVisible(false)
    }
    const handleCancel=()=>{
        form.resetFields()
        setAddRoomModalVisible(false)
    }
    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={addRoomModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form layout="vertical" form ={form}>
                    <Form.Item label="Tên phòng" name='name'>
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name='description'>
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
