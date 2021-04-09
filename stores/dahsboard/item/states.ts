import {atom} from "recoil";
import {Item} from "../../../interfaces/dashboard/item";

export const itemListState = atom<Item[]>({
    key: 'itemListState',
    default: [],
});