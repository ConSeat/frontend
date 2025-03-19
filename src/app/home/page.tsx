import HomeNavigation from './_components/HomeNavigation';
import StadiumNavigation from './_components/StadiumNavigation';
import styles from './home.module.scss';
import Icon from '@/components/Icon/Icon';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';

const HomePage = () => {
  return (
    <div className={styles.homeLayout}>
      <HomeNavigation />
      <Spacing size={49} />
      <main className={styles.homeMain}>
        <PageExplanation>
          <PageExplanation.Title>
            한눈에 비교하는 <span>콘서트장 시야</span>
            <br />
            공연장을 선택해주세요
          </PageExplanation.Title>
          <PageExplanation.Subtitle>
            <Icon icon="IcChat" />
            후기 +{121}
          </PageExplanation.Subtitle>
        </PageExplanation>
        <StadiumNavigation navigationType="active" />
        <StadiumNavigation navigationType="inactive" />
      </main>
      <Icon icon="HomeC" className={styles.svgC} />
      <Icon icon="LargeO" className={styles.svgO} />
    </div>
  );
};

export default HomePage;
