import { MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import useAntDesign from '../hooks/useAntDesign';
import styles from '../styles/Modal.module.css';
import { StoreObjType } from '../types';

interface ModalProps {
  modalState?: {
    id: number | null;
    show: boolean;
  };
  handleCancel?: (e: MouseEvent<HTMLElement>) => void;
}

const Modal = ({ modalState, handleCancel }: ModalProps) => {
  const { Col, AntdModal, Title, Paragraph, Row } = useAntDesign();
  const [data, setData] = useState<StoreObjType | null>(null);

  const getDatas = async (id: number) => {
    try {
      const { data }: { data: StoreObjType } = await axios.get(
        `http://localhost:9000/stores/${id}`
      );
      setData(data);
    } catch (err) {
      console.error(err);
      setData(null);
    }
  };

  useEffect(() => {
    if (modalState?.show && modalState?.id !== null) {
      getDatas(modalState.id);
    }
  }, [modalState?.show, modalState?.id]);

  if (!data) {
    return (
      <AntdModal
        className={styles.container}
        visible={modalState?.show}
        onCancel={handleCancel}
        footer={null}
      >
        <Paragraph className={styles.emptyMessage}>
          현재 데이터를 찾을 수 없습니다.
        </Paragraph>
      </AntdModal>
    );
  }

  return (
    <AntdModal
      className={styles.container}
      visible={modalState?.show}
      onCancel={handleCancel}
      footer={null}
    >
      <Row className={styles.row} gutter={[16, 16]}>
        <Col className={styles.left} span={12}>
          {data?.image && (
            <Image
              className={styles.modalImg}
              src={data.image}
              layout="fill"
              alt="사진"
            />
          )}
        </Col>

        <Col className={styles.right} span={12}>
          <div className={styles.textWrap}>
            <Title level={3} className={styles.textWrapTitle}>
              {data?.name}
            </Title>

            <div className={styles.textWrapDesc}>
              {data?.description.split('\n').map((line, i) => {
                return (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                );
              })}
              {data?.url && (
                <Paragraph className={styles.link}>
                  <Link href={data?.url ?? ''} passHref>
                    <a target="_blank">
                      <strong>{data?.url ?? ''}</strong>
                    </a>
                  </Link>
                </Paragraph>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </AntdModal>
  );
};

export default Modal;
