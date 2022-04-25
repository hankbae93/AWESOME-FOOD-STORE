import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAntDesign from '../hooks/useAntDesign';

const Custom400 = () => {
  const { Title, Paragraph } = useAntDesign();
  const router = useRouter();
  const [timer, setTimer] = useState<number>(5);

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      router.push('/');
    }
  }, [timer, router]);

  return (
    <div>
      <Title level={2}>404 Not Found</Title>
      <Paragraph>{timer} 초 후 메인페이지로 이동합니다.</Paragraph>
    </div>
  );
};

export default Custom400;
