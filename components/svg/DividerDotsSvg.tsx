interface Props {
  className?: string
}

export default function DividerDotsSvg(props: Props) {
  return (
    <svg className={props.className} width="2" height="16" viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle opacity="0.5" cx="0.5" cy="0.5" r="0.5" transform="matrix(-1 0 0 1 1.68359 0)" fill="#F2F2F2"/>
      <circle opacity="0.5" cx="0.5" cy="0.5" r="0.5" transform="matrix(-1 0 0 1 1.68359 5)" fill="#F2F2F2"/>
      <circle opacity="0.5" cx="0.5" cy="0.5" r="0.5" transform="matrix(-1 0 0 1 1.68359 10)" fill="#F2F2F2"/>
      <circle opacity="0.5" cx="0.5" cy="0.5" r="0.5" transform="matrix(-1 0 0 1 1.68359 15)" fill="#F2F2F2"/>
    </svg>

  )
}

