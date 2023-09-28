import styles from './index.module.scss'
import {useField, useFormikContext} from 'formik'
import cx from 'classnames'
import {ChangeEventHandler, KeyboardEventHandler, useEffect, useRef, useState} from 'react'
import {useDetectOutsideClick} from 'components/hooks/useDetectOutsideClick'
import FieldError from 'components/ui/FieldError'
import classNames from 'classnames'
import {IField} from 'types/types'
import {useThrottleFn} from '@react-cmpt/use-throttle'
import {usePopper} from 'react-popper'
import {popperSameWidth} from 'utils/popper'
import {YMap} from '@yandex/ymaps3-types'
import GeocodingRepository from 'data/repositories/GeocodingRepository'
import {IYandexSuggestItem} from 'data/interfaces/IYandexSuggest'
import LoupeSvg from 'components/svg/LoupeSvg'
import Formatter from 'utils/formatter'
import {YandexResponseGeocoder} from 'data/interfaces/IYandexGeocoder'
import IconButton from 'components/ui/IconButton'
import CloseCircleSvg from 'components/svg/CloseCircle'
import { colors } from 'styles/variables'

interface Props extends IField<string> {
  query?: any
  popperStrategy?: 'fixed' | 'absolute' | null
  popperFlip?: boolean
  className?: string
  onNewAddress: (address: YandexResponseGeocoder) => void
  onEditClick: () => void
  hasAddress?: boolean
}

