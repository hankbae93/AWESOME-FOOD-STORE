import { useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Typography } from 'antd';
import styles from '../styles/Header.module.css';

const { Title } = Typography;
const { Header: AntdHeader } = Layout;

interface LinkProps {
  href: string;
  title: string;
}

const Header = () => {
  const [links] = useState<LinkProps[]>([
    {
      href: '/about',
      title: 'ABOUT',
    },
    {
      href: '/store',
      title: 'STORE',
    },
  ]);

  return (
    <>
      <AntdHeader className={styles.container}>
        <Title className={styles.logo}>
          <Link href="/" passHref>
            <a>
              AWESOME <br />
              FOOD STORE
            </a>
          </Link>
        </Title>

        <Menu theme="light" mode="horizontal" className={styles.nav}>
          {links.map((link, i) => (
            <Menu.Item key={i} className={styles.navLink}>
              <Link href={link.href} passHref>
                <a>{link.title}</a>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </AntdHeader>
    </>
  );
};

export default Header;
