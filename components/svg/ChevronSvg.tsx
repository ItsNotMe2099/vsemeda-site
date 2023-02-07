interface Props {
  color: string
  className?: string
}

export default function ChevronSvg(props: Props) {
  return (
    <svg className={props.className} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.386591 1.29259C0.776705 0.899706 1.41219 0.898188 1.80369 1.28969L4.97698 4.46297C5.3675 4.8535 6.00066 4.8535 6.39119 4.46297L9.56447 1.28969C9.95597 0.898187 10.5915 0.899706 10.9816 1.29259C11.3697 1.68351 11.369 2.31514 10.9795 2.70469L6.39119 7.29297C6.00066 7.6835 5.3675 7.6835 4.97698 7.29297L0.388694 2.70469C-0.000854462 2.31514 -0.00157914 1.68351 0.386591 1.29259Z" fill={props.color}/>
    </svg>
  )
}

