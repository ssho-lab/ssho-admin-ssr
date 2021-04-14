import {InferGetServerSidePropsType} from "next";
import {RecoilRoot} from "recoil";
import Layout from "../../../components/layout/layout";
import axios from "axios";
import 'antd/dist/antd.css';
import {API_ENDPOINTS} from "../../../config/endpoints";
import TagDashboard from "../../../components/dashboard/tag/TagDashboard";

export const getServerSideProps = async () => {
    const tagRes = await axios.get(API_ENDPOINTS.NEXT + '/api/dashboard/tag');
    const tagData = tagRes.data;

    return {props: {tagData}}
}

const index = ({tagData}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <RecoilRoot>
        <Layout title="태그">
            <TagDashboard tagData={tagData}/>
        </Layout>
    </RecoilRoot>
)

export default index;