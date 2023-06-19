
import Image from 'next/image';

import {Assumptions, Codebase, Future, Verification} from '#/ui/Readme';

import styles from './page.module.css';



export default function Home() {
  return (
    <main className={`${styles.main}`}>
      <div className={styles.description}>
        <p>
        <a
            href="https://www.linkedin.com/in/matthewtorintaylor/"
            rel="noopener noreferrer"
            target="_blank"
          >
          <strong>Torin&lsquo;s Demo app</strong>
          </a>
        </p>
        <div>
          <a
            href="https://www.skyKoala.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            For{' '}
            <Image
              alt="skyKoala Logo"
              className={styles.skyKoalaLogo}
              height={24}
              priority
              src="/skyKoala.svg"
              width={100}
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <div>
          <Assumptions />
          <Codebase />
          <Verification />
          <Future />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          className={styles.card}
          href="/api/appData"
          rel="noopener noreferrer"
          target="_blank"
        >
          <h2>
            Deduplicated App feed <span>-&gt;</span>
          </h2>
          <p>Source data less key-based deduplication.</p>
        </a>

        <a
          className={styles.card}
          href="/api/jest"
          rel="noopener noreferrer"
          target="_blank"
        >
          <h2>
            Jest tests (CI mode) <span>-&gt;</span>
          </h2>
          <p>Atypical but working verification of solution.</p>
        </a>

        <a
          className={styles.card}
          href="/clean_application.json"
          rel="noopener noreferrer"
          target="_blank"
        >
          <h2>
            Solution JSON <span>-&gt;</span>
          </h2>
          <p>Raw code output from the appData feed using this demo's deduplication approach.</p>
        </a>
      </div>
    </main>
  );
}
