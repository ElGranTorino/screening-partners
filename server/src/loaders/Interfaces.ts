/**
 * Interface of data that we scrape from google new page
 */
export interface IArticle {
    url: string | undefined,
    source: string | undefined,
    title: string | undefined,
    body: string | undefined,
    pubDate: string | undefined,
}

export type program = string;
export type detail = {
    sanction?: string,
    key: string,
    value: string | Date | number,
}
export type address = {
    id?: string,
    address?: string,
    city?: string,
    postalCode?: string | number,
    country?: string,
    stateOrProvince?: string,
    zipCode?: number,
    note?: string,
    sanction?: string,
}
export type ethnic = {
    id?: string,
    sanction?: string,
    type: 'Nationality' | 'Citizenship'
    address?: string,
    city?: string,
    stateOrProvince?: string,
    country?: string,
}
export type document = {
    id?: string,
    type?: string,
    additionalType?: string,
    number?: string,
    country?: string,
    city?: string,
    date?: Date | '',
    note?: string
    person?: string,
    sanction?: string,
}
export interface alias {
    firstName: string, 
    lastName: string, 
    fullName: string,
    sanction?: string,
};
export interface IEUAliasData extends alias {
    func?: string,
    gender?: string,
}
export interface ISanctionEntity {
    id: string,
    pubDate: Date,
    firstName: string,
    lastName: string,
    fullName: string,
    authority: string,
    type: string,
    remarks: string | null,
    title: string,
    website?: string,
    list?: string
}
export interface ISanction extends ISanctionEntity{
    programs: Array <program>,
    aliases: Array <alias | any>,
    addresses: Array<address>,
    details: Array<detail | any>,
    documents?: Array<document | any>,
    nationality?: Array<ethnic | any>
}
export interface ISanctionParsingResult {
    entries: Array<ISanction>
}
export interface INewsParsingResult {

}

export interface ISelectSanctionsRequest {
    offset: number,
    target: string,
    limit: number
}
export interface ISelectSanctionsResponse {
    count: number,
    entities: object
}