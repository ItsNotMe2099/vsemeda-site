interface Props {
  color: string
  className?: string
}

export default function ShieldCheckSvg(props: Props) {
  return (
    <svg className={props.className} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15.8337C11.44 14.9937 14 11.5337 14 7.83366V3.83366L8 1.16699L2 3.83366V7.83366C2 11.5337 4.56 14.9937 8 15.8337ZM12.6667 7.98033C12.6667 10.8603 10.5 13.8337 8 14.5003C5.5 13.8337 3.33333 10.8603 3.33333 7.98033V4.70033L8 2.62033L12.6667 4.70033V7.98033Z" fill={props.color}/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.5003C10.5 13.8337 12.6667 10.8603 12.6667 7.98033V4.70033L8 2.62033L3.33333 4.70033V7.98033C3.33333 10.8603 5.5 13.8337 8 14.5003ZM4 9.16699L6.66667 11.8337L12 6.50033L11.06 5.55366L6.66667 9.94699L4.94 8.22699L4 9.16699Z" fill={props.color}/>
    </svg>
  )
}

