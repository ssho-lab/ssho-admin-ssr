import {Layout, Tag as TagComp} from "antd";
import {Category, Tag} from "../../../interfaces/dashboard/item";

const {Header, Content, Sider} = Layout;

export const MallTableColumns = (tagList) => {
    return (
        [
            {
                title: '이름',
                dataIndex: 'name',
                width: 150,
            },
            {
                title: '카테고리',
                dataIndex: 'categoryList',
                width: 100,
                filters: [{text: "TOP", value: "TOP"}, {text: "BOTTOM", value: "BOTTOM"}, {
                    text: "SKIRT",
                    value: "SKIRT"
                }, {text: "OUTER", value: "OUTER"}, {text: "DRESS", value: "DRESS"},
                    {text: "SHOES", value: "SHOES"}, {text: "HAT", value: "HAT"}, {text: "EXTRA", value: "EXTRA"}],
                onFilter: (value: any, record: any) => {
                    let filtered = false;
                    record.category.forEach((cat: Category) => {
                        if (cat.catCd.indexOf(value) === 0) {
                            filtered = true;
                        }
                    })
                    return filtered;
                },
                render: (categoryList: Category[]) => categoryList.map(category => {
                    return <div><span style={{fontSize: "10px"}}>{category.mallCatNm}</span></div>
                })
            },
            {
                title: '태그 리스트',
                dataIndex: 'tagList',
                width: 220,
                render: (tagList: Tag[], record: any) => tagList.map(tag => <TagComp
                    color="purple">{tag.name}</TagComp>),
            },
            {
                title: '최근 싱크 시간',
                dataIndex: 'lastSyncTime',
                width: 150,
            },
        ]
    )
}