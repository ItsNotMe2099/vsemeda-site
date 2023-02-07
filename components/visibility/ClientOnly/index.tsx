import { useEffect, useState } from 'react'

interface Props {
  children: JSX.Element
}

export default function ClientOnly(props: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  if (visible) {
    return props.children
  } else {
    return null
  }
}
