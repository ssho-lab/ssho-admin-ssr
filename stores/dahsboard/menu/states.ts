import {atom} from "recoil";
import {Item} from "../../../interfaces/dashboard/item";
import { User } from "../../../interfaces/dashboard/user";

export const menuState = atom<number>({
    key: 'menuState',
    default: 0,
});