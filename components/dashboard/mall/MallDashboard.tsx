import {useEffect} from 'react';
import {Descriptions, Layout, Table} from "antd";
import {useRouter} from 'next/router';

import {useRecoilState} from "recoil";
import {DashboardMenu} from '../common/DashboardMenu';
import {MallTableColumns} from './MallTableColumns';
import {Mall} from '../../../interfaces/dashboard/item';
import {mallListState} from '../../../stores/dahsboard/mall/states';
import * as _ from "lodash";

const {Header, Content, Sider} = Layout;

interface MallDashboardProps {
    mallData: Mall[],
}

const MallDashboard = ({mallData}: MallDashboardProps) => {

    const router = useRouter();

    const [mallList, setMallList] = useRecoilState(mallListState);

    useEffect(() => {

        if (sessionStorage.getItem('token') === null ||
            sessionStorage.getItem('admin') === null ||
            sessionStorage.getItem('admin') === "false") {
            sessionStorage.clear()
            router.push("/auth");
        }

        setMallList(mallData);

    }, []);

    return (
        <Layout>
            <DashboardMenu path={router.asPath}/>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 0 0', overflow: 'initial', height: "100vh"}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                        <div>
                            <div style={{marginBottom: 40, border: '1px solid black'}}>
                                <Descriptions layout="vertical" bordered size="small"
                                              column={{xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1}}>
                                    <Descriptions.Item label="전체 개수">{mallList.length}</Descriptions.Item>
                                </Descriptions>
                            </div>
                            <Table columns={MallTableColumns(mallList)} rowKey={record => record.id}
                                   dataSource={mallList}
                                   pagination={{pageSize: 50}} scroll={{y: 400}}/>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MallDashboard;
