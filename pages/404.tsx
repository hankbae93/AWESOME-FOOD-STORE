import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom400 = () => {
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
      <h2>404</h2>
      <p>{timer} 초 후 메인페이지로 이동합니다.</p>
    </div>
  );
};

export default Custom400;
