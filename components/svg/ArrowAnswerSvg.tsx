interface Props {
    className?: string,
    color?: string
  }
  
  export default function ArrowAnswerSvg(props: Props) {
    return (
        <svg className={props.className} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M18 13L13 10.1132V15.8868L18 13ZM8.5 5C8.5 4.72386 8.27614 4.5 8 4.5C7.72386 4.5 7.5 4.72386 7.5 5H8.5ZM12 13.5H13.5V12.5H12V13.5ZM8.5 9V5H7.5V9H8.5ZM12 12.5C10.067 12.5 8.5 10.933 8.5 9H7.5C7.5 11.4853 9.51472 13.5 12 13.5V12.5Z' fill={props.color??'#812392'}/>
        </svg>
    )
  }