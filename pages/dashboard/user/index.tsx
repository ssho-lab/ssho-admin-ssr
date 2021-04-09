import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {RecoilRoot} from "recoil";
import Layout from "../../../components/layout/layout";
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import UserDashboard from '../../../components/dashboard/user/UserDashboard';

export const getServerSideProps = async () => {
    const userRes = await axios.get('http://localhost:3000/api/dashboard/user');
    const userData = userRes.data;

    return {props: {userData}}
}

const index = ({ userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <RecoilRoot>
        <Layout title="회원">
            <UserDashboard userData={userData}/>
        </Layout>
    </RecoilRoot>
)

export default index;