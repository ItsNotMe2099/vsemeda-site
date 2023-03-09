interface Props {
  color: string
  className?: string
}

export default function MenuSvg(props: Props) {
  return (
    <svg className={props.className} width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="3" rx="1.5" fill={props.color} />
      <rect x="11" y="12" width="12" height="3" rx="1.5" fill={props.color} />
      <rect y="6" width="23" height="3" rx="1.5" fill={props.color} />
    </svg>
  )
}

