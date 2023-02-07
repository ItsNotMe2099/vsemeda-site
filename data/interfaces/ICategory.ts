import IFile from 'data/interfaces/IFile'

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  sort: number;
  image?: IFile;

}
