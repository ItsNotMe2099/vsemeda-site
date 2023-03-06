interface Props {
  color: string
  className?: string
}

export default function DotSeparatorSvg(props: Props) {
  return (
    <svg className={props.className} width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="3.00031" height="3.00031" rx="1.50016" fill={props.color} />
    </svg>
  )
}

