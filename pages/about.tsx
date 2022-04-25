import type { NextPage } from 'next';
import useAntDesign from '../hooks/useAntDesign';

const About: NextPage = () => {
  const { Paragraph, Title } = useAntDesign();

  return (
    <div>
      <div>
        <Title level={2}>ABOUT</Title>
        <Paragraph>
          200개의 컨테이너로 구성된 국내 최대 컨테이너 팝업 쇼핑몰 <br />
          AWESOME FOOD STORE에서는 색다른 쇼핑의 재미와 다양한 미식 브랜드들을
          만나보실 수 있습니다.
          <br /> 젊고 유니크한 CULTURE를 향유하는 YOUTH를 위한 복합문화공간,
          <br />
          AWESOME FOOD STORE에서 기존의 쇼핑몰에서 느낄 수 없었던 다채로운
          즐거움을 경험해보세요.
        </Paragraph>
      </div>
    </div>
  );
};

export default About;
