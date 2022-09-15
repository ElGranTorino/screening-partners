import axios from "axios"
import xmljs from "xml2js";
import { uuid } from "uuidv4";
import path from "path";
import fs from "fs";
import csv from "csvtojson";
import https from "https";
import cherio from "cherio";
import puppeteer from "puppeteer";
import { IArticle, program, alias, IEUAliasData, ethnic, detail, address, document, ISanction, ISanctionParsingResult, INewsParsingResult} from "../../loaders/Interfaces.js"
import { parse } from "dotenv";

const __dirname = path.resolve();


/**
 * Validation functions
 */
const isArray = (target: any) => Array.isArray(target);
const isObject = (target: any) => typeof target === 'object';
const isUndefined = (target: any) => target === undefined;
const isNull = (target: any) => typeof target === null;
const isString = (target: any) => typeof target === 'string';

/**
 * 
 */
const hasLength = (target: any) => {
    if(target === 'Invalid Date') return false;
    if(typeof target === "string" || isArray(target)) {
        return target.length > 0
    } else if (target === null || target === undefined) {
        return false
    } else if (typeof target === 'number') {
        return target > 0;
    } else if (target instanceof Date){
        return true;
    } else if (isObject(target)) {
        return Object.keys(target).length > 0
    } else if (isUndefined(target) || isNull(target)){
        return false;
    }
};

/**
 * Transforms specified value into a Date or return false.
 * 
 * Different sanctions lists have different dates (publish date, date of birth, document date etc)
 * But it happens that value might not be provided at all, or it might be empty string, string with spaces,
 * We use this function to convert specified value into DATE format or to return false if this value
 * can not be converted
 */
const createValidDateOrFalse = (date: any): Date | false => {
    const validated: number  = Date.parse(date);
    if(isNaN(validated)) return false;

    return new Date(validated);
}

/**
 * This function is similar to createValidDateOrFalse function with the only difference that it check`s
 * if provided data is a string
 */

const getStringOrFalse = (data: any): string | false => {
    if(typeof data !== "string") return false;
    return data
}
/**
 * Function that is used to download file from web and save it in specified directory
 * function takes two string parameters url and destination. Url - is locatioin of target file in the web
 * and destination is a relative path where file should be downloaded. 
 * 
 * NOTE: filename and extension must also be specified 
 * Function returns an absolute path to downloaded file
 */
const downloadFile = (url: string, destination: string): Promise <any> => {
    return new Promise((resolve, reject) => {
        try {
            https.get(url,(res) => {
                const dest = path.join(__dirname, destination)
                const filePath = fs.createWriteStream(dest);
                res.pipe(filePath);
                filePath.on('finish',() => {
                    filePath.close();
                    resolve(dest);
                })
            })
        } catch (error) {
            reject(error);
        }
        
        
    });
    
}

/**
 * Read file from filesystem. Function takes only one parameter which is an 
 * absolute path to the file we want to read.
 */
const readFile = (path: string): Promise <any> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, fileData) => {
            if(err) return reject(err);
            resolve(fileData);
        })
    })
}

/**
 * 
 */
