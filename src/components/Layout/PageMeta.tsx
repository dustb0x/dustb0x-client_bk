import Head from 'next/head'
import { DEFAULT_META } from '@/config/constants/meta'

const PageMeta = () => {
  return (
    <Head>
      <title>{DEFAULT_META.title}</title>
      <meta name="description" content={DEFAULT_META.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default PageMeta
