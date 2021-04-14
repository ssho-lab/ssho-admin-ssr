import {Layout, Menu} from "antd";
import {useRouter} from 'next/router';
import {UserOutlined} from "@ant-design/icons";
import SubMenu from 'antd/lib/menu/SubMenu';
import {useRecoilState} from "recoil";
import {menuState} from "../../../stores/dahsboard/menu/states";
import {useEffect} from "react";

const {Header, Content, Sider} = Layout;

interface DashboardMenuProps {
    path: string
}

export const DashboardMenu = ({path}) => {

    const router = useRouter();

    const [menuSeq, setMenuSeq] = useRecoilState(menuState);

    const mapRouterPath = () => {
        switch (path) {
            case '/dashboard/item/all':
                setMenuSeq('0-0')
                break;
            case '/dashboard/item/mall':
                setMenuSeq('0-1')
                break;
            case '/dashboard/log':
                setMenuSeq('1-0')
                break;
            case '/dashboard/user':
                setMenuSeq('2-0')
                break;
            case '/dashboard/tag':
                setMenuSeq('3-0')
                break;
            case '/dashboard/mall':
                setMenuSeq('4-0')
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        mapRouterPath();
    }, [])

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}>
            <div className="logo"/>
            {
                menuSeq !== '' &&
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[menuSeq]}>
                    <SubMenu key="0" icon={<UserOutlined/>} title="등록 상품">
                        <Menu.Item onClick={() => {
                            setMenuSeq('0-0');
                            router.push("/dashboard/item/all");
                        }} key="0-0" icon={<UserOutlined/>}>
                            전체 상품
                        </Menu.Item>
                        <Menu.Item onClick={() => {
                            setMenuSeq('0-1');
                            router.push("/dashboard/item/mall");
                        }} key="0-1" icon={<UserOutlined/>}>
                            몰별 상품
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="1" icon={<UserOutlined/>} title="스와이프 로그">
                        <Menu.Item onClick={() => {
                            setMenuSeq('1-0');
                            router.push("/dashboard/log");
                        }} key="1-0">스와이프 로그 조회</Menu.Item>
                    </SubMenu>
                    <SubMenu key="2" icon={<UserOutlined/>} title="회원">
                        <Menu.Item onClick={() => {
                            setMenuSeq('2-0');
                            router.push("/dashboard/user");
                        }} key="2-0" icon={<UserOutlined/>}>
                            회원
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="3" icon={<UserOutlined/>} title="태그">
                        <Menu.Item onClick={() => {
                            setMenuSeq('3-0');
                            router.push("/dashboard/tag");
                        }} key="3-0" icon={<UserOutlined/>}>
                            태그
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="4" icon={<UserOutlined/>} title="몰">
                        <Menu.Item onClick={() => {
                            setMenuSeq('4-0');
                            router.push("/dashboard/mall");
                        }} key="4-0" icon={<UserOutlined/>}>
                            몰
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item onClick={() => {
                        sessionStorage.clear()
                        router.push("/")
                    }} key="5-0" icon={<UserOutlined/>}>
                        로그아웃
                    </Menu.Item>
                </Menu>
            }
        </Sider>)
}