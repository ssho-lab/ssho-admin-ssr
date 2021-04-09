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
                title: '관리자 여부',
                dataIndex: 'admin',
                width: 150,
                render: (admin: string) => admin? <span>O</span> : <span>X</span>
            }
        ]
    )
}