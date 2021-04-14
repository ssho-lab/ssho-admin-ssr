import {InferGetServerSidePropsType} from "next";
import {RecoilRoot} from "recoil";
import Layout from "../../../components/layout/layout";
import MallDashboard from "../../../components/dashboard/mall/MallDashboard";
import axios from "axios";
import 'antd/dist/antd.css';
import {API_ENDPOINTS} from "../../../config/endpoints";

export const getServerSideProps = async () => {
    const mallRes = await axios.get(API_ENDPOINTS.NEXT + '/api/dashboard/mall');
    const mallData = mallRes.data;

    return {props: {mallData}}
}

const index = ({mallData}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <RecoilRoot>
        <Layout title="몰">
            <MallDashboard mallData={mallData}/>
        </Layout>
    </RecoilRoot>
)

export default index;