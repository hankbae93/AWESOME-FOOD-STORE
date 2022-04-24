import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Store.module.css';
import { StoreObjType } from '../types';
import Modal from '../components/modal';
import useAntDesign from '../hooks/useAntDesign';
interface ModalState {
  show: boolean;
  id: number | null;
}

const Store = () => {
  const { Row, Col, Title } = useAntDesign();
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

  const showModal = (id: number) => setModalState({ id, show: true });
  const handleCancel = () => setModalState({ id: null, show: false });

  return (
    <>
      <div>
        <Title level={2}>STORE</Title>

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
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>

      <Modal modalState={modalState} handleCancel={handleCancel} />
    </>
  );
};

export default Store;