export default function AddressField(props: Props) {
  const {label, placeholder} = props
  const [field, meta, helpers] = useField(props as any)
  const {setFieldValue, setFieldTouched, validateField} = useFormikContext()
  const [message, setMessage] = useState(null)
  const [messageIsError, setMessageIsError] = useState(false)
  const dropdownRef = useRef(null)
  const refIsFromClick = useRef(null)
  const inputRef = useRef(null)
  const [suggestions, setSuggestions] = useState<IYandexSuggestItem[]>([])
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [isExpanded, setIsExpanded] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const ymapRef = useRef<YMap | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (typeof ymaps3 === 'undefined') return
    ymaps3.ready.then(i => {
      ymapRef.current = ymaps3 as any as YMap
    })
  }, [])

  const {styles: popperStyles, attributes, forceUpdate, update} = usePopper(referenceElement, popperElement, {
    strategy: props.popperStrategy ?? 'absolute',
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'flip',
        enabled: props.popperFlip ?? false,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
      popperSameWidth as any

    ]
  })

  const showError = meta.touched && !!meta.error

  const querySuggestions = async (query: string) => {
    if (!query) {
      return
    }
    const res = await GeocodingRepository.suggestYandex({
      text: query,
      //center?: LngLat;
      //span?: LngLat;
      bbox: [[37.057361, 55.350331], [38.429321, 56.070876]],
      //countries: 'ru',
      type: 'tp',
      // localOnly?: number,
      highlight: true,

    })
    setSuggestions(res)
  }

  const {callback, cancel, callPending} = useThrottleFn(querySuggestions, 300)

  const geocode = async (suggestion: string) => {
    setIsEditMode(false)
    setIsExpanded(false)
    const geocoded = await GeocodingRepository.geocodeYandex({
      geocode: suggestion,
      kind: 'house',
      bbox: [[37.057361, 55.350331], [38.429321, 56.070876]],
    })
    const feature = geocoded.response.GeoObjectCollection.featureMember.length > 0 ? geocoded.response.GeoObjectCollection.featureMember[0] : null

    let error = ''
    let hint = ''
    switch (feature.GeoObject.metaDataProperty.GeocoderMetaData.precision) {
      case 'exact':
        break
      case 'number':
      case 'near':
      case 'range':
        error = 'Неточный адрес, требуется уточнение'
        hint = 'Уточните номер дома'
        break
      case 'street':
        error = 'Неполный адрес, требуется уточнение'
        hint = 'Уточните номер дома'
        break
      case 'other':
      default:
        error = 'Неточный адрес, требуется уточнение'
        hint = 'Уточните адрес'
    }
   if (error) {
      setMessage(error)
      setMessageIsError(true)
    } else {
      // Todo OnChange Address
      props.onNewAddress(geocoded)
      setIsActive(false)
    }
  }

  const setSuggestionOnExit = () => {
    const suggestion = suggestions.length > 0 ? suggestions.find(i => i.tags.includes('house')) : null
    if(props.hasAddress){
      setTimeout(() => {
        setFieldTouched(props.name, true)
      }, 200)
      setIsEditMode(false)
      setIsExpanded(false)
      setIsActive(false)
      return
    }
    if (!props.hasAddress && suggestion) {
      helpers.setValue(suggestion.title.text)
    }
    if(!suggestion){

    }
  }

  const handleBlur = () => {
    setSuggestionOnExit()
  }

  const handleKeyDown: KeyboardEventHandler = (e) => {
     if (e.key === 'Enter') {
      setSuggestionOnExit()
    }
  }

  const {callback: callbackBlur, cancel: cancelBlur} = useThrottleFn(handleBlur, 300)

  const handleChangeInputValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    if (value) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
    helpers.setValue(value)
    callback(value)
  }

  useEffect(()=>{
    helpers.setValue(props.value)
  }, [props.value])

  const handleSuggestionClick = async (suggestion: IYandexSuggestItem) => {
    cancelBlur()
    refIsFromClick.current = true
    if (suggestion.tags.includes('house')) {
      helpers.setValue(suggestion.title.text)
      geocode(suggestion.text)
    } else {
      helpers.setValue(suggestion.title.text)
      querySuggestions(suggestion.title.text)
      setIsActive(true)
    }
  }

  const handleEdit = () => {
    setIsEditMode(true)
    if(field.value){
      setTimeout(( ) => {
        setIsActive(true)
      }, 450)
    }
    setTimeout(( ) => {
      setIsExpanded(true)
      inputRef.current.focus()
    }, 400)
    props.onEditClick()
  }

  const removeString = () => {
    helpers.setValue('')
  }

  const hasError = !!meta.error && meta.touched

  return (
    <div className={cx(styles.root, {
      [styles.hasError]: !!meta.error && meta.touched,
    }, props.className)}>    {}
      <div className={classNames(styles.field, {[styles.opened]: isActive, [styles.disabled]: !isEditMode}, suggestions.length > 0&&styles.suggestions)}  ref={(ref) => {
        dropdownRef.current = ref
        setReferenceElement(ref)
      }} >
        <LoupeSvg color={isEditMode ? '#4F4F4F' : '#BDBDBD'}/>
        {isEditMode && 
          <input  
          ref={inputRef} 
          name={props.name}
          onBlur={callbackBlur}
          data-field={props.name} 
          disabled={props.disabled} 
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={handleChangeInputValue}
          className={classNames({[styles.input]: true, [styles.error]: showError})} value={field.value}
          />
        }
        {!isEditMode && <div className={styles.editLabel} onClick={handleEdit}>{field.value||'Изменить адрес'}</div>}
        <IconButton className={styles.removeString} onClick={()=>removeString()} bgColor={'transparent'}><CloseCircleSvg color={colors.grey3}/></IconButton>
      </div>

      {isExpanded &&  suggestions.length > 0 && <div className={classNames(styles.dropDown, {[styles.opened]: isActive})} ref={setPopperElement}
           style={popperStyles.popper}  {...attributes.popper} >
        {message && <div className={cx(styles.message, {[styles.messageError]: messageIsError})}>{message}</div>}
        {suggestions.map((item, key) => <div key={key}
                                             className={styles.option}
                                             onClick={(e) => {
                                               e.stopPropagation()
                                               e.preventDefault()
                                               handleSuggestionClick(item)
                                             }}>

          <div className={styles.optionTitle}>
            {item.title.text}
          </div>
          <div className={styles.optionSubTitle}>
            {Formatter.formatAddressSuggestionSubTitle(item.subtitle.text)}
          </div>
        </div>)}
      </div>}
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
