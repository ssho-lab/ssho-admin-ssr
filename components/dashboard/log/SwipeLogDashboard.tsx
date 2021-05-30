import {useEffect} from 'react';
import {Layout, Table} from "antd";
import {useRouter} from 'next/router';

import {useRecoilState} from "recoil";
import {DashboardMenu} from '../common/DashboardMenu';
import {User} from '../../../interfaces/dashboard/user';
import {userListState} from '../../../stores/dahsboard/user/states';
import {SwipeLogTableColumns} from './SwipeLogTableColumns'
import { swipeLogListState } from '../../../stores/dahsboard/log/states';
import { SwipeLog } from '../../../interfaces/dashboard/log';

const {Header, Content, Sider} = Layout;

interface SwipeLogDashboardProps {
    swipeLogData: SwipeLog[],
}

const SwipeLogDashboard = ({swipeLogData}: SwipeLogDashboardProps) => {

    const router = useRouter();

    const [swipeLogList, setSwipeLogList] = useRecoilState(swipeLogListState);

    useEffect(() => {

        if (sessionStorage.getItem('token') === null ||
            sessionStorage.getItem('admin') === null ||
            sessionStorage.getItem('admin') === "false") {
            sessionStorage.clear()
            router.push("/auth");
        }

        setSwipeLogList(swipeLogData);

    }, []);

    return (
        <Layout>
            <DashboardMenu path={router.asPath}/>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 0 0', overflow: 'initial', height: "100vh"}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                        <div>
                            <Table columns={SwipeLogTableColumns.columns()}
                                   expandable={{
                                       expandedRowRender: record => <Table columns={SwipeLogTableColumns.setColumns()}
                                                                           expandable={{
                                                                               expandedRowRender: record => <Table
                                                                                   columns={SwipeLogTableColumns.cardColumns()}
                                                                                   dataSource={record.cardList.map((data: any, idx: any) => {
                                                                                       return {...data, key: idx}
                                                                                   })}/>
                                                                           }}
                                                                           dataSource={record.setList.map((data: any, idx: any) => {
                                                                               return {...data, key: idx}
                                                                           })}/>
                                   }}
                                   dataSource={swipeLogList.map((data: any, idx: any) => {
                                       return {...data, key: idx}
                                   })} pagination={{pageSize: 50}} scroll={{y: 400}}/>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SwipeLogDashboard;
