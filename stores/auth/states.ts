import {atom} from "recoil";
import {SignInModel} from "../../interfaces/auth";

export const signinState = atom<SignInModel>({
    key: 'signinState',
    default: { email: "", password: ""},
});