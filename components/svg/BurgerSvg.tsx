interface Props {
  color: string
  className?: string
}

export default function BurgerSvg(props: Props) {
  return (
    <svg className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.3333 7H0.666667C0.298477 7 0 7.44772 0 8C0 8.55228 0.298477 9 0.666667 9H15.3333C15.7015 9 16 8.55228 16 8C16 7.44772 15.7015 7 15.3333 7Z" fill={props.color} />
      <path d="M15.3333 2H0.666667C0.298477 2 0 2.44772 0 3C0 3.55228 0.298477 4 0.666667 4H15.3333C15.7015 4 16 3.55228 16 3C16 2.44772 15.7015 2 15.3333 2Z" fill={props.color} />
      <path d="M15.3333 12H0.666667C0.298477 12 0 12.4477 0 13C0 13.5523 0.298477 14 0.666667 14H15.3333C15.7015 14 16 13.5523 16 13C16 12.4477 15.7015 12 15.3333 12Z" fill={props.color} />
    </svg>
  )
}

