import {useEffect, useState} from 'react';
import {Descriptions, Layout, Table} from "antd";
import {useRouter} from 'next/router';
import {itemListState} from "../../../stores/dahsboard/item/states";
import {mallListState} from "../../../stores/dahsboard/mall/states";

import {useRecoilState} from "recoil";
// import TagList from './TagList';
import {Category, Item, Mall} from '../../../interfaces/dashboard/item';
import {DashboardMenu} from '../common/DashboardMenu';
import {ItemTableColumns} from './ItemTableColumns';

const {Header, Content, Sider} = Layout;

interface ItemDashboardProps {
    itemData: Item[],
    mallData: Mall[]
}

const ItemDashboard = ({itemData, mallData}: ItemDashboardProps) => {

    const router = useRouter();

    const [itemList, setItemList] = useRecoilState(itemListState);
    const [mallList, setMallList] = useRecoilState(mallListState);

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

        console.log(router.asPath);

    }, [])

    const countCategoryItem = (itemList: any[], targetCatCd: string) => {
        return itemList.filter(item => {
            const catCds = item.category.map((cat: Category) => cat.catCd);
            return catCds.filter((catCd: string) => catCd === targetCatCd).length > 0;
        }).length
    }

    return (
        <Layout>
            <DashboardMenu path={router.asPath}/>
            <Layout className="site-layout" style={{marginLeft: 200, height: "100vh"}}>
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 0 0', overflow: 'initial', height: "100vh"}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                        <div>
                            {itemList &&
                            <div style={{marginBottom: 40, border: '1px solid black'}}>
                                <Descriptions layout="vertical" bordered size="small"
                                              column={{xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1}}>
                                    <Descriptions.Item label="전체 상품 개수">{itemList.length}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="TOP">{countCategoryItem(itemList, 'TOP')}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="BOTTOM">{countCategoryItem(itemList, 'BOTTOM')}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="SKIRT">{countCategoryItem(itemList, 'SKIRT')}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="OUTER">{countCategoryItem(itemList, 'OUTER')}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="DRESS">{countCategoryItem(itemList, 'DRESS')}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="SHOES">{countCategoryItem(itemList, 'SHOES')}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="HAT">{countCategoryItem(itemList, 'HAT')}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="EXTRA">{countCategoryItem(itemList, 'EXTRA')}</Descriptions.Item>
                                </Descriptions>
                            </div>}
                            <Table columns={ItemTableColumns(itemList, itemList)} rowKey={record => record.id}
                                   dataSource={itemList}
                                   pagination={{pageSize: 50}} scroll={{y: 400}}/>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default ItemDashboard;
