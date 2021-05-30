import {useEffect} from 'react';
import {Layout, Table, Descriptions} from "antd";
import {useRouter} from 'next/router';

import {useRecoilState} from "recoil";
import {DashboardMenu} from '../common/DashboardMenu';
import {TagTableColumns} from './TagTableColumns';
import {Tag} from '../../../interfaces/dashboard/item';
import {tagListState} from '../../../stores/dahsboard/tag/states';

const {Header, Content, Sider} = Layout;

interface TagDashboardProps {
    tagData: Tag[],
}

const TagDashboard = ({tagData}: TagDashboardProps) => {

    const router = useRouter();

    const [tagList, setTagList] = useRecoilState(tagListState);

    useEffect(() => {

        if (sessionStorage.getItem('token') === null ||
            sessionStorage.getItem('admin') === null ||
            sessionStorage.getItem('admin') === "false") {
            sessionStorage.clear()
            router.push("/auth");
        }

        setTagList(tagData);

    }, []);

    return (
        <Layout>
            <DashboardMenu path={router.asPath}/>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 0 0', overflow: 'initial', height: "100%"}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center', height: '100%'}}>
                        <div>
                            <div style={{marginBottom: 40, border: '1px solid black'}} >
                                <Descriptions layout="vertical" bordered size="small" column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}>
                                    <Descriptions.Item label="전체 개수">{tagList.length}</Descriptions.Item>
                                    <Descriptions.Item label="서비스 사용 개수">{tagList.filter(tag => tag.active).length}</Descriptions.Item>
                                </Descriptions>
                            </div>
                            <Table columns={TagTableColumns(tagList)} rowKey={record => record.id}
                                   dataSource={tagList}
                                   pagination={{pageSize: 50}} scroll={{ y: 400 }}/>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default TagDashboard;
