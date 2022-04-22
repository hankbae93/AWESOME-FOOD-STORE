import { MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Modal as AntdModal, Row } from 'antd';
import styles from '../styles/Modal.module.css';
import { StoreObjType } from '../types';

interface ModalProps {
  modalState?: {
    id: number | null;
    show: boolean;
  };
  handleCancel?: (e: MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Modal = ({ modalState, handleCancel }: ModalProps) => {
  const [data, setData] = useState<StoreObjType>();

  useEffect(() => {
    const getDatas = async (id: number) => {
      const { data }: { data: StoreObjType } = await axios.get(
        `http://localhost:9000/stores/${id}`
      );
      setData(data);
    };
    if (modalState?.show && modalState?.id !== null) {
      getDatas(modalState.id);
    }
  }, [modalState?.show && modalState?.id]);

  return (
    <AntdModal
      className={styles.container}
      visible={modalState?.show}
      onCancel={handleCancel}
      footer={null}
    >
      <Row className={styles.row} gutter={[16, 16]}>
        <Col className={styles.left} span={12}>
          {data?.image && <Image src={data.image} layout="fill" alt="사진" />}
        </Col>
        <Col className={styles.right} span={12}>
          <div className={styles.textWrap}>
            <h3 className={styles.textWrapTitle}>{data?.name}</h3>
            <p className={styles.textWrapDesc}>
              {data?.description.split('\n').map((line, i) => {
                return (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                );
              })}
              {data?.url && (
                <div className={styles.link}>
                  <Link href={data?.url ?? ''} passHref>
                    <a target="_blank">
                      <strong>{data?.url ?? ''}</strong>
                    </a>
                  </Link>
                </div>
              )}
            </p>
          </div>
        </Col>
      </Row>
    </AntdModal>
  );
};

export default Modal;
