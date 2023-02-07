import { useEffect, useRef, useCallback, useState } from 'react'
import { YMap, YMapLocationRequest } from '@yandex/ymaps3-types'



import { clusterByGrid, YMapClusterer } from '@yandex/ymaps3-types/packages/clusterer'
import { YMapZoomControl } from '@yandex/ymaps3-types/packages/controls'
import { YMapHint, YMapHintContext } from '@yandex/ymaps3-types/packages/hint'



type YMapModules = typeof ymaps3 & {
  YMapClusterer?: typeof YMapClusterer;
  clusterByGrid?: typeof clusterByGrid;
  YMapZoomControl?: typeof YMapZoomControl;
  YMapHint?: typeof YMapHint;
  YMapHintContext?: typeof YMapHintContext;
};




interface IMapProps {
  center: YMapLocationRequest;
  className?: string
};

interface IMapContext {
  yMapMutable: YMap | null;
  yMapModules: YMapModules | null;
};

let yMapModules: IMapContext['yMapModules'] = null


const YandexMap: React.FC<React.PropsWithChildren<IMapProps>> = ({ className, center, children }) => {
  const [azimut, setAzimut] = useState<number>(0)
  const mapRootNode = useRef<HTMLDivElement>(null)
  const isMapCreated = useRef<boolean>(false)
  const yMap = useRef<YMap>(null)
  const createMap = async (center: YMapLocationRequest) => {
    if(typeof ymaps3 === 'undefined' || !mapRootNode.current) return
    await ymaps3.ready
    console.log('MapCreated')
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1')
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
    } = ymaps3

    yMapModules = {
      ...ymaps3,
      YMapZoomControl,
    }

    if(yMap.current){
      return
    }
    console.log('CreateYaMaps')
    yMap.current = new YMap(mapRootNode.current, {
      location: center,
      behaviors: ['drag', 'scrollZoom', 'mouseTilt', 'mouseRotate'],
    })

    yMap.current.addChild(new YMapDefaultSchemeLayer({theme: 'dark'}))
      .addChild(new YMapFeatureDataSource({id: 'my-source'}))
      .addChild(new YMapLayer({source: 'my-source', type: 'markers', zIndex: 1800}))
      .addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})))
      .addChild(new YMapListener({
        onUpdate: (value) => setAzimut(() => (value.camera.azimuth ?? 0) * 180 / Math.PI),
      }))

    isMapCreated.current = true
    //setProviderState({yMapMutable, yMapModules})
  }

  const destroyMap = useCallback(() => {
    yMap.current?.destroy()
  //  setProviderState(null)

    isMapCreated.current = false
  }, [])

  const updateMap = (center: YMapLocationRequest) => {
    console.log('SetLocation',  yMap.current)
    yMap.current?.setLocation(center)
  }

  useEffect(() => {
    console.log('centerChanged', center)
    if(isMapCreated.current){
      updateMap(center)
    } else {
      createMap(center)
    }
  }, [center])
  useEffect(() => {
    console.log('MapCreated')
  }, [])

  useEffect(() => {
    return destroyMap
  }, [])

  return(
    <div
      ref={mapRootNode}
      className={className}
    >
      {children}
    </div>
  )
}

export default YandexMap
