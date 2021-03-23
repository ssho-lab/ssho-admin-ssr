import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import API_ENDPOINTS from '../../../config/endpoints';
import {Form, Input, Button, Row, Col, message} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";

interface SignInProps {

}

const SignIn = () => {

    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (sessionStorage.getItem('name') != null) {
            router.push('/item');
        }
    }, []);

    const signin = (email: string, password: string, adminLogin: boolean) => {

        axios.post(API_ENDPOINTS.CORE_API + '/users/signin', {
            email: email,
            password: password
        }).then(function (response: any) {
            if (response.data !== null && response.data.token !== "") {

                const {token, name, admin} = response.data

                sessionStorage.setItem('token', token)
                sessionStorage.setItem('name', name)
                sessionStorage.setItem('admin', admin)

                if (adminLogin) {
                    if (admin) {
                        router.push('/admin')
                    } else {
                        message.error('관리자가 아닙니다.');
                    }
                } else {
                    router.push("/item")
                }
            }
        })

            .catch(function (error) {
                message.error('로그인에 실패했습니다.');
            })
    }

    const onFinish = (email: string, password: string, adminLogin: boolean) => {
        signin(email, password, adminLogin);
    };


    return (
        <div style={{height: "100vh", padding: "30vh 0 0 0"}}>
            <Form name="basic" initialValues={{remember: true}}>
                <Row>
                    <Col span={8} offset={8}>
                        <Form.Item
                            name="email">
                            <Input onChange={(e) => setEmail(e.target.value)}
                                   prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="이메일"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <Form.Item
                            name="password">
                            <Input onChange={(e) => setPassword(e.target.value)}
                                   prefix={<LockOutlined className="site-form-item-icon"/>}
                                   type="password"
                                   placeholder="비밀번호"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <Row>
                            <Col span={10} offset={0}>
                                <Button style={{width: '100%'}} onClick={() => onFinish(email, password, false)}
                                        type="primary">
                                    로그인
                                </Button>
                            </Col>
                            <Col span={10} offset={4}>
                                <Button style={{width: '100%'}} onClick={() => onFinish(email, password, true)}
                                        type="primary">
                                    관리자 로그인
                                </Button>
                            </Col>
                        </Row>
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