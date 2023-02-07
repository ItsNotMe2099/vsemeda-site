interface Props {
  color: string
  className?: string
}

export default function CheckSvg(props: Props) {
  return (
    <svg className={props.className} width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.52036 11.0537C4.12296 11.0538 3.74183 10.8959 3.46106 10.6146L0.258452 7.4132C-0.0861507 7.06849 -0.0861507 6.50971 0.258452 6.165C0.603165 5.82039 1.16194 5.82039 1.50666 6.165L4.52036 9.1787L12.4933 1.20572C12.8381 0.861115 13.3968 0.861115 13.7415 1.20572C14.0862 1.55043 14.0862 2.10921 13.7415 2.45392L5.57966 10.6146C5.29889 10.8959 4.91776 11.0538 4.52036 11.0537Z" fill={props.color}/>
    </svg>
  )
}

