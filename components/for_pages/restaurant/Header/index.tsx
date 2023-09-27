import styles from './index.module.scss'
import { Sticky, StickyChildArgs } from 'react-sticky'
import Link from 'next/link'
import { forwardRef, useState, ChangeEvent } from 'react'
import { useAppContext } from 'context/state'
import LogoEdaSvg from 'components/svg/LogoEdaSvg'
import LoginButton from 'components/layout/Header/LoginButton'
import { breakpoints, colors } from 'styles/variables'
import classNames from 'classnames'
import UserMenu from 'components/layout/Header/UserMenu'
import FieldSearch from 'components/ui/FieldSearch'
import DividerDotsSvg from 'components/svg/DividerDotsSvg'
import { useThrottleFn } from '@react-cmpt/use-throttle'
import { useResize } from 'components/hooks/useResize'

interface Props {
  isSticky?: boolean
  restProps?: any
  childArgs?: StickyChildArgs
}

const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any, distanceFromTop?: number }>((props, ref) => {
  const {isPhoneWidth, isSmDesktopWidth, width} = useResize()

  const appContext = useAppContext()

  const [value, setValue] = useState<string>('')

  const handleSubmit = () => {
    if (value) {

    }
  }

  const handleSearch = async (value: string) => {
    setValue(value)
  }

  const { callback: search, cancel, callPending } = useThrottleFn(handleSearch, 300)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
    search(value)
  }

  return (
    <div className={classNames(styles.root, { [styles.none]: appContext.modal })} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <div className={styles.desktop}>        
        <div className={classNames(styles.container, { [styles.sticky]: props.distanceFromTop < 0 })}>
          <div className={styles.left}>
            <Link href='/'>
              <div className={styles.logo}>
                <LogoEdaSvg textColor={props.distanceFromTop < 0 ? colors.white : '#333333'} />
              </div>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form} action="/search" onSubmit={handleSubmit}>
              <FieldSearch onChange={handleInputChange} />
            </form>
            {width > breakpoints.PhoneWidth && width < breakpoints.SmDesktopWidth &&
              <DividerDotsSvg color='#AF81BD' />
            }
           
           
            {!appContext.token && (width > breakpoints.PhoneWidth && width < breakpoints.SmDesktopWidth) && 
            <LoginButton /> 
            ||
            (width > breakpoints.PhoneWidth && width < breakpoints.SmDesktopWidth) &&
             <UserMenu/>
            }
          </div>
        </div>
      </div>
    </div>
  )
})

HeaderInner.displayName = 'HeaderInner'
export default function Header(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, distanceFromTop, ...rest }) => <HeaderInner distanceFromTop={distanceFromTop} {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <HeaderInner {...props} />
  }
}
