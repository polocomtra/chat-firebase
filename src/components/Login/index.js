import styles from "./login.module.scss";
import React from "react";
import { Row, Col, Button, Typography } from "antd";
import firebase,{ auth, db } from "../../firebase/config";
import { useHistory } from "react-router-dom";
import { FirebaseService } from "../../firebase/services";


const { Title } = Typography;
const fbProvider=new firebase.auth.FacebookAuthProvider();
const ggProvider=new firebase.auth.GoogleAuthProvider();


export default function Login() {
    const handleFbLogin=()=>{
        auth.signInWithPopup(fbProvider)
    }
    const handleGGLogin=async ()=>{
        const data=await auth.signInWithPopup(ggProvider);
        const {additionalUserInfo,user}=data;
        if(additionalUserInfo?.isNewUser){
           FirebaseService.addDocument('users',{
            displayName:user.displayName,
            email:user.email,
            photoURL:user.photoURL,
            uid:user.uid,
            providerId:additionalUserInfo.providerId,
            keywords:FirebaseService.generateKeywords(user.displayName?.toLowerCase())
           })
        }
    }
    
    return (
        <div>
            <Row justify="center" className={styles.row}>
                <Col span={8}>
                    <Title level={3} className={styles.title}>
                        Fun Chat
                    </Title>
                    <Button className={styles.googleBtn} onClick={handleGGLogin}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button className={styles.facebookBtn} onClick={handleFbLogin}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
