export enum Role {
  User = 0,
  Elevated = 512,
  Administrator = 1024
}

export interface IUser {
  id: string;
  name: string;
  credit?: number;
  raffle?: number;
  role?: Role;
  prizes?: IRaffleItem[];
}

export interface IRaffleItem {
    id: string,
    image: string,
    winner: string
  }

export interface IRaffleTicket {
  id: string;
  name: string;
  raffle?: number;
}

export interface IRaffle {
  tickets: IRaffleTicket[];
  items: IRaffleItem[];
}