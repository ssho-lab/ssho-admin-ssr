import {atom} from "recoil";
import { SwipeLog } from "../../../interfaces/dashboard/log";

export const swipeLogListState = atom<SwipeLog[]>({
    key: 'swipeLogListState',
    default: [],
});