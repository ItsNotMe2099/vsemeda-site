interface Props {
  color: string
  className?: string
}

export default function MinusSvg(props: Props) {
  return (
    <svg className={props.className} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6.99219" y="11.3984" width="12" height="2" fill={props.color}/>
    </svg>
  )
}

