import React from 'react';
import ItemAllDashboard from "../../../../components/dashboard/item/all/ItemAllDashboard";
import 'antd/dist/antd.css';
import {RecoilRoot} from "recoil";
import Layout from "../../../../components/layout/layout";
import {InferGetServerSidePropsType} from 'next';
import axios from 'axios';
import {API_ENDPOINTS} from '../../../../config/endpoints'

export const getServerSideProps = async () => {
    const itemRes = await axios.get(API_ENDPOINTS.NEXT + '/api/dashboard/item');
    const itemData = itemRes.data;

    const mallRes = await axios.get(API_ENDPOINTS.NEXT + '/api/dashboard/mall');
    const mallData = mallRes.data;

    return {props: {itemData, mallData}}
}

const index = ({itemData, mallData}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <RecoilRoot>
        <Layout title="상품 - 전체">
            <ItemAllDashboard itemData={itemData} mallData={mallData}/>
        </Layout>
    </RecoilRoot>
)

export default index;