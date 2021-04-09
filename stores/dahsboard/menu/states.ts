import {atom} from "recoil";
import {Item} from "../../../interfaces/dashboard/item";
import { User } from "../../../interfaces/dashboard/user";

export const menuState = atom<string>({
    key: 'menuState',
    default: '',
});