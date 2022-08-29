import axios from "axios";
import xmljs from "xml2js";
import { uuid } from "uuidv4";
export default class Parser {
    getUNData() {
        return new Promise((resolve, reject) => { });
    }
    getUKData() {
        return new Promise((resolve, reject) => { });
    }
    getEUData() {
        return new Promise((resolve, reject) => { });
    }
    getBISData() {
        return new Promise((resolve, reject) => { });
    }
    getOFACData() {
        const isArray = (target) => Array.isArray(target);
        const isObject = (target) => typeof target === 'object';
        const isUndefined = (target) => target === undefined;
        const isNull = (target) => typeof target === null;
        const isString = (target) => typeof target === 'string';
        const hasLength = (target) => target.length > 0;
        const pushAlias = (firstName, lastName, arr) => {
            if (isString(lastName) &&
                hasLength(lastName)) {
                const akaFullName = firstName + lastName;
                arr.push({
                    firstName: firstName,
                    lastName: lastName,
                    fullName: akaFullName,
                });
            }
        };
        const pushAddress = (location, arr) => {
            const result = {};
            const { address1, address2, address3, city, postalCode, country, stateOrProvince } = location;
            if (hasLength(address1) ||
                hasLength(address2) ||
                hasLength(address3)) {
                result.address = address1 + address2 + address3;
            }
            ;
            if (hasLength(city))
                result.city = city;
            if (hasLength(postalCode))
                result.postalCode = postalCode;
            if (hasLength(country))
                result.country = country;
            if (hasLength(stateOrProvince))
                result.stateOrProvince = stateOrProvince;
            arr.push(result);
        };
        const pushDetails = (info, arr) => {
            const { key, value } = info;
            if (hasLength(key) &&
                hasLength(value)) {
                arr.push(info);
            }
            ;
        };
        return new Promise((resolve, reject) => {
            const SDN_URL = 'https://www.treasury.gov/ofac/downloads/sdn.xml'; // Specially Designated Nationals List
            const NON_SDN_URL = 'https://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml'; // Consolidated Sanctions List
            const xmlScraperOptions = {
                explicitArray: false, // Prevent xml2json from wraping everything into array
            };
            const formatSanctionData = (sanction) => {
                const program = sanction?.programList?.program;
                const type = sanction.sdnType;
                const remarks = sanction.remarks;
                const firstName = sanction.firstName;
                const lastName = sanction.lastName;
                const alias = sanction?.akaList?.aka;
                const address = sanction?.addressList?.address;
                const details = sanction?.idList?.id;
                const title = sanction.title;
                const nationality = sanction?.nationalityList?.nationality;
                const dateOfBirth = sanction?.dateOfBirthList?.dateOfBirthItem;
                const placeOfBirth = sanction?.placeOfBirthList?.placeOfBirthItem;
                // Result object
                const formattedSanction = {};
                formattedSanction.firstName = firstName || '';
                formattedSanction.lastName = lastName || '';
                formattedSanction.fullName = formattedSanction.firstName + formattedSanction.lastName;
                formattedSanction.id = uuid();
                formattedSanction.authority = 'OFAC';
                formattedSanction.type = type || 'Unknown';
                formattedSanction.title = title || '';
                formattedSanction.programs = [];
                formattedSanction.aliases = [];
                formattedSanction.addresses = [];
                formattedSanction.details = [];
                // Check if provided sanction program is Array or a string
                if (isArray(program) &&
                    hasLength(program)) {
                    program.forEach((prog) => {
                        formattedSanction.programs.push(prog);
                    });
                }
                else if (isString(program)) {
                    formattedSanction.programs.push(program);
                }
                ;
                // Check if provided sanction has remarks 
                if (isString(remarks) &&
                    hasLength(remarks)) {
                    formattedSanction.remarks = remarks;
                }
                ;
                // Check if provided sanction alias is Array or a string
                if (isArray(alias) &&
                    hasLength(alias)) {
                    alias.forEach((aka) => {
                        const akaFirstName = aka.firstName || '';
                        const akaLastName = aka.lastName;
                        pushAlias(akaLastName, akaFirstName, formattedSanction.aliases);
                    });
                }
                else if (isObject(alias)) {
                    const akaFirstName = alias.firstName || '';
                    const akaLastName = alias.lastName;
                    pushAlias(akaLastName, akaFirstName, formattedSanction.aliases);
                }
                // Check if provided sanction addresses is Array or a string
                if (isArray(address) &&
                    hasLength(address)) {
                    address.forEach((location) => {
                        pushAddress({
                            address1: location.address1 || '',
                            address2: location.address2 || '',
                            address3: location.address3 || '',
                            city: location.city || '',
                            postalCode: location.postalCode || '',
                            country: location.country || '',
                            stateOrProvince: location.stateOrProvince || '',
                        }, formattedSanction.addresses);
                    });
                }
                else if (isObject(alias)) {
                    pushAddress({
                        address1: alias.address1 || '',
                        address2: alias.address2 || '',
                        address3: alias.address3 || '',
                        city: alias.city || '',
                        postalCode: alias.postalCode || '',
                        country: alias.country || '',
                        stateOrProvince: alias.stateOrProvince || '',
                    }, formattedSanction.addresses);
                }
                if (isArray(details) &&
                    hasLength(details)) {
                    details.forEach((detail) => {
                        pushDetails({
                            key: detail.idType || '',
                            value: detail.idNumber || '',
                        }, formattedSanction.details);
                    });
                }
                else if (isObject(details)) {
                    pushDetails({
                        key: details.idType || '',
                        value: details.idNumber || '',
                    }, formattedSanction.details);
                }
                if (isArray(nationality) &&
                    hasLength(nationality)) {
                    nationality.forEach((nation) => {
                        pushDetails({
                            key: 'Country',
                            value: nation.country || '',
                        }, formattedSanction.details);
                    });
                }
                else if (isObject(nationality)) {
                    pushDetails({
                        key: 'Country',
                        value: nationality.country || '',
                    }, formattedSanction.details);
                }
                if (isArray(dateOfBirth) &&
                    hasLength(dateOfBirth)) {
                    dateOfBirth.forEach((date) => {
                        pushDetails({
                            key: 'Date of birth',
                            value: date.dateOfBirth || '',
                        }, formattedSanction.details);
                    });
                }
                else if (isObject(details)) {
                    pushDetails({
                        key: 'Date of birth',
                        value: details.dateOfBirth || '',
                    }, formattedSanction.details);
                }
                if (isArray(placeOfBirth) &&
                    hasLength(placeOfBirth)) {
                    placeOfBirth.forEach((place) => {
                        pushDetails({
                            key: 'Place of birth',
                            value: place.placeOfBirth || '',
                        }, formattedSanction.details);
                    });
                }
                else if (isObject(details)) {
                    pushDetails({
                        key: 'Place of birth',
                        value: details.placeOfBirth || '',
                    }, formattedSanction.details);
                }
                return formattedSanction;
            };
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
                        const result = {};
                        // Date number which will be converted into a Date object
                        const nonSdnListPubDateNumber = Date.parse(nonSdnJson.sdnList.publshInformation.Publish_Date);
                        const sdnListPubDateNumber = Date.parse(sdnJson.sdnList.publshInformation.Publish_Date);
                        // Date when sanctions lists where published
                        const nonSdnListPubDate = new Date(nonSdnListPubDateNumber);
                        const sdnListPubDate = new Date(sdnListPubDateNumber);
                        // Sanctions list entries count
                        const nonSdnListEntriesCount = Date.parse(nonSdnJson.sdnList.publshInformation.Record_Count);
                        const sdnListEntriesCount = Date.parse(sdnJson.sdnList.publshInformation.Record_Count);
                        // Formatted array of sanctions that can be inserted into a database 
                        // without any further manipulation with data
                        const nonSdnEntriesFormatted = nonSdnEntries.map((sanction) => {
                            return formatSanctionData(sanction);
                        });
                        const sdnEntriesFormatted = sdnEntries.map((sanction) => {
                            return formatSanctionData(sanction);
                        });
                        // Aggregated list of entries
                        result.entries = [
                            ...nonSdnEntriesFormatted,
                            ...sdnEntriesFormatted,
                        ];
                        resolve(result);
                    }
                    catch (err) {
                        reject(err);
                    }
                })();
            }));
        });
    }
}
const s = new Parser();
s.getOFACData().then((data) => {
    console.log(data);
});
