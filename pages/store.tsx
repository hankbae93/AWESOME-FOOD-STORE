import { useState } from 'react';
import axios from 'axios';
import useAntDesign from '../hooks/useAntDesign';
import styles from '../styles/Store.module.css';
import { StoreObjType } from '../types';
import Modal from '../components/modal';
interface ModalState {
  show: boolean;
  id: number | null;
}

interface StorePageProps {
  data: StoreObjType[];
}

const Store = ({ data }: StorePageProps) => {
  const { Row, Col, Title, Paragraph } = useAntDesign();
  const [list] = useState<StoreObjType[]>(data);
  const [modalState, setModalState] = useState<ModalState>({
    id: null,
    show: false,
  });

  const showModal = (id: number) => setModalState({ id, show: true });
  const handleCancel = () => setModalState({ id: null, show: false });

  return (
    <>
      <div>
        <Title level={2}>STORE</Title>

        <div className={styles.container}>
          <Row className={styles.row}>
            {list.length > 0 ? (
              list.map((item: StoreObjType) => {
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
              })
            ) : (
              <Col className={styles.errorCol}>
                <Paragraph>현재 존재하는 데이터가 없습니다.</Paragraph>
              </Col>
            )}
          </Row>
        </div>
      </div>

      <Modal modalState={modalState} handleCancel={handleCancel} />
    </>
  );
};

export default Store;

export const getServerSideProps = async () => {
  let dataArray: StoreObjType[] | null = [];

  try {
    const { data }: { data: StoreObjType[] } = await axios.get(
      'http://localhost:9000/stores'
    );
    dataArray = data;
  } catch (err) {
    console.error(err);
    dataArray = null;
  }

  return {
    props: {
      data: dataArray || [],
    },
  };
};
