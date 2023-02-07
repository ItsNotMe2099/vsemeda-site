interface Props {
  className?: string
}

export default function MarkerSvg(props: Props) {
  return (
    <svg className={props.className} width="36" height="52" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 34C18.5523 34 19 34.4477 19 35V46.5C19 47.0523 18.5523 47.5 18 47.5C17.4477 47.5 17 47.0523 17 46.5V35C17 34.4477 17.4477 34 18 34Z" fill="#61D46E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 49C18.5523 49 19 49.4477 19 50V50.5C19 51.0523 18.5523 51.5 18 51.5C17.4477 51.5 17 51.0523 17 50.5V50C17 49.4477 17.4477 49 18 49Z" fill="white"/>
      <circle cx="18" cy="18" r="18" fill="#61D46E"/>
      <circle cx="18" cy="18" r="5" fill="black"/>
    </svg>

  )
}

