interface Props {
  color?: string
  className?: string
}

export default function PhotoCameraSvg(props: Props) {
  return (
    <svg className={props.className}  width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 6.0001C9.12925 6 9.26251 6 9.4 6H14.6C14.7375 6 14.8708 6 15 6.0001M9 6.0001C7.0233 6.00164 5.98717 6.02676 5.18404 6.43597C4.43139 6.81947 3.81947 7.43139 3.43597 8.18404C3 9.03969 3 10.1598 3 12.4V13.6C3 15.8402 3 16.9603 3.43597 17.816C3.81947 18.5686 4.43139 19.1805 5.18404 19.564C6.03968 20 7.15979 20 9.4 20H14.6C16.8402 20 17.9603 20 18.816 19.564C19.5686 19.1805 20.1805 18.5686 20.564 17.816C21 16.9603 21 15.8402 21 13.6V12.4C21 10.1598 21 9.03969 20.564 8.18404C20.1805 7.43139 19.5686 6.81947 18.816 6.43597C18.0128 6.02676 16.9767 6.00164 15 6.0001M9 6.0001V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6.0001M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" stroke={props.color? props.color: '#812292' }stroke-width="2" stroke-linecap="round"/>
    </svg>
  )
}
