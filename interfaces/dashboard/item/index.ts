export type Item = {
    id: string,
    category: Category[],
    mallNo: string,
    mallNm: string,
    title: string,
    engTitle: string,
    price: string,
    discPrice: string,
    imageUrl: string,
    imageVec: number[],
    link: string,
    tagList: Tag[],
    syncTime: string
}

export type Tag = {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    repVec: number[]
}

export type Mall = {
    id: string,
    name: string,
    categoryList: Category[],
    tagList: Tag[],
    lastSyncTime: string
}

export interface Category{
    mallCatNm: string,
    catCd: string
}