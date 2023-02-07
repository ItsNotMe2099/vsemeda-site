interface Props {
  color: string
  colorCheck: string
  className?: string
}

export default function CheckCircleSvg(props: Props) {
  return (
    <svg className={props.className}  width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 0.739258C4.05 0.739258 0 4.78926 0 9.73926C0 14.6893 4.05 18.7393 9 18.7393C13.95 18.7393 18 14.6893 18 9.73926C18 4.78926 13.95 0.739258 9 0.739258ZM7.2 14.2393L2.7 9.73926L3.969 8.47026L7.2 11.6923L14.031 4.86126L15.3 6.13926L7.2 14.2393Z" fill={props.color}/>
      <path d="M7.2 14.2393L2.7 9.73926L3.969 8.47026L7.2 11.6923L14.031 4.86126L15.3 6.13926L7.2 14.2393Z" fill={props.colorCheck}/>
    </svg>

  )
}

