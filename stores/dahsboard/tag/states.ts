import {atom} from "recoil";
import {Tag} from "../../../interfaces/dashboard/item";

export const tagListState = atom<Tag[]>({
    key: 'tagListState',
    default: [],
});