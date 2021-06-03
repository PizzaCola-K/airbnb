import { Dispatch, SetStateAction } from 'react';

export interface Action {
  type: string;
  [key: string]: string | number;
}

export interface personnelAction {
  // type: string;
  index: number;
  counter: number;
  [key: string]: string | number;
}

export interface priceAction {
  price: number;
  [key: string]: string | number;
}

export interface StandardProp {
  table: personnelState;
  index: number;
}

export interface StyledStandardProp {
  table: personnelState;
}

export interface optionProp {
  option: number;
  index: number;
}

export interface LocationParams {
  hash:string,
  key:string,
  pathname:string,
  search:string,
  state:{
    startDate:string,
    endDate:string,
    rangeState:number[][],
    personnelState:[]
  }
};
export interface Location {
  location: LocationParams;
  [key: string]: LocationParams;
}

export interface StayInterface {
  id: number;
  imageUrl: string[];
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  like: boolean;
  likeCount: number;
  price: number;
  option: string;
  additionalOption: string;
  onShowModal: React.MouseEventHandler<HTMLElement>;
}

export interface priceState {
  price: number;
}

export interface modalState {
  modal: { show: boolean; placeId: number };
  setModal: Dispatch<SetStateAction<{ show: boolean; placeId: number }>>;
}

export type personnelState = {
  title: string;
  count: number;
  desc: string;
  [key: string]: number | string;
};

export type popUpState = {
  calendarPopUp: boolean;
  pricePopUp: boolean;
  personnelPopUp: boolean;
  currentValue: String;
  currentClass?: String;
};

export type popUpDispatch = Dispatch<Action>;
export type personnelDispatch = Dispatch<personnelAction>;
export type priceDispatch = Dispatch<priceAction>;
