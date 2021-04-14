import { Tag } from "../item";

export type SwipeLog = {
    userId: number,
    itemId: string,
    score: number,
    swipeTime: string,
    duration: number,
    tagList?: Tag[],
    cardSeq?: number
    userCardSetId?: number
}