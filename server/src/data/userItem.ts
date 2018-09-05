import { ItemType } from "./ItemType";

export interface IUserItem {
  id: string;
  name: string;
  type: ItemType;
  ownerItemId: string;
  description: string;
  progress: number;
  note: string;
  location: string;
  maxProgress: number;
  version: number;
}