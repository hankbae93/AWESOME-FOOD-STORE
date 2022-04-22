import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Divider } from 'antd';
import styles from '../styles/Store.module.css';
import Image from 'next/image';

interface StoreObjType {
  id: number;
  name: string;
  description: string;
  image: string;
  thumb: string;
}

const Store = () => {
  const [list, setList] = useState<StoreObjType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data }: { data: StoreObjType[] } = await axios.get(
        'http://localhost:9000/stores'
      );
      setList(data);
    };
    getData();
  }, []);

  return (
    <div>
      <h2>STORE</h2>

      <div className={styles.container}>
        <Row className={styles.row}>
          {list.map((item: StoreObjType) => {
            return (
              <Col key={item.id} className={styles.col}>
                <div
                  className={styles.card}
                  style={{ backgroundImage: `url(${item.thumb})` }}
                ></div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Store;
