import StadiumItem from './_components/StadiumItem';
import styles from './home.module.scss';
import Link from 'next/link';
import PageExplainText from '@/components/PageExplainText';
import { DefaultProfile, IcChat, LargeO, QnA } from '@/assets';
import { STADIUM_INFO } from '@/constants/stadium';

const HomePage = () => {
  return (
    <div className={styles.homeLayout}>
      <header className={styles.homeHeader}>
        <Link href="/mypage">
          <DefaultProfile />
        </Link>
        <Link href="#">
          <QnA />
        </Link>
      </header>
      <main className={styles.homeMain}>
        <section className={styles.homeExplanation}>
          <PageExplainText>
            한눈에 비교하는 <span>콘서트장 시야</span>
            <br />
            공연장을 선택해주세요
          </PageExplainText>
          <div className={styles.review}>
            <IcChat />
            후기 +{121}
          </div>
        </section>
        <section className={styles.openStadium}>
          <h3 className={styles.subtitle}>공연장</h3>
          <ul className={styles.stadiumList}>
            {STADIUM_INFO.active.map(({ stadiumId, image, name }) => (
              <StadiumItem
                key={stadiumId}
                stadiumName={name}
                isActive={true}
                backgroundImageSrc={image}
                href={`/home/${stadiumId}`}
              />
            ))}
          </ul>
        </section>
        <section className={styles.comingSoonStadium}>
          <h3 className={styles.subtitle}>오픈예정</h3>
          <ul className={styles.stadiumList}>
            {STADIUM_INFO.inactive.map(({ stadiumId, image, name }) => (
              <StadiumItem
                key={stadiumId}
                stadiumName={name}
                isActive={false}
                backgroundImageSrc={image}
                href="#"
              />
            ))}
          </ul>
        </section>
      </main>
      <LargeO className={styles.svgO} width={201} height={320} />
    </div>
  );
};

export default HomePage;