export default class Parser {
    public getUNData(): Promise <ISanctionParsingResult> {
        const URL: string = 'https://scsanctions.un.org/resources/xml/en/consolidated.xml';
        const xmlScraperOptions = {
            explicitArray: false, // Prevent xml2json from wraping everything into array
        };
        const pushUNDetail = (info: any, arr: Array< detail >): void => {
            const {key, value} = info;
            if(
                hasLength(key) &&
                hasLength(value)
            ) {arr.push(info)};
        };
        const pushUNAlias = (fullName: string, arr: Array<alias>): void => {
            if(
                isString(fullName) &&
                hasLength(fullName)
            ) {
                arr.push({
                    firstName: '',
                    lastName: '',
                    fullName: fullName.slice(0, 254),
                });
            }
        }
        const pushUNDocument = (document: document, arr: Array<document>): void => {
            const {type, additionalType, number, country, city, date, note} = document;
            const result = {} as document;

            if(hasLength(type)) { result.type = type; };
            if(hasLength(additionalType)) { result.additionalType = additionalType; };
            if(hasLength(number)) { result.number = number; };
            if(hasLength(country)) { result.country = country; };
            if(hasLength(city)) { result.city = city; };
            if(hasLength(date)) { result.date = date; };
            if(hasLength(note)) { result.note = note; };

            if(hasLength(result)) arr.push(result);
        }
        const pushUNAddress = (location: address, arr: Array<address>): void => {
            
            const {address, city, postalCode, country, stateOrProvince, zipCode, note} = location;
            const result = {} as address;
            if(hasLength(address)) { result.address = address; };
            if(hasLength(city)) result.city = city;
            if(hasLength(postalCode)) result.postalCode = postalCode;
            if(hasLength(country)) result.country = country;
            if(hasLength(stateOrProvince)) result.stateOrProvince = stateOrProvince;
            if(hasLength(note)) result.note = note;
            if(hasLength(zipCode)) result.zipCode = zipCode;

            if(hasLength(result)) arr.push(result);
        }
        const formatSanctionData = (sanction: any, sanctionType: string, listPubDate: Date): ISanction => {
            const formattedSanction = {} as ISanction;
            
            const type = sanctionType;
            const firstName = sanction.FIRST_NAME || '';
            const secondName = sanction.SECOND_NAME || '';
            const thirdName = sanction.THIRD_NAME || '';
            const fourthName = sanction.FOURTH_NAME || '';
            const program = sanction.UN_LIST_TYPE;
            const refNumber = sanction.REFERENCE_NUMBER;
            const pubDate =createValidDateOrFalse(sanction.LISTED_ON) || listPubDate;
            const comment = sanction.COMMENTS1;
            const nationality = sanction?.NATIONALITY?.VALUE;
            const alias = sanction.INDIVIDUAL_ALIAS || sanction.ENTITY_ALIAS;
            const address = sanction.INDIVIDUAL_ADDRESS || sanction.ENTITY_ADDRESS;
            const dateOfBirth = sanction?.INDIVIDUAL_DATE_OF_BIRTH;
            const placeOfBirth = sanction?.INDIVIDUAL_PLACE_OF_BIRTH;
            const document = sanction.INDIVIDUAL_DOCUMENT; 
            const designation = sanction.DESIGNATION;

            formattedSanction.id = uuid();
            formattedSanction.website = 'https://scsanctions.un.org/resources/xml/en/consolidated.xml';
            formattedSanction.firstName = firstName ? firstName.slice(0, 254) : '';
            formattedSanction.lastName = `${secondName} ${thirdName} ${fourthName}`.slice(0, 254);
            formattedSanction.fullName = `${firstName} ${formattedSanction.lastName}`.slice(0, 254);
            formattedSanction.remarks = comment || '';
            formattedSanction.authority = 'UN';
            formattedSanction.pubDate = pubDate;
            formattedSanction.type =  type;
            formattedSanction.programs = [];
            formattedSanction.aliases = [];
            formattedSanction.addresses = [];
            formattedSanction.details = [];
            formattedSanction.documents = []
            formattedSanction.nationality = []
            
            if(hasLength(refNumber)){
                pushUNDetail({
                    key: 'Reference number',
                    value: refNumber
                }, formattedSanction.details)
            }


            // Aliases
            if(
                isArray(alias) && 
                hasLength(alias)
            ){
                alias.forEach((name: any) => {
                    pushUNAlias(name.ALIAS_NAME, formattedSanction.aliases);
                });
            } else if (isObject(alias) && !isArray(alias)){
                pushUNAlias(alias.ALIAS_NAME, formattedSanction.aliases);
            };


            // Programs
            if(
                isArray(program) && 
                hasLength(program)
            ){
                program.forEach((prog: any) => {
                    formattedSanction.programs.push(prog);
                });
            } else if (isString(program) && hasLength(program)){
                formattedSanction.programs.push(program);
            };


            // Addresses
            if(
                isArray(address) && 
                hasLength(address)
            ){
                address.forEach((location: any) => {
                    pushUNAddress({
                        address: location.STREET ? location.STREET.slice(0, 254) : '',
                        postalCode: location.POSTAL_CODE || '',
                        city: location.CITY || '',
                        country: location.COUNTRY || '',
                        stateOrProvince: location.STATE_PROVINCE || '',
                        zipCode: location.ZIP_CODE,
                        note: location.NOTE || ''
                    }, formattedSanction.addresses)
                });
            } else if (isObject(address) && !isArray(address)){
                pushUNAddress({
                    address: address.STREET ? address.STREET.slice(0, 254) : '',
                    city: address.CITY || '',
                    country: address.COUNTRY || '',
                    postalCode: address.POSTAL_CODE || '',
                    stateOrProvince: address.STATE_PROVINCE || '',
                    zipCode: address.ZIP_CODE,
                    note: address.NOTE || ''
                }, formattedSanction.addresses)
            };


            // Documents
            if(
                isArray(document) && 
                hasLength(document)
            ){
                document.forEach((id: any) => {
                    pushUNDocument({
                        type: id.TYPE_OF_DOCUMENT || '',
                        additionalType: id.TYPE_OF_DOCUMENT || '',
                        number: id.NUMBER || '',
                        country: id.ISSUING_COUNTRY || id.COUNTRY_OF_ISSUE || '',
                        city: id.CITY_OF_ISSUE || '',
                        date: createValidDateOrFalse(id.DATE_OF_ISSUE) || null,
                        note: id.NOTE || '',
                    }, formattedSanction.documents)
                });
            } else if (isObject(document) && !isArray(document)){
                pushUNDocument({
                    type: document.TYPE_OF_DOCUMENT || '',
                    additionalType: document.TYPE_OF_DOCUMENT || '',
                    number: document.NUMBER || '',
                    country: document.ISSUING_COUNTRY || document.COUNTRY_OF_ISSUE || '',
                    city: document.CITY_OF_ISSUE || '',
                    date: createValidDateOrFalse(document.DATE_OF_ISSUE) || null,
                    note: document.NOTE || '',
                }, formattedSanction.documents)
            };


            // Place of birth
            if(
                isArray(placeOfBirth) && 
                hasLength(placeOfBirth)
            ){
                placeOfBirth.forEach((place: any) => {
                    pushUNDetail({
                        key: 'Country of birth',
                        value: place.COUNTRY || ''
                    }, formattedSanction.details)
                    pushUNDetail({
                        key: 'City of birth',
                        value: place.CITY || ''
                    }, formattedSanction.details)
                    pushUNDetail({
                        key: 'State/Province of birth',
                        value: place.STATE_PROVINCE || ''
                    }, formattedSanction.details)
                });
            } else if (isObject(placeOfBirth) && !isArray(placeOfBirth)){
                pushUNDetail({
                    key: 'Country of birth',
                    value: placeOfBirth.COUNTRY || ''
                }, formattedSanction.details)
                pushUNDetail({
                    key: 'City of birth',
                    value: placeOfBirth.CITY || ''
                }, formattedSanction.details)
                pushUNDetail({
                    key: 'State/Province of birth',
                    value: placeOfBirth.STATE_PROVINCE || ''
                }, formattedSanction.details)
            };


            // Date of birth
            if(
                isArray(dateOfBirth) && 
                hasLength(dateOfBirth)
            ){
                dateOfBirth.forEach((date: any) => {
                    pushUNDetail({
                        key: 'Type of date',
                        value: date.TYPE_OF_DATE || ''
                    }, formattedSanction.details)
                    pushUNDetail({
                        key: 'Date of birth',
                        value: createValidDateOrFalse(date.DATE) || null
                    }, formattedSanction.details)
                    pushUNDetail({
                        key: 'Year of birth',
                        value: createValidDateOrFalse(date.YEAR) || null
                    }, formattedSanction.details) 
                    pushUNDetail({
                        key: 'Date of birth from',
                        value: createValidDateOrFalse(date.FROM_YEAR) || null
                    }, formattedSanction.details) 
                    pushUNDetail({
                        key: 'Date of birth to',
                        value: createValidDateOrFalse(date.TO_YEAR) || null
                    }, formattedSanction.details) 

                });
            } else if (isObject(dateOfBirth) && !isArray(dateOfBirth)){
                pushUNDetail({
                    key: 'Type of date',
                    value: dateOfBirth.TYPE_OF_DATE || ''
                }, formattedSanction.details)
                pushUNDetail({
                        key: 'Date of birth',
                        value: createValidDateOrFalse(dateOfBirth.DATE) || null
                    }, formattedSanction.details)
                pushUNDetail({
                    key: 'Year of birth',
                    value: createValidDateOrFalse(dateOfBirth.YEAR) || null
                }, formattedSanction.details) 
                pushUNDetail({
                    key: 'Date of birth from',
                    value: createValidDateOrFalse(dateOfBirth.FROM_YEAR) || null
                }, formattedSanction.details) 
                pushUNDetail({
                    key: 'Date of birth to',
                    value: createValidDateOrFalse(dateOfBirth.TO_YEAR) || null
                }, formattedSanction.details) 
            };

            // // Nationality
            if(
                isArray(nationality) && 
                hasLength(nationality)
            ){
                nationality.forEach((ethnos: any) => {
                    formattedSanction.nationality.push({
                        type: 'Nationality',
                        country: ethnos,
                        address: '',
                        city: '',
                        stateOrProvince: ''
                    })
                });
            } else if (isString(nationality) && hasLength(nationality)){
                    formattedSanction.nationality.push({
                        type: 'Nationality',
                        country: nationality,
                        address: '',
                        city: '',
                        stateOrProvince: ''
                    })
            };
            


            // Position(designation)
            if(
                isArray(designation) && 
                hasLength(designation)
            ){
                designation.forEach((position: any) => {
                    pushUNDetail({
                        key: 'Position',
                        value: position || ''
                    }, formattedSanction.details)
                });
            } else if (isString(designation) && hasLength(designation)){
                pushUNDetail({
                    key: 'Position',
                    value: designation || ''
                }, formattedSanction.details)
            };
            return formattedSanction
        }

        const parse = (json: any): ISanctionParsingResult => {
            const results = {} as ISanctionParsingResult;

            const individuals: Array<any> = json.CONSOLIDATED_LIST.INDIVIDUALS.INDIVIDUAL;
            const entities: Array<any> = json.CONSOLIDATED_LIST.ENTITIES.ENTITY;
            const listPubDate: Date = new Date(json.CONSOLIDATED_LIST.$.dateGenerated)
            const individualsEntries: Array<ISanction> = individuals.map((notFormatted) => formatSanctionData(notFormatted, "Individual", listPubDate));
            const entitiesEntries: Array<ISanction> = entities.map((notFormatted) => formatSanctionData(notFormatted, "Entity", listPubDate));

            results.entries = [
                ...individualsEntries,
                ...entitiesEntries,
            ];

            return results;
        }
      
        return new Promise((resolve, reject) => {
            try {
                downloadFile(URL, './files/UN.xml')
                    .then((path) => readFile(path))
                    .then((fileData) => xmljs.parseStringPromise(fileData, xmlScraperOptions))
                    .then((json) => {
                        resolve(parse(json));
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    public getUKData(): Promise <ISanctionParsingResult> {
        const URL: string = 'https://ofsistorage.blob.core.windows.net/publishlive/2022format/ConList.xml';
        const xmlScraperOptions = {
            explicitArray: false, // Prevent xml2json from wraping everything into array
        };
        const pushUKDocument = (document: document, arr: Array<document>): void => {
            const {type, additionalType, number, country, city, date, note} = document;
            const result = {} as document;
            if(hasLength(type)) { result.type = type; };
            if(hasLength(additionalType)) { result.additionalType = additionalType; };
            if(hasLength(number)) { result.number = number; };
            if(hasLength(country)) { result.country = country; };
            if(hasLength(city)) { result.city = city; };
            if(hasLength(date)) { result.date = date; };
            if(hasLength(note)) { result.note = note; };

            if(hasLength(result)) arr.push(result);
        }
        const pushUKAddress = (location: address, arr: Array<address>): void => {
            
            const {address, city, postalCode, country, stateOrProvince, zipCode, note} = location;
            const result = {} as address;
            if(hasLength(address)) { result.address = address; };
            if(hasLength(city)) result.city = city;
            if(hasLength(postalCode)) result.postalCode = postalCode;
            if(hasLength(country)) result.country = country;
            if(hasLength(stateOrProvince)) result.stateOrProvince = stateOrProvince;
            if(hasLength(note)) result.note = note;
            if(!isUndefined(zipCode)) result.zipCode = zipCode;
            if(hasLength(result)) arr.push(result);
        }
        const formatUKSanctionData = (sanction: any): ISanction => {
            const formattedSanction = {} as ISanction;

            // For both individials and entities
            const title = sanction.Title;

            const name1 = getStringOrFalse(sanction.Name6) || '';
            const name2 = getStringOrFalse(sanction.name1) || '';
            const name3 = getStringOrFalse(sanction.name2) || '';
            const name4 = getStringOrFalse(sanction.name3) || '';
            const name5 = getStringOrFalse(sanction.name4) || '';
            const name6 = getStringOrFalse(sanction.name5) || '';

            const address1 = getStringOrFalse(sanction.Address6) || '';
            const address2 = getStringOrFalse(sanction.Address1) || '';
            const address3 = getStringOrFalse(sanction.Address2) || '';
            const address4 = getStringOrFalse(sanction.Address3) || '';
            const address5 = getStringOrFalse(sanction.Address4) || '';
            const address6 = getStringOrFalse(sanction.Address5) || '';

            const type = sanction.GroupTypeDescription;
            const postalCode = sanction.PostCode;
            const country = sanction.Country;
            const remark = sanction.OtherInformation;
            const regime = sanction.RegimeName;
            const pubDate = sanction.DateListed; // "2011-12-02T00:00:00"
            const designed = sanction.DateDesignated; // "2011-12-02T00:00:00"
            const program  = sanction.UKSanctionsListRef;
            const reason = sanction.UKStatementOfReasons;
            const phoneNumber = sanction.PhoneNumber;
            const website = sanction.Website;
            const email = sanction.EmailAddress;
            const originalName = sanction.NAME_ORIGINAL_SCRIPT;
            const street = `${address1} ${address2} ${address3} ${address4} ${address5} ${address6}`.replace(/\s{2,}/gi, ' ').trim();
            const comment = sanction.COMMENTS1;
            // Individuals only
            const dateOfBirth = sanction.Individual_DateOfBirth;
            const cityOfBirth = sanction.Individual_TownOfBirth;
            const countryOfBirth = sanction.Individual_CountryOfBirth;
            const nationality = sanction.Individual_Nationality;

            const passportNumber = sanction.Individual_PassportNumber;
            const passportDetails = sanction.Individual_PassportDetails;

            const NINumber = sanction.Individual_NINumber;
            const NIDetails = sanction.Individual_NIDetails;
            const position = sanction.Individual_Position;
            const gender = sanction.Individual_Gender;
            
            // For entities only
            const entityType = sanction.Entity_Type;
            const subsidiaries = sanction.Entity_Subsidiaries;
            const parentCompany = sanction.Entity_ParentCompany;
            const bussinessRegNumber = sanction.Entity_BusinessRegNumber;

            formattedSanction.website = "https://www.gov.uk/government/publications/the-uk-sanctions-list";
            formattedSanction.id = uuid();
            formattedSanction.type =  type || 'Unknown'
            formattedSanction.authority = 'UK';
            formattedSanction.remarks = getStringOrFalse(remark) || '';
            formattedSanction.firstName = name1;
            formattedSanction.lastName = `${name2} ${name3} ${name4} ${name5} ${name6}`.replace(/\s{2,}/gi, ' '); // It might happen that we don`t have second or third etc. name, so there will occure extra spaces in the string, that we need to replace
            formattedSanction.fullName = `${formattedSanction.firstName} ${formattedSanction.lastName}`;

            formattedSanction.pubDate = createValidDateOrFalse(pubDate) || createValidDateOrFalse(designed) || new Date(Date.now());
            formattedSanction.programs = [];
            formattedSanction.aliases = [];
            formattedSanction.addresses = [];
            formattedSanction.details = [];
            formattedSanction.documents = []
            formattedSanction.nationality = []
            
            if(isString(program) && hasLength(program)) formattedSanction.programs.push(program);
            if(isString(regime) && hasLength(regime)) formattedSanction.details.push({key: 'Regime name', value: regime});
            if(isString(comment) && hasLength(comment)) formattedSanction.details.push({key: 'Comments', value: comment});

            if(isString(originalName) && hasLength(originalName)) formattedSanction.details.push({key: 'Name original script', value: originalName});
            

            if(isString(reason) && hasLength(reason)) formattedSanction.details.push({key: 'Statment of reason', value: reason});
            if(isString(phoneNumber) && hasLength(phoneNumber)) formattedSanction.details.push({key: 'Phone Number', value: phoneNumber});
            if(isString(website) && hasLength(website)) formattedSanction.details.push({key: 'Website', value: website});
            if(isString(email) && hasLength(email)) formattedSanction.details.push({key: 'Email', value: email});
            if(isString(gender) && hasLength(gender)) formattedSanction.details.push({key: 'Gender', value: gender});
            if(isString(position) && hasLength(position)) formattedSanction.details.push({key: 'Position', value: position});
            if(isString(NINumber) && hasLength(NINumber)) formattedSanction.details.push({key: 'NI Number', value: NINumber});
            if(isString(NIDetails) && hasLength(NIDetails)) formattedSanction.details.push({key: 'NI Details', value: NIDetails});

            if(isString(passportNumber) && isString(passportDetails)) {
                formattedSanction.documents.push({type: 'Passport', number: passportDetails});
            }
            
            if(isString(dateOfBirth) && hasLength(dateOfBirth)) formattedSanction.details.push({key: 'Date of birth', value: dateOfBirth});
            if(isString(cityOfBirth) && hasLength(cityOfBirth)) formattedSanction.details.push({key: 'City of birth', value: cityOfBirth});
            if(isString(countryOfBirth) && hasLength(countryOfBirth)) formattedSanction.details.push({key: 'Country of birth', value: countryOfBirth});

            if(isString(entityType)) formattedSanction.details.push({key: 'Entity type', value: entityType});
            if(isString(subsidiaries)) formattedSanction.details.push({key: 'Sub Sidiaries', value: subsidiaries});
            if(isString(parentCompany)) formattedSanction.details.push({key: 'Parent Company', value: parentCompany});
            if(isString(bussinessRegNumber)) formattedSanction.details.push({key: 'Bussiness Registration Number', value: bussinessRegNumber});
            if(isString(nationality)) formattedSanction.nationality.push({country: nationality, type: 'Nationality'});
          

            if(
                (isString(postalCode) && hasLength(postalCode)) ||
                (isString(country) && hasLength(country.trim())) ||
                (isString(street) && hasLength(street.trim()))
            ) {
                const address: address = {};
                if(isString(postalCode)) address.postalCode = postalCode;
                if(isString(country)) address.country = country;
                if(isString(street)) address.address = street;
                pushUKAddress(address, formattedSanction.addresses)
            }
            return formattedSanction;
        }
        const parse = (json: any): ISanctionParsingResult => {
            const results = {} as ISanctionParsingResult;
            
            const allUnFormattedSanctions: Array<any> = json.ArrayOfFinancialSanctionsTarget.FinancialSanctionsTarget;
            const entries: Array<ISanction> = allUnFormattedSanctions.map((notFormattedSanction) => formatUKSanctionData(notFormattedSanction));

            results.entries = [
                ...entries,
            ];

            return results;
        }
        
        return new Promise((resolve, reject) => {
            try {
                downloadFile(URL, './files/UK.xml')
                    .then((path) => readFile(path))
                    .then((fileData) => xmljs.parseStringPromise(fileData, xmlScraperOptions))
                    .then((json) => {
                        resolve(parse(json));
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    public getEUData(): Promise <ISanctionParsingResult> {
        const URL: string = 'https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4tMjAxNw';
        const xmlScraperOptions = {
            explicitArray: false, // Prevent xml2json from wraping everything into array
        };
        const pushEUAlias = (firstName: string, lastName: string, fullName: string, arr: Array<alias | null>): void => {
            if(
                hasLength(fullName)
            ) {
                arr.push({
                    firstName,
                    lastName,
                    fullName,
                });
            }
        };
        const getDataFromAlias = (alias: any): IEUAliasData => {
            const firstName = alias.$.firstName || '';
            const lastName = alias.$.middleName + alias.$.lastName;
            const fullName = alias.$.wholeName || '';
            const func = alias.$.function || '';
            const gender = alias.$.gender || '';
            
            return {firstName,
                    lastName,
                    fullName,
                    func, 
                    gender};
        }
        const formatEUSanctionData = (sanction: any, listPubDate: Date): ISanction => {
            const formattedSanction = {} as ISanction;

            
            const refNumber = sanction?.$?.euReferenceNumber;
            const unID = sanction?.$?.unitedNationId;
            const designationDetails = sanction?.$?.unitedNationId;
            const pubDate = sanction?.regulation?.$?.publicationDate;
            const numberTitle = sanction?.regulation?.$?.numberTitle;
            const program = sanction?.regulation?.$?.programme;
            const alias = sanction.nameAlias;
            const citizenShip = sanction.citizenship;
            const birthDate = sanction.birthdate
            const type = sanction?.subjectType?.$?.code || 'Unknown' // $: {code: 'person'} // person or enterprise
            const remark = isString(sanction.remark) ? sanction.remark : '';
            const document = sanction?.identification;
            const address = sanction?.address

            formattedSanction.id = uuid();
            formattedSanction.type =  type || 'Unknown'
            formattedSanction.authority = 'EU';
            formattedSanction.pubDate = createValidDateOrFalse(pubDate) || listPubDate;
            formattedSanction.remarks = remark;
            

            formattedSanction.website = "https://data.europa.eu/data/datasets/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions?locale=en";
            formattedSanction.programs = [];
            formattedSanction.aliases = [];
            formattedSanction.addresses = [];
            formattedSanction.details = [];
            formattedSanction.documents = []
            formattedSanction.nationality = []

            /**
             * EU sanctions list does not have first, last and full name,
             * so we have to create those fields from aliases. They might be either an object or
             * an array of objects smth. similar to this:
             * [
             * ...
                {
                    '$': {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    wholeName: 'Yevgeniy Vitalievich BALYTSKIY',
                    function: 'On 9 April 2022, the Russian authorities nominated Yevgeniy Balytskiy as the so-called Governor of the Zaporizhzhia region of Ukraine.',
                    gender: 'M',
                    title: '',
                    nameLanguage: '',
                    strong: 'true',
                    regulationLanguage: 'en',
                    logicalId: '143395'
                    }
                }
                ...
                ]
             */
            if(isArray(alias) && hasLength(alias)){
                alias.forEach((alternative: any, i: number) => {
                    const {firstName, lastName, fullName, func, gender} = getDataFromAlias(alternative);
                    
                    // If alias is an array and it length is equal to one, We don`t push this alias
                    // into result aliases array, instead we just create first, last and full names keys.
                    if(alias.length === 1){
                        formattedSanction.firstName = firstName;
                        formattedSanction.lastName = lastName;
                        formattedSanction.fullName = fullName;

                        if(hasLength(func)) formattedSanction.details.push({key: 'Function', value: func});
                        if(hasLength(gender)) formattedSanction.details.push({key: 'Gender', value: gender});
                    } else {
                        // If lenth of array is greater than 1, we take first element from array and create first, last and full names
                        // All other aliases we push into a result array
                        if(i === 0) {
                            formattedSanction.firstName = firstName;
                            formattedSanction.lastName = lastName;
                            formattedSanction.fullName = fullName;

                            if(hasLength(func)) formattedSanction.details.push({key: 'Function', value: func});
                            if(hasLength(gender)) formattedSanction.details.push({key: 'Gender', value: gender});
                        }
                        pushEUAlias(firstName, lastName, fullName, formattedSanction.aliases)
                    }
                })
            } else if (isObject(alias) && !isArray(alias)) {
                // If alias is an object we simply push data from this object into result array
                const {firstName, lastName, fullName, func, gender} = getDataFromAlias(alias);

                formattedSanction.firstName = firstName;
                formattedSanction.lastName = lastName;
                formattedSanction.fullName = fullName;

                if(hasLength(func)) formattedSanction.details.push({key: 'Function', value: func});
                if(hasLength(gender)) formattedSanction.details.push({key: 'Gender', value: gender});
            }


            // Citizenship
            if(isArray(citizenShip) && hasLength(citizenShip)){
                citizenShip.forEach((location: any, i: number) => {
                    formattedSanction.nationality.push({
                        type: 'Citizenship',
                        country: location.$.countryDescription,
                        city: '',
                        address: '',
                        stateOrProvince: '',

                    });
                })
            } else if (isObject(citizenShip) && !isArray(citizenShip)) {
                if(hasLength(citizenShip?.$?.countryDescription)) {
                    formattedSanction.nationality.push({
                        type: 'Citizenship',
                        country: citizenShip.$.countryDescription,
                        city: '',
                        address: '',
                        stateOrProvince: '',

                    });
                }
            }


            // Birth Date and place
            if(isArray(birthDate) && hasLength(birthDate)){
                birthDate.forEach((location: any, i: number) => {
                    if(location?.$?.city) formattedSanction.details.push({key: 'City of birth', value: location?.$?.city});
                    if(location?.$?.zipCode) formattedSanction.details.push({key: 'Place of birth zip-code', value: location?.$?.zipCode});
                    if(location?.$?.birthdate) formattedSanction.details.push({key: 'Date of birth', value: createValidDateOrFalse(location?.$?.birthdate) || ''});
                    if(location?.$?.region) formattedSanction.details.push({key: 'Region of birth', value: location?.$?.region});
                    if(location?.$?.countryDescription && location?.$?.countryDescription !== 'UNKNOWN') formattedSanction.details.push({key: 'Country of birth', value: location?.$?.countryDescription});
                })
            } else if (isObject(birthDate) && !isArray(birthDate)) {
                if(birthDate?.$?.city) formattedSanction.details.push({key: 'City of birth', value: birthDate?.$?.city});
                if(birthDate?.$?.zipCode) formattedSanction.details.push({key: 'Place of birth zip-code', value: birthDate?.$?.zipCode});
                if(birthDate?.$?.birthdate) formattedSanction.details.push({key: 'Date of birth', value: createValidDateOrFalse(birthDate?.$?.birthdate) || ''});
                if(birthDate?.$?.region) formattedSanction.details.push({key: 'Region of birth', value: birthDate?.$?.region});
                if(birthDate?.$?.countryDescription && birthDate?.$?.countryDescription !== 'UNKNOWN') formattedSanction.details.push({key: 'Country of birth', value: birthDate?.$?.countryDescription});
            }
            

            const pushEUAddress = (location: any, arr: Array<address>): void => {
                const loc = {} as address;
                const {address, city, postalCode, country, stateOrProvince, zipCode, note} = location;

                if(hasLength(address)) loc.address = address;
                if(hasLength(city)) loc.city = city;
                if(hasLength(postalCode)) loc.postalCode = postalCode;
                if(hasLength(stateOrProvince)) loc.stateOrProvince = stateOrProvince;
                if(hasLength(country) && country !== 'UNKNOWN') loc.country = country;
                if(hasLength(zipCode)) loc.zipCode = zipCode;
                if(hasLength(note)) loc.note = note;

                if(hasLength(loc)) arr.push(loc);
            }


            const pushEUDocument = (document: any, arr: Array<document>): void => {
                const doc = {} as document;
                const {type, date, person, number, country, city, note} = document;

                if(hasLength(type)) doc.type = type;
                if(hasLength(date)) doc.date = date;
                if(hasLength(person)) doc.person = person;
                if(hasLength(number)) doc.number = number;
                if(hasLength(country) && country !== 'UNKNOWN') doc.country = country;
                if(hasLength(city)) doc.city = city;
                if(hasLength(note)) doc.note = note;

                if(hasLength(doc)) arr.push(doc);
            }



            // Documents
            if(isArray(document) && hasLength(document)){
                document.forEach((id: any, i: number) => {
                    const type = id?.$?.identificationTypeDescription || '';
                    const date = createValidDateOrFalse(id?.$?.issueDate) || '';
                    const person = id?.$?.issuedBy || '';
                    const number = id?.$?.number || '';
                    const country = id?.$?.countryDescription || '';
                    const city = id?.$?.region || '';
                    const note = id.remark || '';

                    pushEUDocument({type, date, person, number,country, city, note}, formattedSanction.documents)
                })
            } else if (isObject(document) && !isArray(document)) {
                    const type = document?.$?.identificationTypeDescription || '';
                    const date = createValidDateOrFalse(document?.$?.issueDate) || '';
                    const person = document?.$?.issuedBy || '';
                    const number = document?.$?.number || '';
                    const country = document?.$?.countryDescription || '';
                    const city = document?.$?.region || '';
                    const note = document.remark || '';

                    pushEUDocument({type, date, person, number,country, city, note}, formattedSanction.documents)
            }


            // Addressess
            if(isArray(address) && hasLength(address)){
                address.forEach((location: any, i: number) => {
                    const address = location.$.street || '';
                    const city = location.$.city || '' ;
                    const postalCode = location.$.poBox || '' ;
                    const country = location.$.countryDescription || '' ;;
                    const stateOrProvince = location.$.region || '' ;;
                    const zipCode = location.$.zipCode || '' ;;
                    const note = location.remark || '';

                    pushEUAddress({address, city, postalCode, country, stateOrProvince, zipCode, note}, formattedSanction.addresses)
                })
            } else if (isObject(address) && !isArray(address)) {
                const add = address.$.street || '';
                const city = address.$.city || '' ;
                const postalCode = address.$.poBox || '' ;
                const country = address.$.countryDescription || '' ;;
                const stateOrProvince = address.$.region || '' ;;
                const zipCode = address.$.zipCode || '' ;;
                const note = address.remark || '';

                pushEUAddress({address: add, city, postalCode, country, stateOrProvince, zipCode, note}, formattedSanction.addresses)

            }


            // Programs
            if(
                isString(program) &&
                hasLength(program)
            ) {formattedSanction.programs.push(program)};

            
            // Reference number
            if(
                isString(refNumber) &&
                hasLength(refNumber)
            ) {formattedSanction.details.push({key: 'Reference number', value: refNumber})};


            // Designation details
            if(
                isString(designationDetails) &&
                hasLength(designationDetails)
            ) {formattedSanction.details.push({key: 'Designation details', value: designationDetails})};


            // United nations ID
            if(
                isString(unID) &&
                hasLength(unID)
            ) {formattedSanction.details.push({key: 'UN Id', value: unID})};




            // if(
            //     isString(unID) &&
            //     hasLength(unID)
            // ) {formattedSanction.details.push({key: 'UN Id', value: unID})};

            // if(
            //     isString(numberTitle) &&
            //     hasLength(numberTitle)
            // ) {formattedSanction.details.push({key: 'UN Id', value: numberTitle})};
            return formattedSanction;
        }
        const parse = (json: any) => {
            const results = {} as ISanctionParsingResult;
            
            const UElistPubDate = new Date(json.export.$.generationDate);
            const allUnFormattedSanctions: Array<any> = json.export.sanctionEntity;

            const entries: Array<ISanction> = allUnFormattedSanctions.map((notFormattedSanction) => formatEUSanctionData(notFormattedSanction, new Date(UElistPubDate)));

            results.entries = [
                ...entries,
            ];

            return results;
        }

        return new Promise((resolve, reject) => {
            downloadFile(URL, './files/EU.xml')
                .then((path) => readFile(path))
                .then((fileData) => xmljs.parseStringPromise(fileData, xmlScraperOptions))
                .then((json) => {
                    // json.export.sanctionEntity.forEach((item) => {
                    //     console.log(item.address) // 
                    // })
                    resolve(parse(json));
                })
        })
    }
    public getBISData(): Promise <ISanctionParsingResult> {
        // {
        //     "Source List": "EL",
        //     "Entity Number": "",
        //     "SDN Type": "",
        //     "Programs": "",
        //     "Name": "Abdul Satar Ghoura",
        //     "Title": "",
        //     "Address": "Flat No. 41 Block No 24 Macroyan 3",
        //     "City": "Kabul",
        //     "State/Province": "",
        //     "Postal Code": "",
        //     "Country": "Afghanistan",
        //     "Federal Register Notice": "76 FR 71867",
        //     "Effective Date": "11/21/2011",
        //     "Date Lifted/Waived/Expired": "",
        //     "Standard Order": "",
        //     "License Requirement": "For all items subject to the EAR. (See ?744.11 of the EAR).",
        //     "License Policy": "Presumption of denial.",
        //     "Call Sign": "",
        //     "Vessel Type": "",
        //     "Gross Tonnage": "",
        //     "Gross Register Tonnage": "",
        //     "Vessel Flag": "",
        //     "Vessel Owner": "",
        //     "Remarks/Notes": "",
        //     "Address Number": "",
        //     "Address Remarks": "",
        //     "Alternate Number": "",
        //     "Alternate Type": "",
        //     "Alternate Name": "",
        //     "Alternate Remarks": "",
        //     "Web Link": "http://www.bis.doc.gov/entities/default.htm",
        //     "": "",
        //     "__1": "",
        //     "__2": "",
        //     "__3": "",
        //     "__4": ""
        //   },
        const URL: string = 'https://www.bis.doc.gov/index.php/documents/consolidated-entity-list/1072-el-2/file';
        const formatBISSanction = (sanction: any): ISanction => {
            const formattedSanction = {} as ISanction;

            const sourceListVar = 'Source List';
            const entityNumberVar = 'Entity Number';
            const sdnTypeVar = 'SDN Type';
            const programsVar = 'Programs';
            const nameVar = 'Name';
            const titleVar = 'Title';
            const addressVar = 'Address';
            const cityVar = 'City';
            const stateOrProvinceVar = 'State/Province';
            const postalCodeVar = 'Postal Code';
            const coutryVar = 'Country';
            const frnVar = 'Federal Register Notice';
            const pubDateVar = 'Effective Date';
            const licenseRequirementVar = 'License Requirement';
            const licensePolicyVar = 'License Policy';
            const callSignVar = 'Call Sign';
            const vesselTypeVar = 'Vessel Type';
            const grossTonnageVar = 'Gross Tonnage';
            const grossRegisterTonnageVar = 'Gross Register Tonnage';
            const vesselOwnerVar  = 'Vessel Owner';
            const remarksVar = 'Remarks/Notes';
            const addressNumberVar = 'Address Number';
            const addressRemarksVar = 'Address Remarks';
            const alternateNumberVar = 'Alternate Number';
            const alternateTypeVar = 'Alternate Type';
            const alternateNameVar = 'Alternate Name';
            const alternateRemarksVar = 'Alternate Remarks';

            formattedSanction.id = uuid();
            formattedSanction.type =  sanction[sdnTypeVar] || '-'
            formattedSanction.authority = 'BIS';
            formattedSanction.pubDate = createValidDateOrFalse(sanction[pubDateVar]) || new Date();
            formattedSanction.remarks = sanction[remarksVar];
            formattedSanction.firstName = '';
            formattedSanction.lastName = '';
            formattedSanction.fullName = sanction[nameVar].slice(0, 254);

            formattedSanction.list = sanction[sourceListVar] || '';
            formattedSanction.website = "http://www.bis.doc.gov/entities/default.htm";
            formattedSanction.programs = [];
            formattedSanction.aliases = [];
            formattedSanction.addresses = [];
            formattedSanction.details = [];
            formattedSanction.documents = []
            formattedSanction.nationality = []


            if(hasLength(sanction[programsVar])) formattedSanction.programs.push(sanction[programsVar]);
            if(hasLength(sanction[entityNumberVar])) formattedSanction.details.push({key: 'Entity Number', value: sanction[entityNumberVar]});
            if(hasLength(sanction[titleVar])) formattedSanction.details.push({key: 'Title', value: sanction[titleVar]});
            if(hasLength(sanction[frnVar])) formattedSanction.details.push({key: frnVar, value: sanction[frnVar]});
            if(hasLength(sanction[licenseRequirementVar])) formattedSanction.details.push({key: licenseRequirementVar, value: sanction[licenseRequirementVar]});
            if(hasLength(sanction[licensePolicyVar])) formattedSanction.details.push({key: licensePolicyVar, value: sanction[licensePolicyVar]});
            if(hasLength(sanction[callSignVar])) formattedSanction.details.push({key: callSignVar, value: sanction[callSignVar]});
            if(hasLength(sanction[vesselTypeVar])) formattedSanction.details.push({key: vesselTypeVar, value: sanction[vesselTypeVar]});
            if(hasLength(sanction[grossTonnageVar])) formattedSanction.details.push({key: grossTonnageVar, value: sanction[grossTonnageVar]});
            if(hasLength(sanction[grossRegisterTonnageVar])) formattedSanction.details.push({key: grossRegisterTonnageVar, value: sanction[grossRegisterTonnageVar]});
            if(hasLength(sanction[vesselOwnerVar])) formattedSanction.details.push({key: vesselOwnerVar, value: sanction[vesselOwnerVar]});

            if(hasLength(sanction[addressNumberVar])) formattedSanction.details.push({key: addressNumberVar, value: sanction[addressNumberVar]});
            if(hasLength(sanction[alternateNumberVar])) formattedSanction.details.push({key: alternateNumberVar, value: sanction[alternateNumberVar]});
            if(hasLength(sanction[alternateTypeVar])) formattedSanction.details.push({key: alternateTypeVar, value: sanction[alternateTypeVar]});
            if(hasLength(sanction[alternateNameVar])) formattedSanction.details.push({key: alternateNameVar, value: sanction[alternateNameVar]});
            if(hasLength(sanction[alternateRemarksVar])) formattedSanction.details.push({key: alternateRemarksVar, value: sanction[alternateRemarksVar]});

            if (
               hasLength(sanction[addressVar]) ||
               hasLength(sanction[cityVar]) ||
               hasLength(sanction[stateOrProvinceVar]) ||
               hasLength(sanction[postalCodeVar]) ||
               hasLength(sanction[coutryVar])
            ) {
                formattedSanction.addresses.push({
                    address: sanction[addressVar].slice(0, 254),
                    city: sanction[cityVar],
                    postalCode: sanction[postalCodeVar],
                    country: sanction[coutryVar],
                    stateOrProvince: sanction[stateOrProvinceVar],
                    zipCode: 0,
                    note: sanction[addressRemarksVar] || ''
                })
            }

            return formattedSanction
        }
        const parse = (unformattedBISSanctions: any): ISanctionParsingResult => {
            const results = {} as ISanctionParsingResult;

            let entries: Array<ISanction> = unformattedBISSanctions.map((notFormattedSanction: any) => formatBISSanction(notFormattedSanction));
            entries = entries.filter((item) => item.fullName.length)
            results.entries = [
                ...entries,
            ];

            return results; 
        }
        return new Promise((resolve, reject) => {
            readFile(path.join(path.resolve(), 'files/BIS.json'))
                .then((fileData) => {
                    resolve(
                        parse(JSON.parse(fileData))
                    );
                })
        })
    }
    public getOFACData(): Promise <ISanctionParsingResult> {
        const pushOFACAlias = (lastName: string | undefined, firstName: string, arr: Array<alias>): void => {
            if(
                isString(lastName) &&
                isString(lastName)
            ) {
                const fullName = `${firstName} ${lastName}`;
                arr.push({
                    firstName,
                    lastName,
                    fullName,
                });
            }
        };


        /**
         * @param location 
         * @param arr in which we will push formatted date
         */
        const pushOFACAddress = (location: any, arr: Array< address >): void => {
            const {address1, address2, address3, city, postalCode, country, stateOrProvince} = location
            const result = {} as address;
            if(
                hasLength(address1) ||
                hasLength(address2) ||
                hasLength(address3)
            ) { result.address = `${address1} ${address2} ${address3}`; };
            
            if(hasLength(city)) result.city = city;
            if(hasLength(postalCode)) result.postalCode = postalCode;
            if(hasLength(country)) result.country = country;
            if(hasLength(stateOrProvince)) result.stateOrProvince = stateOrProvince;
            
            if(hasLength(result)) arr.push(result)
            arr.push(result)
        };


        const pushOFACDetail = (info: any, arr: Array< detail >): void => {
            const {key, value} = info;
            if(
                hasLength(key) &&
                hasLength(value)
            ) { arr.push(info) };
        };
        return new Promise((resolve, reject) => {

            const SDN_URL: string = 'https://www.treasury.gov/ofac/downloads/sdn.xml'; // Specially Designated Nationals List
            const NON_SDN_URL: string = 'https://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml'; // Consolidated Sanctions List
            const xmlScraperOptions = {
                explicitArray: false, // Prevent xml2json from wraping everything into array
            };

            
            // Every sanction list (UN, UK, EU, OFAC...) has different structure, 
            // So wee need to unify the data from every file so it could be easily
            // Inserted in the database
            const formatSanctionData = (sanction: any, pubDate: Date, list: string): ISanction => {
                const program = sanction?.programList?.program;
                const type = sanction.sdnType;
                const remarks = sanction.remarks;
                const firstName = sanction.firstName || '';
                const lastName = sanction.lastName || '';
                const alias = sanction?.akaList?.aka;
                const address = sanction?.addressList?.address;
                const details = sanction?.idList?.id;
                const title = sanction.title;
                const nationality = sanction?.nationalityList?.nationality;
                const dateOfBirth = sanction?.dateOfBirthList?.dateOfBirthItem;
                const placeOfBirth = sanction?.placeOfBirthList?.placeOfBirthItem;

                // Result object
                const formattedSanction = {} as ISanction;

                formattedSanction.firstName = firstName;
                formattedSanction.lastName = lastName;
                formattedSanction.fullName = `${firstName} ${lastName}`;
                formattedSanction.id = uuid();
                formattedSanction.authority = 'OFAC';
                formattedSanction.type =  type || 'Unknown';
                formattedSanction.title = title || '';
                formattedSanction.pubDate = pubDate;
                formattedSanction.website = "https://home.treasury.gov/policy-issues/financial-sanctions/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists";
                formattedSanction.list = list;
                formattedSanction.programs = [];
                formattedSanction.aliases = [];
                formattedSanction.addresses = [];
                formattedSanction.details = [];
                formattedSanction.documents = [];
                formattedSanction.nationality = [];
              
                // Program
                if(
                    isArray(program) && 
                    hasLength(program)
                ){
                    program.forEach((prog) => {
                        formattedSanction.programs.push(prog);
                    });
                } else if (isString(program)){
                    formattedSanction.programs.push(program);
                };

                // Check if provided sanction has remarks 
                if(
                    isString(remarks) &&
                    hasLength(remarks)
                ) { formattedSanction.remarks = remarks; };
                
                // Alias
                if(
                    isArray(alias) &&
                    hasLength(alias)
                ){
                    alias.forEach((aka: any) => {
                        const akaFirstName: string = aka.firstName || '';
                        const akaLastName: string | undefined = aka.lastName;

                        pushOFACAlias(akaLastName, akaFirstName, formattedSanction.aliases);
                        
                    });
                } else if (isObject(alias) && !isArray(alias)){
                    const akaFirstName: string = alias.firstName || '';
                    const akaLastName: string | undefined = alias.lastName;

                    pushOFACAlias(akaLastName, akaFirstName, formattedSanction.aliases);
                }

                
                // Address
                if(
                    isArray(address) &&
                    hasLength(address)
                ){
                    address.forEach((location: any) => {
                        pushOFACAddress({
                            address1: location.address1 || '', 
                            address2: location.address2 || '', 
                            address3: location.address3 || '', 
                            city: location.city || '', 
                            postalCode: location.postalCode || '', 
                            country: location.country || '', 
                            stateOrProvince: location.stateOrProvince || '',
                        }, formattedSanction.addresses);
                    });
                } else if (isObject(address) && !isArray(address)){
                    pushOFACAddress({
                        address1: address.address1 || '', 
                        address2: address.address2 || '', 
                        address3: address.address3 || '', 
                        city: address.city || '', 
                        postalCode: address.postalCode || '', 
                        country: address.country || '', 
                        stateOrProvince: address.stateOrProvince || '',
                    }, formattedSanction.addresses);
                }
                
                // Details
                if(
                    isArray(details) &&
                    hasLength(details)
                ){
                    details.forEach((detail: any) => {
                        if(hasLength(detail)) {
                            formattedSanction.documents.push({
                                type: detail.idType,
                                number: detail.idNumber,
                                country: detail.idCountry,
                                additionalType: '',
                                city: ''
                            })
                        }
                    });
                } else if (isObject(details) && !isArray(details) && hasLength(details)){
                    formattedSanction.documents.push({
                        type: details.idType,
                        number: details.idNumber,
                        country: details.idCountry,
                        additionalType: '',
                        city: ''
                    })
                }

                // Nationality
                if(
                    isArray(nationality) &&
                    hasLength(nationality)
                ){
                    nationality.forEach((nation: any) => {
                        formattedSanction.nationality.push({
                            type: 'Nationality',
                            country: nation.country,
                            address: '',
                            city: '',
                            stateOrProvince: ''
                        })
                    });
                } else if (isObject(nationality) && !isArray(nationality)){
                    formattedSanction.nationality.push({
                        type: 'Nationality',
                        country: nationality.country,
                        address: '',
                        city: '',
                        stateOrProvince: ''
                    })
                }

                // Date of birth
                if(
                    isArray(dateOfBirth) &&
                    hasLength(dateOfBirth)
                ){
                    dateOfBirth.forEach((date: any) => {
                        pushOFACDetail({
                            key: 'Date of birth', 
                            value: date.dateOfBirth || '', 
                        }, formattedSanction.details);
                    });
                } else if (isObject(dateOfBirth) && !isArray(dateOfBirth)){
                    pushOFACDetail({
                        key: 'Date of birth', 
                        value: dateOfBirth.dateOfBirth || '', 
                    }, formattedSanction.details);
                }


                // Place of birth
                if(
                    isArray(placeOfBirth) &&
                    hasLength(placeOfBirth)
                ){
                    placeOfBirth.forEach((place: any) => {
                        pushOFACDetail({
                            key: 'Place of birth', 
                            value: place.placeOfBirth || '', 
                        }, formattedSanction.details);
                    });
                } else if (isObject(placeOfBirth) && !isArray(placeOfBirth)){
                    pushOFACDetail({
                        key: 'Place of birth', 
                        value: placeOfBirth.placeOfBirth || '', 
                    }, formattedSanction.details);
                }

                return formattedSanction; // @types = ISanction
            }

            
            axios.all([
                axios.get(NON_SDN_URL),
                axios.get(SDN_URL),
            ]).then(axios.spread((nonSdnResponse, sdnResponse) => {
                
                // Creating imediate invoke function expression, so we could use 
                // await keyword
                (async () => {
                    try {
                        // Scraped data in JSON forman
                        const nonSdnJson = await xmljs.parseStringPromise(nonSdnResponse.data, xmlScraperOptions);
                        const sdnJson = await xmljs.parseStringPromise(sdnResponse.data, xmlScraperOptions); 

                        // List of sanctions data parsed from .xml files. It must be formatted
                        const nonSdnEntries = nonSdnJson.sdnList.sdnEntry;
                        const sdnEntries = sdnJson.sdnList.sdnEntry;

                        // Resolved data
                        const result = {} as ISanctionParsingResult;
                        
                        // Date number which will be converted into a Date object
                        const nonSdnListPubDateNumber: number = Date.parse(nonSdnJson.sdnList.publshInformation.Publish_Date);
                        const sdnListPubDateNumber: number = Date.parse(sdnJson.sdnList.publshInformation.Publish_Date);

                        // Date when sanctions lists where published
                        const nonSdnListPubDate: Date = new Date(nonSdnListPubDateNumber);
                        const sdnListPubDate: Date = new Date(sdnListPubDateNumber);

                        // Sanctions list entries count
                        const nonSdnListEntriesCount: number = nonSdnJson.sdnList.publshInformation.Record_Count;
                        const sdnListEntriesCount: number = sdnJson.sdnList.publshInformation.Record_Count;

                        // Formatted array of sanctions that can be inserted into a database 
                        // without any further manipulation with data

                        // ___NOTE___: it might be better to use filter method, to reveal sanctions without a name ()
                        const nonSdnEntriesFormatted: Array <ISanction> = nonSdnEntries.map((sanction: object) => {
                            return formatSanctionData(sanction, nonSdnListPubDate, 'Non-SDN');
                        });
                        const sdnEntriesFormatted: Array <ISanction> = sdnEntries.map((sanction: object) => {
                            return formatSanctionData(sanction, sdnListPubDate, 'SDN');
                        });

                        

                        // Aggregated list of entries
                        result.entries = [
                            ...nonSdnEntriesFormatted,
                            ...sdnEntriesFormatted,
                        ];

                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                })();
            }))
        })
    }
    public getGoogleNewsData(): Promise <INewsParsingResult> {
        const getPageContent = async (url: string) => {
            const LAUNCH_PUPPETEER_OPTS: any = {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--disable-gpu',
                    '--window-size=1920x1080'
                ],
            };
            const PAGE_PUPPETEER_OPTS: any = {
                networkIdle2Timeout: 5000,
                waitUntil: 'networkidle2',
                timeout: 60000
            }
            try {
                const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
                const page = await browser.newPage();
        
                await page.goto(url, PAGE_PUPPETEER_OPTS);
                const content = await page.content();
                browser.close()
        
                return content
            } catch (err) {
                throw err
            }
        }
        const getJsonData = (html: string) => {
            try {
                const $ = cherio.load(html);
                const articles: Array<IArticle> = [];
                $('.xuvV6b.BGxR7d').each((i: number, selector: object) => {
                    // if($(selector).find('.mnr-c')) return false;
                    const article  = {} as IArticle
        
                    article.url = $(selector).find('a').attr('href') || ''
                    article.source = $(selector).find('.CEMjEf.NUnG9d span').text() || ''
                    article.title = $(selector).find('[role="heading"]').text().replace(/\n/gi, '') || ''
                    article.body = $(selector).find('.GI74Re').text().replace(/\n/gi, '') || ''
                    article.pubDate = $(selector).find('.OSrXXb.ZE0LJd span').text() || ''
                    
                    articles.push(article)
                })
                return articles
            } catch (err) {
                throw err
            }
        }
        return new Promise((resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        })
    }
}

const p = new Parser();

// p.getUNData()
//     .then((data) => {
//         data.entries.forEach((enty) => {
//             console.log(enty.documents)
//         })
//     })