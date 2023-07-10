interface Props {
  color: string
  className?: string
}

export default function ClockSvg(props: Props) {
  return (
    <svg className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14.4C11.52 14.4 14.4 11.52 14.4 8C14.4 4.48 11.52 1.6 8 1.6C4.48 1.6 1.6 4.48 1.6 8C1.6 11.52 4.48 14.4 8 14.4ZM8 0C12.4 0 16 3.6 16 8C16 12.4 12.4 16 8 16C3.6 16 0 12.4 0 8C0 3.6 3.6 0 8 0ZM12 9.52L11.44 10.56L7.2 8.24V4H8.4V7.52L12 9.52Z" fill={props.color}/>
    </svg>

  )
}

