import React, { useEffect, useState } from 'react'
import { Descriptions, Layout, Table } from 'antd'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { DashboardMenu } from '../common/DashboardMenu'
import { FashTestTableColumns } from './FashTestTableColumns'
import { fashTestResultList } from '../../../stores/dahsboard/fashtest/states'
import { Chart } from 'react-google-charts'

const { Header, Content } = Layout

interface FashTestDashboardProps {
	fashTestData: any[],
}

const FashTestDashboard = ({ fashTestData }: FashTestDashboardProps) => {

	const router = useRouter()

	const [resultList, setResultList] = useRecoilState(fashTestResultList)
	const [chartData, setChartData] = useState<any>()
	const [mbtiList, setMbtiList] = useState<string[]>([
		'ISTJ', 'ESTJ', 'ISTP', 'ESTP', 'ISFJ', 'ESFJ', 'ISFP', 'ESFP', 'INTJ', 'ENTJ', 'INTP', 'ENTP', 'INFJ', 'ENFJ', 'INFP', 'ENFP'
	])

	const config = {
		appendPadding: 10,
		data: chartData,
		angleField: 'value',
		colorField: 'type',
		radius: 0.8,
		label: {
			type: 'spider',
			labelHeight: 28,
			content: '{name}\n{percentage}'
		},
		interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
	}

	const getChartData = () => {
		return (
			mbtiList.map(mbti => {
				const count = fashTestData.reduce((cnt, element) => cnt + (mbti === element.mbti), 0)
				return (
					[mbti, count]
				)
			}))
	}

	useEffect(() => {

		if (sessionStorage.getItem('token') === null ||
			sessionStorage.getItem('admin') === null ||
			sessionStorage.getItem('admin') === 'false') {
			sessionStorage.clear()
			router.push('/auth')
		}

	}, [])

	useEffect(() => {
		if (fashTestData && fashTestData.length > 0) {
			const chartData = getChartData()
			console.log(chartData)
			setChartData(chartData)
		}
	}, [fashTestData])

	return (
		<Layout>
			<DashboardMenu path={router.asPath} />
			<Layout className="site-layout" style={{ marginLeft: 200 }}>
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: '24px 0 0', overflow: 'initial' }}>
					<div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
						<div>
							{chartData && <div style={{ marginBottom: 40, border: '1px solid black' }}>
								<Descriptions layout="vertical" bordered size="small"
															column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}>
									<Descriptions.Item label="테스트 결과 차트">
										<Chart
											width={'100%'}
											height={'500px'}
											chartType="PieChart"
											data={[['MBTI', '개수']].concat(chartData)}
											options={{
												title: 'MBTI별 결과 개수'
											}}
										/>
									</Descriptions.Item>
								</Descriptions>
							</div>
							}
							<div>
								<Table columns={FashTestTableColumns.columns()} rowKey={record => record.timestamp}
											 dataSource={fashTestData}
											 pagination={{ pageSize: 50 }} scroll={{ y: 400 }} />
							</div>
						</div>
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}

export default FashTestDashboard
