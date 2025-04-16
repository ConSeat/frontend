import styles from './MiniMap.module.scss';
import Image from 'next/image';

interface MiniMapProps {
  stageSVGSrc: string;
  minimapRef: React.RefObject<HTMLDivElement | null>;
  containerAspectRatio: number;
  viewportBox: {
    scale: number;
    width: number;
    height: number;
    left: number;
    top: number;
  };
}

const MiniMap = ({ stageSVGSrc, minimapRef, containerAspectRatio, viewportBox }: MiniMapProps) => {
  return (
    <div
      className={styles.minimap}
      ref={minimapRef}
      style={{
        width: '25%',
        aspectRatio: containerAspectRatio.toFixed(5),
        visibility: viewportBox.scale === 1 ? 'hidden' : 'visible',
      }}
    >
      <div className={styles.minimapWrapper}>
        <Image
          src={stageSVGSrc}
          alt="MiniMap"
          fill
          style={{ objectFit: 'contain', padding: '7%' }}
        />
        <div
          className={styles.viewportBox}
          style={{
            width: `${viewportBox.width}px`,
            height: `${viewportBox.height}px`,
            left: `${viewportBox.left}px`,
            top: `${viewportBox.top}px`,
          }}
        />
      </div>
    </div>
  );
};

export default MiniMap;
