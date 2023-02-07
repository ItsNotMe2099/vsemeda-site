import React from 'react'

interface Props {
  color?: string
  className?: string
}

function RubleSvg(props: Props) {
  return (
  <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12ZM8.42857 6H13.0714C15.2429 6 17 7.64 17 9.66667C17 11.6933 15.2429 13.3333 13.0714 13.3333H9.85714V14.6667H12.7143V16H9.85714V18H8.42857V16H7V14.6667H8.42857V13.3333H7V12H8.42857V6ZM13.0714 12H9.85714V7.33333H13.0714C14.45 7.33333 15.5714 8.38 15.5714 9.66667C15.5714 10.9533 14.45 12 13.0714 12Z" fill={props.color}/>
  </svg>


)
}

export default RubleSvg
