import { IUserItem } from "./userItem";

export interface IItem {
  uniqueName: string;
  name: string;
  type?: string;
  components?: IComponent[];
  imageName: string;
  category?: string;
  wikiaUrl?: string;

  drops?: IDrop[];

  userItem: IUserItem;

  hasChildren: boolean;
  isOpen: boolean;
  owner: IItem;
  children: IItem[];
  sort: string;

  isEven: boolean;
  top: number;  
  height: number;  
}

export interface IComponent extends IItem {
  itemCount: string;

  location?: string;
}

export interface IDrop {
  location: string;
  type: string,
  rarity: string
}