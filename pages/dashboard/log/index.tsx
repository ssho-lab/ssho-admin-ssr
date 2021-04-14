import {InferGetServerSidePropsType} from "next";
import {RecoilRoot} from "recoil";
import Layout from "../../../components/layout/layout";
import SwipeLogDashboard from "../../../components/dashboard/log/SwipeLogDashboard";
import axios from "axios";
import 'antd/dist/antd.css';
import {API_ENDPOINTS} from "../../../config/endpoints";

export const getServerSideProps = async () => {
    const swipeLogRes = await axios.get(API_ENDPOINTS.NEXT + '/api/dashboard/log/swipe');
    const swipeLogData = swipeLogRes.data;

    return {props: {swipeLogData}}
}

const index = ({swipeLogData}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <RecoilRoot>
        <Layout title="스와이프 로그">
            <SwipeLogDashboard swipeLogData={swipeLogData}/>
        </Layout>
    </RecoilRoot>
)

export default index;