import {useEffect, useState} from 'react';
import {Descriptions, Layout, Table, Select} from "antd";
import {useRouter} from 'next/router';
import {itemListState} from "../../../../stores/dahsboard/item/states";
import {mallListState} from "../../../../stores/dahsboard/mall/states";

import {useRecoilState} from "recoil";
import {Category, Item, Mall, Tag} from '../../../../interfaces/dashboard/item';
import {DashboardMenu} from '../../common/DashboardMenu';
import {ItemMallTableColumns} from './ItemMallTableColumns';

const {Header, Content, Sider} = Layout;
const {Option} = Select;

interface ItemDashboardProps {
    itemData: Item[],
    mallData: Mall[]
}

const ItemMallDashboard = ({itemData, mallData}: ItemDashboardProps) => {

    const router = useRouter();

    const [itemList, setItemList] = useRecoilState(itemListState);
    const [mallList, setMallList] = useRecoilState(mallListState);

    const [mallInfo, setMallInfo] = useState<Mall>({id: "", name: "", categoryList: [], tagList: [], lastSyncTime: ""});
    const [mallItemList, setMallItemList] = useState<any[]>([]);

    const [menuId, setMenuId] = useState<number>(0);

    useEffect(() => {

        if (sessionStorage.getItem('token') === null ||
            sessionStorage.getItem('admin') === null ||
            sessionStorage.getItem('admin') === "false") {
            sessionStorage.clear()
            router.push("/auth");
        }

        setItemList(itemData);
        setMallList(mallData);

    }, [])

    const onSelectMall = (value: any) => {
        const info: any = mallList.find(mall => mall.name === value)
        setMallInfo(info);
        setMallItemList(itemList.filter(item => item.mallNm === value));
    }

    return (
        <Layout>
            <DashboardMenu path={router.asPath}/>
            <Layout className="site-layout" style={{marginLeft: 200, height: "100vh"}}>
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 0 0', overflow: 'initial', height: "100vh"}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                        <Select showSearch style={{ width: 200, marginBottom: 40 }} placeholder="몰 검색" optionFilterProp="children" filterOption={(input: string, option : any) => option.children.indexOf(input)>= 0} onSelect={(value: any) => onSelectMall(value)}>
                            {mallList.map(mall => <Option value={mall.name}>{mall.name}</Option>)}
                        </Select>
                        {mallInfo.name &&
                        <div style={{marginBottom: 40, border: '1px solid black'}} >
                            <Descriptions layout="vertical" bordered size="small" column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}>
                                <Descriptions.Item label="몰명">{mallInfo.name}</Descriptions.Item>
                                <Descriptions.Item label="카테고리">{mallInfo.categoryList.map((cate: Category) => cate.mallCatNm).join(", ")}</Descriptions.Item>
                                <Descriptions.Item label="태그">{mallInfo.tagList.map((tag: Tag) => tag.name).join(", ")}</Descriptions.Item>
                                <Descriptions.Item label="싱크시간">{mallInfo.lastSyncTime}</Descriptions.Item>
                                <Descriptions.Item label="상품개수">{mallItemList.length}</Descriptions.Item>
                            </Descriptions>
                        </div>}
                        {mallItemList.length !== 0 && <Table columns={ItemMallTableColumns(itemList, mallList)} rowKey={record => record.id} dataSource={mallItemList} pagination={{ pageSize: 50 }} scroll={{ y: 320 }} />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default ItemMallDashboard;
