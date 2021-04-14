import {Layout} from "antd";

const {Header, Content, Sider} = Layout;

export const UserTableColumns = (userList) => {
    return (
        [
            {
                title: '회원 고유 번호',
                dataIndex: 'id',
                width: 150,
                render: (id: string) => <span>#{id}</span>
            },
            {
                title: '이름',
                dataIndex: 'name',
                width: 150,
            },
            {
                title: '이메일',
                dataIndex: 'email',
                width: 150,
            },
            {
                title: '생년월일',
                dataIndex: 'birth',
                width: 150,
                render: (birth: string) => birth? <span>{birth}</span> : <span>-</span>
            },
            {
                title: '성별',
                dataIndex: 'gender',
                width: 150,
                render: (gender: string) => gender? <span>{gender}</span> : <span>-</span>
            },
            {
                title: '이메일',
                dataIndex: 'email',
                width: 150,
            },
            {
                title: '관리자 여부',
                dataIndex: 'admin',
                width: 150,
                render: (admin: string) => admin? <span>O</span> : <span>X</span>
            },
            {
                title: '소셜 로그인 여부',
                dataIndex: 'social',
                width: 150,
                render: (social: string) => social? <span>O</span> : <span>X</span>
            },
            {
                title: '소셜 로그인 채널',
                dataIndex: 'channel',
                width: 150,
                render: (channel: string) => channel? <span>{channel}</span> : <span>-</span>
            }
        ]
    )
}