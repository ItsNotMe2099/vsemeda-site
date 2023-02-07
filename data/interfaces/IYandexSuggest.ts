export interface IYandexSuggestResponse{
  part: string
  results: IYandexSuggestItem[]
}
export interface IYandexSuggestItem {
  subtitle: {text: string, hl: number[][]},
  title: {text: string, hl: number[][]}
  tags: string[]
  type: string
  text: string
}
