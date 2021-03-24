import React, { useEffect, useState } from 'react';
import SignIn from "../../components/auth/signin/SignIn";
import 'antd/dist/antd.css';
import {RecoilRoot} from "recoil";
import Layout from "../../components/layout/layout";

const index = () => (
    <RecoilRoot>
        <Layout title="로그인">
            <SignIn/>
        </Layout>
    </RecoilRoot>
)

export default index;