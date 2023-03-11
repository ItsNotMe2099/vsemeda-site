interface Props {
  color: string
  className?: string
}

export default function PlaceMarkSvg(props: Props) {
  return (
    <svg className={props.className} width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0001 6.07227C9.15244 6.07227 8.32384 6.32362 7.61906 6.79454C6.91427 7.26546 6.36496 7.9348 6.04059 8.71791C5.71621 9.50102 5.63134 10.3627 5.79671 11.1941C5.96207 12.0254 6.37025 12.7891 6.96961 13.3884C7.56898 13.9878 8.33262 14.396 9.16397 14.5613C9.99532 14.7267 10.857 14.6418 11.6401 14.3175C12.4233 13.9931 13.0926 13.4438 13.5635 12.739C14.0344 12.0342 14.2858 11.2056 14.2858 10.358C14.2858 9.22134 13.8343 8.13125 13.0305 7.32752C12.2268 6.52379 11.1367 6.07227 10.0001 6.07227ZM10.0001 12.5008C9.57625 12.5008 9.16195 12.3752 8.80956 12.1397C8.45717 11.9042 8.18252 11.5696 8.02033 11.178C7.85814 10.7865 7.81571 10.3556 7.89839 9.93993C7.98107 9.52425 8.18516 9.14243 8.48484 8.84275C8.78453 8.54307 9.16635 8.33898 9.58202 8.2563C9.99769 8.17361 10.4286 8.21605 10.8201 8.37824C11.2117 8.54043 11.5463 8.81508 11.7818 9.16747C12.0173 9.51986 12.1429 9.93416 12.1429 10.358C12.1429 10.9263 11.9172 11.4713 11.5153 11.8732C11.1134 12.2751 10.5684 12.5008 10.0001 12.5008Z" fill={props.color}/>
      <path d="M10 24.6431C9.16255 24.6474 8.33626 24.4476 7.59032 24.0603C6.84438 23.673 6.20049 23.1095 5.71258 22.4171C1.92243 17.0979 0 13.0992 0 10.5312C0 7.83298 1.05357 5.24523 2.92893 3.33727C4.8043 1.4293 7.34784 0.357422 10 0.357422C12.6522 0.357422 15.1957 1.4293 17.0711 3.33727C18.9464 5.24523 20 7.83298 20 10.5312C20 13.0992 18.0776 17.0979 14.2874 22.4171C13.7995 23.1095 13.1556 23.673 12.4097 24.0603C11.6637 24.4476 10.8375 24.6474 10 24.6431ZM10 2.56622C7.92384 2.56863 5.93338 3.40879 4.46531 4.90238C2.99724 6.39597 2.17144 8.42102 2.16907 10.5333C2.16907 12.567 4.05172 16.328 7.46892 21.123C7.75902 21.5295 8.1396 21.8603 8.57953 22.0885C9.01945 22.3166 9.50622 22.4356 10 22.4356C10.4938 22.4356 10.9805 22.3166 11.4205 22.0885C11.8604 21.8603 12.241 21.5295 12.5311 21.123C15.9483 16.328 17.8309 12.567 17.8309 10.5333C17.8286 8.42102 17.0028 6.39597 15.5347 4.90238C14.0666 3.40879 12.0762 2.56863 10 2.56622Z" fill={props.color}/>
    </svg>

  )
}
