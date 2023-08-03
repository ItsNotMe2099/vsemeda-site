interface Props {
    color?: string
    className?: string
    onClick?: () => void
  }
  
  export default function ArrowDownSvg(props: Props) {
    return (
      <svg className={props.className}  onClick={props.onClick} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.70202 0.712509C1.09214 0.319627 1.72762 0.31811 2.11912 0.70961L5.29241 3.88289C5.68293 4.27342 6.31609 4.27342 6.70662 3.88289L9.8799 0.70961C10.2714 0.318109 10.9069 0.319628 11.297 0.712509C11.6852 1.10343 11.6844 1.73506 11.2949 2.12461L6.70662 6.71289C6.31609 7.10342 5.68293 7.10342 5.29241 6.71289L0.704124 2.12461C0.314575 1.73506 0.313851 1.10343 0.70202 0.712509Z" fill="black" />
      </svg>
    )
  }
  