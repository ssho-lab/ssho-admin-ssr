import {Layout} from "antd";

const {Header, Content, Sider} = Layout;

export const TagTableColumns = (tagList) => {
    return (
        [
            {
                title: '이름',
                dataIndex: 'name',
                width: 150,
            },
            {
                title: '설명',
                dataIndex: 'description',
                width: 150,
            },
            {
                title: '태그 이미지',
                dataIndex: 'imageUrl',
                width: 150,
                render: (imageUrl: string) => <img style={{ width: 100, height: "auto" }} src={imageUrl}></img>,
            },
            {
                title: '서비스 사용 여부',
                dataIndex: 'active',
                width: 150,
                render: (active: string) => active? <span>O</span> : <span>X</span>
            },
        ]
    )
}