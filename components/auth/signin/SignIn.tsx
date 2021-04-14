import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Button, Col, Form, Input, message, Row} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useRecoilState} from "recoil";
import {signinState} from "../../../stores/auth/states";
import axios from 'axios';

interface SignInProps {
}

const SignIn = ({}: SignInProps) => {

    const router = useRouter();
    const [signinReq, setSigninReq] = useRecoilState(signinState);

    useEffect(() => {
        if (sessionStorage.getItem('name') != null) {
            router.push('/dashboard/item/all');
        }
    }, []);

    const saveSessionItems = (data: any) => {
        const {token, name, admin} = data

        sessionStorage.setItem('token', token)
        sessionStorage.setItem('name', name)
        sessionStorage.setItem('admin', admin)
    }

    const handleLogin = (adminLogin: boolean) => {

        axios.post('/api/auth/signin', signinReq).then((response) => {
            if (response.data !== null && response.data.token !== "") {

                saveSessionItems(response.data);

                if (sessionStorage.getItem('admin')) {
                    router.push('/dashboard/item/all')
                } else {
                    message.error('관리자가 아닙니다.');
                }
            }
        }).catch(function (error) {
            message.error('로그인에 실패했습니다.');
        })
    }

    return (
        <div style={{height: "100vh", padding: "30vh 0 0 0"}}>
            <Form name="basic" initialValues={{remember: true}}>
                <Row>
                    <Col span={8} offset={8}>
                        <Form.Item
                            name="email">
                            <Input onChange={(e) => setSigninReq({...signinReq, email: e.target.value})}
                                   prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="이메일"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <Form.Item
                            name="password">
                            <Input onChange={(e) => setSigninReq({...signinReq, password: e.target.value})}
                                   prefix={<LockOutlined className="site-form-item-icon"/>}
                                   type="password"
                                   placeholder="비밀번호"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <Button style={{width: '100%'}} onClick={() => handleLogin(false)}
                                type="primary">
                            로그인
                        </Button>
                    </Col>
                </Row>
                <Row id='auth-signup-btn-row'>
                    <Col span={8} offset={8}>
                        <Button style={{width: '100%'}} onClick={() => router.push('/signup')} type="default">
                            회원가입
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default SignIn;