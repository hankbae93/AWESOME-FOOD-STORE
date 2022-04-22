import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import styles from '../styles/Store.module.css';
import Modal from '../components/modal';
import { StoreObjType } from '../types';

interface ModalState {
  show: boolean;
  id: number | null;
}

const Store = () => {
  const [list, setList] = useState<StoreObjType[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    id: null,
    show: false,
  });

  useEffect(() => {
    const getData = async () => {
      const { data }: { data: StoreObjType[] } = await axios.get(
        'http://localhost:9000/stores'
      );
      setList(data);
    };
    getData();
  }, []);

  const showModal = (id: number) => {
    setModalState((prev) => ({ id, show: true }));
  };

  const handleOk = () => {
    setModalState((prev) => ({ id: null, show: false }));
  };

  const handleCancel = () => {
    setModalState((prev) => ({ id: null, show: false }));
  };

  return (
    <>
      <div>
        <h2>STORE</h2>

        <div className={styles.container}>
          <Row className={styles.row}>
            {list.map((item: StoreObjType) => {
              return (
                <Col
                  onClick={() => showModal(item.id)}
                  key={item.id}
                  className={styles.col}
                >
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
      <Modal
        modalState={modalState}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Store;
