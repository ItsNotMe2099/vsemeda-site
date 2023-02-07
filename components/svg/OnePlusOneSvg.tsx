import React from 'react'

interface Props {
  color?: string
  className?: string
}

function OnePlusOneSvg(props: Props) {
  return (
  <svg className={props.className}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7V9H19V17H21V7H17ZM15 13H13V15H11V13H9V11H11V9H13V11H15V13Z" fill={props.color}/>
    <path d="M2 7V9H4V17H6V7H2Z"  fill={props.color}/>
  </svg>

)
}

export default OnePlusOneSvg
