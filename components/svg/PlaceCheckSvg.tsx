interface Props {
  color: string
  className?: string
}

export default function PlaceCheckSvg(props: Props) {
  return (
    <svg className={props.className} width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.81104 1.9C10.611 1.9 12.811 3.99 12.811 6.65C12.811 9.405 9.91104 13.49 7.81104 16.055C5.71104 13.49 2.81104 9.405 2.81104 6.65C2.81104 3.99 5.01104 1.9 7.81104 1.9ZM7.81104 0C3.91104 0 0.811035 2.945 0.811035 6.65C0.811035 11.59 7.81104 19 7.81104 19C7.81104 19 14.811 11.59 14.811 6.65C14.811 2.945 11.711 0 7.81104 0ZM7.11104 11.4L12.011 6.65L10.611 5.32L7.11104 8.74L5.51103 7.22L4.11104 8.55L7.11104 11.4Z" fill={props.color}/>
    </svg>
  )
}

