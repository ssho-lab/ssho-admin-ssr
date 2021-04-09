import {Layout, Menu} from "antd";
import {useRouter} from 'next/router';
import {UserOutlined} from "@ant-design/icons";
import SubMenu from 'antd/lib/menu/SubMenu';
import { useRecoilState } from "recoil";
import { menuState } from "../../../stores/dahsboard/menu/states";

const {Header, Content, Sider} = Layout;

export const DashboardMenu = () => {

    const router = useRouter();

    const [menuSeq, setMenuSeq] = useRecoilState(menuState);

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2-0']}>
                <SubMenu key="0" icon={<UserOutlined/>} title="등록 상품">
                    <Menu.Item onClick={() => {
                        setMenuSeq(0);
                        router.push("/dashboard/item");
                    }} key="0-0" icon={<UserOutlined/>}>
                        전체 상품
                    </Menu.Item>
                    <Menu.Item key="0-1" icon={<UserOutlined/>}>
                        몰별 상품
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="1" icon={<UserOutlined/>} title="스와이프 로그">
                    <Menu.Item key="1-0">스와이프 로그 조회</Menu.Item>
                </SubMenu>
                <SubMenu key="2" icon={<UserOutlined/>} title="회원">
                    <Menu.Item onClick={() => {
                        setMenuSeq(2);
                        router.push("/dashboard/user");
                    }} key="2-0" icon={<UserOutlined/>}>
                        회원
                    </Menu.Item>
                    <Menu.Item key="2-1" icon={<UserOutlined/>}>
                        회원 추천 상품
                    </Menu.Item>
                </SubMenu>
                <Menu.Item onClick={() => {
                    sessionStorage.clear()
                    router.push("/")
                }} key="3-0" icon={<UserOutlined/>}>
                    로그아웃
                </Menu.Item>
            </Menu>
        </Sider>)
}