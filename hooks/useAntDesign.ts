import { Modal, Layout, Menu, Typography, Row, Col } from 'antd';

const { Paragraph, Title } = Typography;
const { Header, Content, Footer } = Layout;

const useAntDesign = () => {
  return {
    AntdLayout: Layout,
    AntdHeader: Header,
    Content,
    Footer,
    Paragraph,
    Title,
    Row,
    Col,
    Menu,
    AntdModal: Modal,
  };
};

export default useAntDesign;
