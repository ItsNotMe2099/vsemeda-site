import { useAppContext } from 'context/state'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function IndexPage() {

  const router = useRouter()

  const appContext = useAppContext()

  const region = appContext.region

  useEffect(() => {
    router.push(`/${region.slug}`)
  }, [])

  return (
    <></>
  )
}
