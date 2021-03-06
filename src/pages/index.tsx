import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const { results } = postsPagination;
  return (
    <div className={styles.contentContainer}>
      {results.map(post => {
        return (
          <div key={post.first_publication_date} className={styles.post}>
            <h2>{post.data.title}</h2>
            <p>{post.data.subtitle}</p>
            <div className={styles.postDetails}>
              <div className={styles.postItem}>
                <FiCalendar />
                <span>
                  {format(
                    new Date(post.first_publication_date),
                    'dd mmm  yyyy'
                  )}
                </span>
              </div>
              <div className={styles.postItem}>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts')
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: { postsPagination: { next_page: postsResponse.next_page, posts } },
  };
};
