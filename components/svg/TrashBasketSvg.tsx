interface Props {
  color?: string
  className?: string
}

export default function TrashBasketSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.00052 3V4H4.00052V6H5.00052V19C5.00052 19.5304 5.21123 20.0391 5.58631 20.4142C5.96138 20.7893 6.47009 21 7.00052 21H17.0005C17.531 21 18.0397 20.7893 18.4147 20.4142C18.7898 20.0391 19.0005 19.5304 19.0005 19V6H20.0005V4H15.0005V3H9.00052ZM7.00052 6H17.0005V19H7.00052V6ZM9.00052 8V17H11.0005V8H9.00052ZM13.0005 8V17H15.0005V8H13.0005Z" fill={props.color||'black'}/>
    </svg>
  )
}

