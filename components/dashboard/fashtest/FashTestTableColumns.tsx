import moment from 'moment';

const columns = () => {
	return (
		[
			{
				title: 'mbti',
				dataIndex: 'mbti',
				width: 150,
				render: (mbti: string) => <span>{mbti}</span>
			},
			{
				title: 'timestamp',
				dataIndex: 'timestamp',
				width: 150,
				render: (timestamp: string) => <span>{moment(timestamp).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss')}</span>
			}
		]
	)
}


export const FashTestTableColumns = {
	columns: columns,
}
