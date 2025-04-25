'use client';

import styles from './InfoSection.module.scss';
import { Fragment } from 'react';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';

const SectionTitle = ({ children }) => <div className={styles.title}>{children}</div>;

const InfoItem = ({ title, description }) => (
  <div className={styles.textBox}>
    <div className={styles.subTitle}>{title}</div>
    {description && <div className={styles.description}>{description}</div>}
  </div>
);

const ButtonItem = ({ title, onClick }) => (
  <button className={styles.buttonContainer} onClick={onClick}>
    <div className={styles.subTitle}>{title}</div>
    <Icon icon="NextArrow" color="#adb5bd" />
  </button>
);

const InfoSection = () => {
  const sections = [
    {
      title: '앱 설정',
      items: [{ type: 'info', title: '현재버전 1.0', description: '최신버전을 사용 중이에요' }],
    },
    {
      title: '약관 및 방침',
      items: [
        { type: 'button', title: '이용약관' },
        { type: 'button', title: '개인정보처리방침' },
      ],
    },
    {
      title: '관리',
      items: [
        { type: 'button', title: '로그아웃' },
        { type: 'button', title: '회원탈퇴' },
      ],
    },
  ];

  const handleClick = () => {};

  return (
    <div className={styles.infoSection}>
      {sections.map((section, index) => (
        <Fragment key={section.title}>
          <div className={styles.infoContainer}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.items.map((item, idx) =>
              item.type === 'info' ? (
                <InfoItem key={idx} title={item.title} description={item.description} />
              ) : (
                <ButtonItem key={idx} title={item.title} onClick={handleClick} />
              ),
            )}
          </div>
          {index < sections.length - 1 && <Splitter />}
        </Fragment>
      ))}
    </div>
  );
};

export default InfoSection;
