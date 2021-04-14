import {Button, Layout} from "antd";
import NumberFormat from 'react-number-format';
import {Category} from '../../../interfaces/dashboard/item';

const {Header, Content, Sider} = Layout;

const columns = () => {
    return (
        [
            {
                title: '회원 고유 번호',
                dataIndex: 'userId',
                width: 150,
                render: (userId: string) => <span>#{userId}</span>
            },
            {
                title: '세트 개수',
                dataIndex: 'setCount',
                key: 'setCount',
                width: 150,
            }
        ]
    )
}

const cardColumns = () => {
    return (
        [
            {title: '아이템 고유번호', dataIndex: 'itemId', key: 'itemId'},
            {
                title: '좋아요 여부',
                dataIndex: 'score',
                key: 'score',
                render: (score: number) => <span>{score === 1 ? '좋아요' : '싫어요'}</span>
            }
        ]
    )
}

const setColumns = () => {
    return(
        [
            {title: '카드셋 번호', dataIndex: 'setId', key: 'setId'},
            {title: '좋아요 비율', dataIndex: 'likeRatio', key: 'likeRatio'},
            {title: '슈퍼라이크 비율', dataIndex: 'superLikeRatio', key: 'superLikeRatio'},
        ]
    )
}

export const SwipeLogTableColumns = {
    columns: columns,
    cardColumns: cardColumns,
    setColumns: setColumns
}