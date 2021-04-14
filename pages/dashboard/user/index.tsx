import React from 'react';
import 'antd/dist/antd.css';
import {RecoilRoot} from "recoil";
import Layout from "../../../components/layout/layout";
import {InferGetServerSidePropsType} from 'next';
import axios from 'axios';
import UserDashboard from '../../../components/dashboard/user/UserDashboard';
import {API_ENDPOINTS} from '../../../config/endpoints';

export const getServerSideProps = async () => {
    const userRes = await axios.get(API_ENDPOINTS.NEXT + '/api/dashboard/user');
    const userData = userRes.data;

    return {props: {userData}}
}

const index = ({userData}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <RecoilRoot>
        <Layout title="회원">
            <UserDashboard userData={userData}/>
        </Layout>
    </RecoilRoot>
)

export default index;