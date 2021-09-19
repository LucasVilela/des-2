import Image from 'next/image';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={styles.headerContent}>
      <Image src="/logo.svg" alt="Logo" width={200} height={200} />
    </div>
  );
}
