interface Props {
  color: string
  className?: string
  onClick?: () => void
}

export default function PlusSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6.99219" y="11.3984" width="12" height="2" fill={props.color}/>
      <rect x="13.9922" y="6.39941" width="12" height="2" transform="rotate(90 13.9922 6.39941)" fill={props.color}/>
    </svg>
  )
}

