import MainPageLanding from 'components/for_pages/landing'
import Layout from 'components/layout/Layout'

export default function IndexPage() {

  // const router = useRouter()
  // useEffect(() => {
  //   router.push('/moskva')
  // }, [])

  return (
    <Layout hideHeader hideFooter hideTabbar>
      <MainPageLanding/>
    </Layout>
  )
}
