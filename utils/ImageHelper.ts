import IFile from 'data/interfaces/IFile'
import { Preset } from 'types/enums'

export default class ImageHelper {
  static urlFromFile(file?: IFile, preset: Preset = Preset.mdResize): string {
    if (!file || !file.link) {
      return ''
    }
    const imageParamsStr =  `w=${this.getImageSize(preset)}&h=${this.getImageSize(preset)}&mode=${this.needCrop(preset) ? 'crop' : 'resize'}&fpx=${file.focalPoint?.x || '0.5'}&fpy=${file.focalPoint?.y || '0.5'}`
    return `${file.link}?${imageParamsStr}`
  }

  static getImageSize(preset: Preset): number {
    switch (preset) {
      case Preset.xsResize:
      case Preset.xsCrop:
        return 250
      case Preset.smResize:
      case Preset.smCrop:
        return 500
      case Preset.mdResize:
      case Preset.mdCrop:
        return 800
      case Preset.lgResize:
      case Preset.lgCrop:
        return 1200
      case Preset.xlResize:
      case Preset.xlCrop:
        return 1800
    }
  }

  static needCrop(preset: Preset): boolean {
    return (
      preset === Preset.xsCrop
      || preset === Preset.smCrop
      || preset === Preset.mdCrop
      || preset === Preset.lgCrop
      || preset === Preset.xlCrop
    )
  }
}
