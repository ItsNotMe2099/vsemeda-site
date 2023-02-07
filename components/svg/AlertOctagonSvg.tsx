interface Props {
  color: string
  className?: string
}

export default function AlertOctagonSvg(props: Props) {
  return (
    <svg className={props.className} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.51333 2.5L2 6.01333V10.9867L5.51333 14.5H10.4867C11.6667 13.3267 14 10.9867 14 10.9867V6.01333L10.4867 2.5M6.06667 3.83333H9.93333L12.6667 6.56667V10.4333L9.93333 13.1667H6.06667L3.33333 10.4333V6.56667M7.33333 10.5H8.66667V11.8333H7.33333V10.5ZM7.33333 5.16667H8.66667V9.16667H7.33333V5.16667Z" fill={props.color}/>
    </svg>
  )
}

