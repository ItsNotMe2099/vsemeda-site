import { useEffect, useRef, useCallback, useState } from 'react'
import { LngLat, YMap, YMapCenterLocation, YMapControlButton, YMapLocationRequest } from '@yandex/ymaps3-types'
import styles from './index.module.scss'



import { clusterByGrid, YMapClusterer } from '@yandex/ymaps3-types/packages/clusterer'
import { YMapGeolocationControl, YMapZoomControl } from '@yandex/ymaps3-types/packages/controls'
import { YMapHint, YMapHintContext } from '@yandex/ymaps3-types/packages/hint'
import { useThrottleFn } from '@react-cmpt/use-throttle'
import GeocodingRepository from 'data/repositories/GeocodingRepository'
import { GeoObject } from 'data/interfaces/IYandexGeocoder'
import { colors } from 'styles/variables'
import IconButton from '../IconButton'
import MyLocationSvg from 'components/svg/MyLocationSvg'
// import { YMaps } from '@pbe/react-yandex-maps'


type YMapModules = typeof ymaps3 & {
  YMapClusterer?: typeof YMapClusterer;
  clusterByGrid?: typeof clusterByGrid;
  YMapZoomControl?: typeof YMapZoomControl;
  YMapHint?: typeof YMapHint;
  YMapHintContext?: typeof YMapHintContext;
  YMapGeolocationControl?: typeof YMapGeolocationControl;
  YMapControlButton?: typeof YMapControlButton
};




interface IMapProps {
  center: YMapCenterLocation;
  className?: string
  setLocation: (r: YMapLocationRequest)=>void
  setAddressStr:(s: string)=>void
  setGeoObject: (o: GeoObject)=>void
};

interface IMapContext {
  yMapMutable: YMap | null;
  yMapModules: YMapModules | null;
};

let yMapModules: IMapContext['yMapModules'] = null


const YandexMap: React.FC<React.PropsWithChildren<IMapProps>> = ({ className, center, children, setLocation, setAddressStr, setGeoObject }) => {  
  
  const [azimut, setAzimut] = useState<number>(0)
  const mapRootNode = useRef<HTMLDivElement>(null)
  const isMapCreated = useRef<boolean>(false)
  const buttonRef = useRef<HTMLDivElement>(null!)
  const yMap = useRef<YMap>(null)
  const withThrottle = useThrottleFn((cb:Function)=>{cb()}, 1000)
  const createMap = async (center: YMapCenterLocation) => {
    if(typeof ymaps3 === 'undefined' || !mapRootNode.current) return
    await ymaps3.ready
    const { YMapZoomControl,  YMapGeolocationControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1')
    /*
      text: query,
          boundingBox: BoundingBox(
            southWest: Point(latitude: 55.350331, longitude: 37.057361),
            northEast: Point(latitude: 56.070876, longitude: 38.429321),
          ),
          suggestOptions: SuggestOptions(
            suggestType: SuggestType.geo,
            suggestWords: true,
          ));
     */

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapFeatureDataSource,
      YMapLayer,
      YMapControls,
      YMapListener,
      YMapControlButton,
    } = ymaps3

    yMapModules = {
      ...ymaps3,
      YMapZoomControl,
      YMapControls,
    }

    if(yMap.current){
      return
    }

    // lon: number, lat: number, alt?: number]
    yMap.current = new YMap(mapRootNode.current, {
      // location: {center: [center.center[1], center.center[0]], zoom: center.zoom},
      location: center.center[0]&&center||{center: [55.7522200, 37.6155600], zoom: 4},
      behaviors: ['drag', 'scrollZoom', 'mouseTilt', 'mouseRotate'],
    })

    const geolocation = ymaps3.geolocation
    if(!center.center[0]) {
      geolocation.getPosition().then(res=> {
        yMap.current.setLocation({center: res.coords, zoom: 10})
      })
    }

    const mouseMoveCallback = ()=>{ withThrottle.callback(()=>{      
      const center = yMap.current.center as LngLat
      GeocodingRepository.geocodeYandex({geocode: `${center[0]}, ${center[1]}`, kind: 'house'})
      .then(res=> {
        const str = res.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.name
        if(str) {
          setAddressStr(str)
          setLocation({center: center})
          setGeoObject(res.response.GeoObjectCollection.featureMember[0].GeoObject)
        }
      })
    })} 

    const mapListener = new YMapListener({
      layer: 'any',
      onMouseMove: mouseMoveCallback,
      onTouchMove: mouseMoveCallback,
    })

    const button = new YMapControlButton({
      element: buttonRef.current,
      background: colors.purple,
      onClick: () => {
        geolocation.getPosition().then(res=> {
          yMap.current.setLocation({center: res.coords})
        })
      }
    })

    yMap.current.addChild(new YMapDefaultSchemeLayer({theme: 'dark'}))
      .addChild(new YMapFeatureDataSource({id: 'my-source'}))
      .addChild(new YMapLayer({source: 'my-source', type: 'markers', zIndex: 1800}))
      .addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})).addChild(button))
      .addChild(new YMapListener({
        onUpdate: (value) => setAzimut(() => (value.camera.azimuth ?? 0) * 180 / Math.PI),
      }))
      .addChild(mapListener)

    isMapCreated.current = true
    //setProviderState({yMapMutable, yMapModules})
  }

  const destroyMap = useCallback(() => {
    yMap.current?.destroy()
  //  setProviderState(null)

    isMapCreated.current = false
  }, [])

  const updateMap = (center: YMapLocationRequest) => {
    yMap.current?.setLocation(center)
  }

  useEffect(() => {
    if(isMapCreated.current){
      updateMap(center)
    } else {
      createMap(center)
    }
  }, [center])

  useEffect(() => {
    return destroyMap
  }, [])

  return(
    <div
      ref={mapRootNode}
      className={className}
    >
      {children}
      <div ref={buttonRef}><IconButton className={styles.iconButton} bgColor={'transparent'} ><MyLocationSvg color={colors.white}/></IconButton></div>
    </div>
  )
}

export default YandexMap
