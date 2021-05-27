import { Dispatch } from 'react';

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

export interface StandardProp {
    table: personnelState;
    index: number;
}

export interface StyledStandardProp {
    table: personnelState;
}

export interface optionProp {
    option: number;
    index:number;
}

export type personnelState = {
    title: string;
    count: number;
    desc: string;
    [key: string]: number | string;
}

export type popUpState = {
    calendarPopUp: boolean;
    pricePopUp: boolean;
    personnelPopUp: boolean;
    currentValue: String;
    currentClass?: String;
}

export type popUpDispatch = Dispatch<Action>;
export type personnelDispatch = Dispatch<personnelAction>;
