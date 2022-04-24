import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import useAntDesign from '../hooks/useAntDesign';

interface LinkProps {
  href: string;
  title: string;
}

const Header = () => {
  const { AntdHeader, Menu, Title } = useAntDesign();
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
