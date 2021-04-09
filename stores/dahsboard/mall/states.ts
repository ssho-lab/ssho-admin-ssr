import {atom} from "recoil";
import {Item, Mall} from "../../../interfaces/dashboard/item";

export const mallListState = atom<Mall[]>({
    key: 'mallListState',
    default: [],
});