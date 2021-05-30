import {useEffect, useState} from 'react';
import {Layout, Table} from "antd";
import {useRouter} from 'next/router';

import {useRecoilState} from "recoil";
import {DashboardMenu} from '../common/DashboardMenu';
import {User} from '../../../interfaces/dashboard/user';
import {userListState} from '../../../stores/dahsboard/user/states';
import {UserTableColumns} from './UserTableColumns';

const {Header, Content, Sider} = Layout;

interface UserDashboardProps {
    userData: User[],
}

const UserDashboard = ({userData}: UserDashboardProps) => {

    const router = useRouter();

    const [userList, setUserList] = useRecoilState(userListState);

    useEffect(() => {

        if (sessionStorage.getItem('token') === null ||
            sessionStorage.getItem('admin') === null ||
            sessionStorage.getItem('admin') === "false") {
            sessionStorage.clear()
            router.push("/auth");
        }

        setUserList(userData);

    }, []);

    return (
        <Layout>
            <DashboardMenu path={router.asPath}/>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 0 0', overflow: 'initial', height: "100vh"}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                        <div>
                            <Table columns={UserTableColumns(userList)} rowKey={record => record.id}
                                   dataSource={userList}
                                   pagination={{pageSize: 50}} scroll={{y: 400}}/>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default UserDashboard;
