import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={styles.headerContent}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={200} height={200} />
      </Link>
    </div>
  );
}
