import { InferGetServerSidePropsType } from 'next'
import { RecoilRoot } from 'recoil'
import Layout from '../../../components/layout/layout'
import 'antd/dist/antd.css'
import FashTestDashboard from '../../../components/dashboard/fashtest/FashTestDashboard'
import client from '../../../config/ElasticSearchClient'

export const getServerSideProps = async () => {

	const { body } = await client.search({
		index: "fash-test-result",
		body: {
			query: {
				"match_all": {}
			},
			size: 1000
		},
	});

	const fashTestData = 	body.hits.hits.map(hit => hit._source);

	return {props: {fashTestData}}
}

const index = ({fashTestData}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
	<RecoilRoot>
		<Layout title="패션 테스트 결과">
			<FashTestDashboard fashTestData={fashTestData}/>
		</Layout>
	</RecoilRoot>
)

export default index;
