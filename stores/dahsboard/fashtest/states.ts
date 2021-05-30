import { atom } from 'recoil'

export const fashTestResultList = atom<any[]>({
	key: 'fashTestResultListState',
	default: [],
});
