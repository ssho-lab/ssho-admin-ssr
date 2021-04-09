import React, { useEffect, useState } from 'react';
import ItemDashboard from "../../../components/dashboard/item/ItemDashboard";
import 'antd/dist/antd.css';
import {RecoilRoot} from "recoil";
import Layout from "../../../components/layout/layout";
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';

export const getServerSideProps = async () => {
    const itemRes = await axios.get('http://localhost:3000/api/dashboard/item');
    const itemData = itemRes.data;

    const mallRes = await axios.get('http://localhost:3000/api/dashboard/mall');
    const mallData = mallRes.data;
    
    return {props: {itemData, mallData}}
}

const index = ({ itemData, mallData }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <RecoilRoot>
        <Layout title="상품">
            <ItemDashboard itemData={itemData} mallData={mallData}/>
        </Layout>
    </RecoilRoot>
)

export default index;