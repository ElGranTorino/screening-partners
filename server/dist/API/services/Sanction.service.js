import axios from "axios";
import xmljs from "xml2js";
import { Op } from "sequelize";
import SanctionAddress from "../../models/SanctionAddress.model.js";
import SanctionAlias from "../../models/SanctionAlias.model.js";
import SanctionEntity from "../../models/SanctionEntity.model.js";
import SanctionInfo from "../../models/SanctionInfo.model.js";
import SanctionProgram from "../../models/SanctionProgram.model.js";
import path from "path";
import fs from "fs";
import csv from 'csvtojson';
const operatorsAliases = {
    $eq: Op.eq,
    $or: Op.or,
    $like: Op.like
};
export default class SanctionService {
    parseBISData() {
        return new Promise((resolve, reject) => {
            (async () => {
                const filePath = '/static/xml/BIS.csv';
                await csv()
                    .fromFile(path.join(path.resolve(), filePath))
                    .then((jsonObj) => {
                    const results = {};
                    results.entries = jsonObj.map((entry, i) => {
                        let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList, dateOfBirthList, placeOfBirthList, pubDate;
                        const postalCodeVar = "Postal Code", entityNumberVar = "Entity Number", sdnTypeVar = "SDN Type", stateOrProvinceVar = "State/Province", federalRegisterNoticeVar = "Federal Register Notice", effectiveDateVar = "Effective Date", licenceRequirementVar = "License Requirement", pubDateVar = "Effective Date", licencePolicyVar = "License Policy", remarksVar = "Remarks/Notes", alernativeNamesVar = "Alternate Name";
                        lastName = entry.Name.slice(0, 254);
                        programList = {};
                        authority = 'BIS';
                        sdnType = 'Individual';
                        pubDate = Date.parse(entry[pubDateVar]) || Date.now();
                        programList = {
                            program: ["-"]
                        };
                        // akalist.aka entity alwait have a lastname
                        akaList = {};
                        idList = {
                            id: []
                        };
                        addressList = {};
                        dateOfBirthList = {};
                        placeOfBirthList = {};
                        if (entry[alernativeNamesVar].length) {
                            akaList.aka = [];
                            let names = entry[alernativeNamesVar].split(',');
                            names = names.reduce((acc, name) => {
                                if (name.length)
                                    acc.push({ lastName: name });
                                return acc;
                            }, []);
                            akaList.aka.push(...names);
                        }
                        if (entry.Address ||
                            entry.City ||
                            entry.Country ||
                            entry.Address ||
                            entry[postalCodeVar] ||
                            entry[stateOrProvinceVar]) {
                            addressList.address = [];
                            const location = {};
                            if (entry.Address)
                                location.address1 = entry.Address.split(';')[0];
                            if (entry.City)
                                location.city = entry.City;
                            if (entry.Country)
                                location.country = entry.Country;
                            if (entry[postalCodeVar])
                                location.postalCode = entry[postalCodeVar];
                            if (entry[stateOrProvinceVar])
                                location.stateOrProvince = entry[stateOrProvinceVar];
                            addressList.address.push(location);
                        }
                        if (entry[federalRegisterNoticeVar]) {
                            idList.id.push({
                                idType: federalRegisterNoticeVar,
                                idNumber: entry[federalRegisterNoticeVar]
                            });
                        }
                        if (entry[licenceRequirementVar]) {
                            idList.id.push({
                                idType: licenceRequirementVar,
                                idNumber: entry[licenceRequirementVar]
                            });
                        }
                        if (entry[licencePolicyVar]) {
                            idList.id.push({
                                idType: licencePolicyVar,
                                idNumber: entry[licencePolicyVar]
                            });
                        }
                        if (entry[remarksVar]) {
                            idList.id.push({
                                idType: remarksVar,
                                idNumber: entry[remarksVar]
                            });
                        }
                        return {
                            authority,
                            firstName,
                            lastName,
                            sdnType,
                            addressList,
                            programList,
                            akaList,
                            idList,
                            dateOfBirthList,
                            placeOfBirthList,
                            pubDate
                        };
                    });
                    resolve(results);
                });
            })();
        });
    }
    parseUKData() {
        return new Promise((resolve, reject) => {
            const filePath = '/static/xml//UK.json';
            fs.readFile(path.join(path.resolve(), filePath), 'utf8', (err, data) => {
                const json = JSON.parse(data);
                const results = {};
                try {
                    results.entries = json.map((entity, i) => {
                        let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList, dateOfBirthList, placeOfBirthList, pubDate;
                        const name = {
                            name1: typeof entity.Name6 === 'string' ? entity.Name6 : '',
                            name2: typeof entity.name1 === 'string' ? entity.name1 : '',
                            name3: typeof entity.name2 === 'string' ? entity.name2 : '',
                            name4: typeof entity.name3 === 'string' ? entity.name3 : '',
                            name5: typeof entity.name4 === 'string' ? entity.name4 : '',
                            name6: typeof entity.name5 === 'string' ? entity.name5 : ''
                        };
                        const addresses = {
                            address1: typeof entity.Address6 === 'string' ? entity.Address6 : '',
                            address2: typeof entity.Address1 === 'string' ? entity.Address1 : '',
                            address3: typeof entity.Address2 === 'string' ? entity.Address2 : '',
                            address4: typeof entity.Address3 === 'string' ? entity.Address3 : '',
                            address5: typeof entity.Address4 === 'string' ? entity.Address4 : '',
                            address6: typeof entity.Address5 === 'string' ? entity.Address5 : ''
                        };
                        const address1 = addresses.address1 + ' ' + addresses.address2 + ' ' + addresses.address3 + ' ' + addresses.address4 + ' ' + addresses.address5 + ' ' + addresses.address6;
                        const postalCode = typeof entity.PostCode === 'string' ? entity.PostCode : '';
                        const country = typeof entity.Country === 'string' ? entity.Country : '';
                        const PhoneNumber = typeof entity.PhoneNumber === 'string' ? entity.PhoneNumber : '';
                        const Website = typeof entity.Website === 'string' ? entity.Website : '';
                        const EmailAddress = typeof entity?.EmailAddress === 'string' ? entity.EmailAddress : '';
                        const dateOfBirth = typeof entity?.Individual_DateOfBirth === 'string' ? entity.Individual_DateOfBirth : '';
                        const Individual_TownOfBirth = typeof entity?.Individual_TownOfBirth === 'string' ? entity.Individual_TownOfBirth : '';
                        const Individual_CountryOfBirth = typeof entity?.Individual_CountryOfBirth === 'string' ? entity.Individual_CountryOfBirth : '';
                        const Individual_Nationality = typeof entity?.Individual_Nationality === 'string' ? entity.Individual_Nationality : '';
                        const Individual_PassportNumber = typeof entity?.Individual_PassportNumber === 'string' ? entity.Individual_PassportNumber : '';
                        const Individual_PassportDetails = typeof entity?.Individual_PassportDetails === 'string' ? entity.Individual_PassportDetails : '';
                        const Individual_NINumber = typeof entity?.Individual_NINumber === 'string' ? entity.Individual_NINumber : '';
                        const Individual_NIDetails = typeof entity?.Individual_NIDetails === 'string' ? entity.Individual_NIDetails : '';
                        const Individual_Position = typeof entity?.Individual_Position === 'string' ? entity.Individual_Position : '';
                        const Individual_Gender = typeof entity?.Individual_Gender === 'string' ? entity.Individual_Gender : '';
                        const Entity_ParentCompany = typeof entity?.Entity_ParentCompany === 'string' ? entity.Entity_ParentCompany : '';
                        const Entity_Subsidiaries = typeof entity?.Entity_Subsidiaries === 'string' ? entity.Entity_Subsidiaries : '';
                        const Entity_BusinessRegNumber = typeof entity?.Entity_BusinessRegNumber === 'string' ? entity.Entity_BusinessRegNumber : '';
                        pubDate = Date.parse(entity?.LastUpdated) || Date.now;
                        lastName = name.name1 + ' ' + name.name2 + ' ' + name.name3 + ' ' + name.name4 + ' ' + name.name5 + ' ' + name.name6;
                        authority = 'UK';
                        sdnType = entity.GroupTypeDescription || 'Unknown';
                        idList = {
                            id: []
                        };
                        addressList = {
                            address: []
                        };
                        programList = {
                            program: []
                        };
                        akaList = {};
                        dateOfBirthList = {};
                        placeOfBirthList = {};
                        dateOfBirthList = {};
                        placeOfBirthList = {};
                        addressList.address.push({
                            address1: address1,
                            country: country,
                            postalCode: postalCode
                        });
                        programList.program.push(entity.UKSanctionsListRef || 'Generall');
                        if (PhoneNumber) {
                            idList.id.push({
                                idType: 'Phone number',
                                idNumber: PhoneNumber
                            });
                        }
                        if (Website) {
                            idList.id.push({
                                idType: 'Website',
                                idNumber: Website
                            });
                        }
                        if (EmailAddress) {
                            idList.id.push({
                                idType: 'Email',
                                idNumber: EmailAddress
                            });
                        }
                        if (dateOfBirth) {
                            idList.id.push({
                                idType: 'Date of birth',
                                idNumber: dateOfBirth
                            });
                        }
                        if (Individual_TownOfBirth) {
                            idList.id.push({
                                idType: 'Town of birth',
                                idNumber: Individual_TownOfBirth
                            });
                        }
                        if (Individual_CountryOfBirth) {
                            idList.id.push({
                                idType: 'Country of birth',
                                idNumber: Individual_CountryOfBirth
                            });
                        }
                        if (Individual_Nationality) {
                            idList.id.push({
                                idType: 'Nationality',
                                idNumber: Individual_Nationality
                            });
                        }
                        if (Individual_PassportNumber) {
                            idList.id.push({
                                idType: 'Passport number',
                                idNumber: Individual_PassportNumber
                            });
                        }
                        if (Individual_PassportDetails) {
                            idList.id.push({
                                idType: 'Passport details',
                                idNumber: Individual_PassportDetails
                            });
                        }
                        if (Individual_NINumber) {
                            idList.id.push({
                                idType: 'NIN Number',
                                idNumber: Individual_NINumber
                            });
                        }
                        if (Individual_NIDetails) {
                            idList.id.push({
                                idType: 'NID Details',
                                idNumber: Individual_NIDetails
                            });
                        }
                        if (Individual_Position) {
                            idList.id.push({
                                idType: 'Position',
                                idNumber: Individual_Position
                            });
                        }
                        if (Individual_Gender) {
                            idList.id.push({
                                idType: 'Gender',
                                idNumber: Individual_Gender
                            });
                        }
                        if (Entity_ParentCompany) {
                            idList.id.push({
                                idType: 'Parent company',
                                idNumber: Entity_ParentCompany
                            });
                        }
                        if (Entity_Subsidiaries) {
                            idList.id.push({
                                idType: 'Sub sidiaries',
                                idNumber: Entity_Subsidiaries
                            });
                        }
                        if (Entity_BusinessRegNumber) {
                            idList.id.push({
                                idType: 'Reg number',
                                idNumber: Entity_BusinessRegNumber
                            });
                        }
                        Entity_BusinessRegNumber;
                        return {
                            authority,
                            firstName,
                            lastName,
                            sdnType,
                            addressList,
                            programList,
                            akaList,
                            idList,
                            dateOfBirthList,
                            placeOfBirthList,
                            pubDate
                        };
                    });
                    resolve(results);
                }
                catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        });
    }
    ;
    parseEUData() {
        const options = {
            explicitArray: false
        };
        const filePath = '/static/xml/EU.xml';
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(path.resolve(), filePath), (err, xml) => {
                (async () => {
                    try {
                        const json = await xmljs.parseStringPromise(xml, options);
                        const results = {};
                        results.pubDate = json.export.$.generationDate;
                        const entitiesJson = json.export.sanctionEntity;
                        results.entries = entitiesJson.map((entity, i) => {
                            let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList, dateOfBirthList, placeOfBirthList, pubDate;
                            akaList = {};
                            authority = 'EU';
                            sdnType = entity?.subjectType?.$?.code;
                            addressList = {};
                            programList = {};
                            dateOfBirthList = {};
                            placeOfBirthList = {};
                            pubDate = Date.parse(entity?.$.designationDate) || results.pubDate;
                            idList = {
                                id: []
                            };
                            if (Array.isArray(entity.nameAlias)) {
                                lastName = entity.nameAlias[0].$.wholeName;
                                akaList.aka = entity.nameAlias.reduce((acc, alias) => {
                                    if (alias.$.wholeName) {
                                        acc.push({
                                            lastName: alias.$.wholeName
                                        });
                                    }
                                    return acc;
                                }, []);
                            }
                            if (entity.nameAlias.constructor === Object) {
                                lastName = entity.nameAlias.$.wholeName;
                            }
                            if (entity?.address) {
                                if (Array.isArray(entity.address)) {
                                    addressList.address = entity.address.reduce((acc, location) => {
                                        acc.push({
                                            address1: location.$.street,
                                            city: location.$.city,
                                            stateOrProvince: location.$.region,
                                            country: location.$.countryDescription,
                                            postalCode: location.$.zipCode
                                        });
                                        return acc;
                                    }, []);
                                }
                                else if (entity.address.constructor === Object) {
                                    addressList.address = {
                                        address1: entity.address.$.street,
                                        city: entity.address.$.city,
                                        stateOrProvince: entity.address.$.region,
                                        country: entity.address.$.countryDescription,
                                        postalCode: entity.address.$.zipCode
                                    };
                                }
                            }
                            if (entity?.regulation?.$?.programme) {
                                programList.program = [entity?.regulation?.$?.programme];
                            }
                            if (entity?.$?.euReferenceNumber) {
                                idList.id.push({
                                    idType: 'EU Reference Number',
                                    idNumber: entity.$.euReferenceNumber
                                });
                            }
                            if (entity?.remark) {
                                idList.id.push({
                                    idType: 'Remark',
                                    idNumber: entity?.remark
                                });
                            }
                            if (entity.citizenship) {
                                if (Array.isArray(entity.citizenship)) {
                                    idList.id = entity.citizenship.reduce((acc, location) => {
                                        if (location?.$?.countryDescription) {
                                            acc.push({
                                                idType: 'Citizenship',
                                                idNumber: location.$.countryDescription
                                            });
                                        }
                                        return acc;
                                    }, []);
                                }
                                else if (entity.citizenship.constructor === Object) {
                                    if (entity.citizenship.$?.countryDescription) {
                                        idList.id.push({
                                            idType: 'Citizenship',
                                            idNumber: entity.citizenship.$.countryDescription
                                        });
                                    }
                                }
                            }
                            if (entity.identification) {
                                if (Array.isArray(entity.identification)) {
                                    idList.id = entity.identification.reduce((acc, doc) => {
                                        if (doc?.$?.diplomatic) {
                                            acc.push({
                                                idType: 'Diplomatioc',
                                                idNumber: doc.$.diplomatic
                                            });
                                        }
                                        if (doc?.$?.number) {
                                            acc.push({
                                                idType: 'Document number',
                                                idNumber: doc.$.number
                                            });
                                        }
                                        if (doc?.$?.identificationTypeDescription) {
                                            acc.push({
                                                idType: 'Document type',
                                                idNumber: doc.$.identificationTypeDescription
                                            });
                                        }
                                        if (doc?.$?.knownExpired) {
                                            acc.push({
                                                idType: 'Known expired',
                                                idNumber: doc.$.knownExpired
                                            });
                                        }
                                        if (doc?.$?.revokedByIssuer) {
                                            acc.push({
                                                idType: 'Revoked by issuer',
                                                idNumber: doc.$.revokedByIssuer
                                            });
                                        }
                                        if (doc?.$?.countryDescription) {
                                            acc.push({
                                                idType: 'Country',
                                                idNumber: doc.$.countryDescription
                                            });
                                        }
                                        return acc;
                                    }, []);
                                }
                                else if (entity.identification.constructor === Object) {
                                    const doc = entity.identification;
                                    if (doc?.$?.diplomatic) {
                                        idList.id.push({
                                            idType: 'Diplomatioc',
                                            idNumber: doc.$.diplomatic
                                        });
                                    }
                                    if (doc?.$?.number) {
                                        idList.id.push({
                                            idType: 'Document number',
                                            idNumber: doc.$.number
                                        });
                                    }
                                    if (doc?.$?.identificationTypeDescription) {
                                        idList.id.push({
                                            idType: 'Document type',
                                            idNumber: doc.$.identificationTypeDescription
                                        });
                                    }
                                    if (doc?.$?.knownExpired) {
                                        idList.id.push({
                                            idType: 'Known expired',
                                            idNumber: doc.$.knownExpired
                                        });
                                    }
                                    if (doc?.$?.revokedByIssuer) {
                                        idList.id.push({
                                            idType: 'Revoked by issuer',
                                            idNumber: doc.$.revokedByIssuer
                                        });
                                    }
                                    if (doc?.$?.countryDescription) {
                                        idList.id.push({
                                            idType: 'Country',
                                            idNumber: doc.$.countryDescription
                                        });
                                    }
                                }
                            }
                            if (entity?.birthdate?.$?.city) {
                                idList.id.push({
                                    idType: 'City of birth',
                                    idNumber: entity.birthdate.$.city
                                });
                            }
                            if (entity?.birthdate?.$?.birthdate) {
                                idList.id.push({
                                    idType: 'Birthdate',
                                    idNumber: entity.birthdate.$.birthdate
                                });
                            }
                            if (entity?.birthdate?.$?.countryDescription) {
                                idList.id.push({
                                    idType: 'Country of birth',
                                    idNumber: entity.birthdate.$.countryDescription
                                });
                            }
                            return {
                                authority,
                                firstName,
                                lastName,
                                sdnType,
                                addressList,
                                programList,
                                akaList,
                                idList,
                                dateOfBirthList,
                                placeOfBirthList,
                                pubDate
                            };
                        });
                        resolve(results);
                    }
                    catch (error) {
                        reject(error);
                    }
                })();
            });
        });
    }
    ;
    parseUNData() {
        const url = 'https://scsanctions.un.org/resources/xml/en/consolidated.xml';
        return new Promise((resolve, reject) => {
            (async function () {
                try {
                    const options = {
                        explicitArray: false
                    };
                    const xml = await axios.get(url);
                    const json = await xmljs.parseStringPromise(xml.data, options);
                    const results = {};
                    const individualsJson = json.CONSOLIDATED_LIST.INDIVIDUALS.INDIVIDUAL;
                    const entitiesJson = json.CONSOLIDATED_LIST.ENTITIES.ENTITY;
                    const entitiesResult = entitiesJson.map((entity, i) => {
                        let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList, dateOfBirthList, placeOfBirthList, pubDate;
                        lastName = entity.FIRST_NAME;
                        authority = 'UN';
                        sdnType = 'Entity';
                        pubDate = entity.LISTED_ON || Date.now();
                        if (entity.UN_LIST_TYPE) {
                            programList = {
                                program: [entity.UN_LIST_TYPE]
                            };
                        }
                        ;
                        idList = {
                            id: []
                        };
                        addressList = {
                            address: []
                        };
                        akaList = {};
                        dateOfBirthList = {};
                        placeOfBirthList = {};
                        if (entity.ENTITY_ADDRESS) {
                            if (Array.isArray(entitiesJson.ENTITY_ADDRESS)) {
                                addressList.address = entitiesJson.ENTITY_ADDRESS.reduce((acc, location) => {
                                    acc.push({
                                        address1: location.STREET,
                                        city: location.CITY,
                                        stateOrProvince: location.STATE_PROVINCE,
                                        country: location.COUNTRY
                                    });
                                    return acc;
                                }, []);
                            }
                            else if (entity.ENTITY_ADDRESS.constructor === Object) {
                                addressList.address.push({
                                    address1: entity.ENTITY_ADDRESS.STREET,
                                    city: entity.ENTITY_ADDRESS.CITY,
                                    stateOrProvince: entity.ENTITY_ADDRESS.STATE_PROVINCE,
                                    country: entity.ENTITY_ADDRESS.COUNTRY
                                });
                            }
                        }
                        ;
                        if (entity.ENTITY_ALIAS) {
                            if (Array.isArray(entity.ENTITY_ALIAS)) {
                                akaList.aka = entity.ENTITY_ALIAS.reduce((acc, alias) => {
                                    if (alias.ALIAS_NAME) {
                                        acc.push({
                                            lastName: alias.ALIAS_NAME
                                        });
                                    }
                                    return acc;
                                }, []);
                            }
                            else if (entity.ENTITY_ALIAS.constructor === Object) {
                                if (entity.ENTITY_ALIAS.ALIAS_NAME) {
                                    akaList.aka = [{
                                            lastName: entity.ENTITY_ALIAS.ALIAS_NAME
                                        }];
                                }
                            }
                        }
                        if (entity.COMMENTS1) {
                            idList.id.push({
                                idType: 'Comment',
                                idNumber: entity.COMMENTS1
                            });
                        }
                        return {
                            authority,
                            firstName,
                            lastName,
                            sdnType,
                            addressList,
                            programList,
                            akaList,
                            idList,
                            dateOfBirthList,
                            placeOfBirthList,
                            pubDate,
                        };
                    });
                    const individualsResult = individualsJson.map((individual, i) => {
                        let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList, dateOfBirthList, placeOfBirthList, pubDate;
                        firstName = individual.FIRST_NAME;
                        lastName = individual.SECOND_NAME || individual.THIRD_NAME || individual.FIRST_NAME;
                        programList = {};
                        authority = 'UN';
                        pubDate = individual.LISTED_ON || Date.now();
                        sdnType = 'Individual';
                        programList = {};
                        akaList = {};
                        if (individual.UN_LIST_TYPE) {
                            programList = {
                                program: [individual.UN_LIST_TYPE]
                            };
                        }
                        ;
                        idList = {
                            id: []
                        };
                        akaList = {};
                        addressList = {};
                        dateOfBirthList = {};
                        placeOfBirthList = {};
                        if (individual.INDIVIDUAL_ADDRESS) {
                            if (Array.isArray(individual.INDIVIDUAL_ADDRESS)) {
                                addressList.address = individual.INDIVIDUAL_ADDRESS.reduce((acc, location) => {
                                    acc.push({
                                        address1: location.STREET,
                                        city: location.CITY,
                                        stateOrProvince: location.STATE_PROVINCE,
                                        country: location.COUNTRY
                                    });
                                    return acc;
                                }, []);
                            }
                            else if (individual.INDIVIDUAL_ADDRESS.constructor === Object) {
                                addressList = {
                                    address: {
                                        address1: individual.INDIVIDUAL_ADDRESS.STREET,
                                        city: individual.INDIVIDUAL_ADDRESS.CITY,
                                        stateOrProvince: individual.INDIVIDUAL_ADDRESS.STATE_PROVINCE,
                                        country: individual.INDIVIDUAL_ADDRESS.COUNTRY
                                    }
                                };
                            }
                        }
                        ;
                        if (individual.INDIVIDUAL_ALIAS) {
                            if (Array.isArray(individual.INDIVIDUAL_ALIAS)) {
                                akaList.aka = individual.INDIVIDUAL_ALIAS.reduce((acc, alias) => {
                                    acc.push({
                                        lastName: alias.ALIAS_NAME || '-'
                                    });
                                    return acc;
                                }, []);
                            }
                            else if (individual.INDIVIDUAL_ALIAS.constructor === Object) {
                                if (individual.INDIVIDUAL_ALIAS.ALIAS_NAME) {
                                    akaList.aka = [{
                                            lastName: individual.INDIVIDUAL_ALIAS.ALIAS_NAME
                                        }];
                                }
                            }
                        }
                        ;
                        if (individual.INDIVIDUAL_DATE_OF_BIRTH) {
                            if (Array.isArray(individual.INDIVIDUAL_DATE_OF_BIRTH)) {
                                dateOfBirthList.dateOfBirthItem = individual.INDIVIDUAL_DATE_OF_BIRTH.reduce((acc, date) => {
                                    if (date.DATE) {
                                        acc.push({
                                            dateOfBirth: date.DATE
                                        });
                                    }
                                    return acc;
                                }, []);
                            }
                            else if (individual.INDIVIDUAL_DATE_OF_BIRTH.constructor === Object) {
                                if (individual.INDIVIDUAL_DATE_OF_BIRTH.DATE) {
                                    dateOfBirthList.dateOfBirthItem = [{
                                            dateOfBirth: individual.INDIVIDUAL_DATE_OF_BIRTH.DATE
                                        }];
                                }
                            }
                        }
                        ;
                        if (individual.COMMENTS1) {
                            idList.id.push({
                                idType: 'Comment',
                                idNumber: individual.COMMENTS1
                            });
                        }
                        if (Array.isArray(individual.INDIVIDUAL_DOCUMENT)) {
                            individual.INDIVIDUAL_DOCUMENT.forEach((item) => {
                                if (item.TYPE_OF_DOCUMENT) {
                                    idList.id.push({
                                        idType: 'Type of document',
                                        idNumber: item.TYPE_OF_DOCUMENT || '-'
                                    });
                                }
                                ;
                                if (item.NUMBER) {
                                    idList.id.push({
                                        idType: 'Document number',
                                        idNumber: item.NUMBER || '-'
                                    });
                                }
                                if (item.ISSUING_COUNTRY) {
                                    idList.id.push({
                                        idType: 'Issuing country',
                                        idNumber: item.ISSUING_COUNTRY || '-'
                                    });
                                }
                                if (item.DATE_OF_ISSUE) {
                                    idList.id.push({
                                        idType: 'Date of issue',
                                        idNumber: item.DATE_OF_ISSUE || '-'
                                    });
                                }
                                if (item.CITY_OF_ISSUE) {
                                    idList.id.push({
                                        idType: 'City of issue',
                                        idNumber: item.CITY_OF_ISSUE || '-'
                                    });
                                }
                            });
                        }
                        else if (individual.INDIVIDUAL_DOCUMENT.constructor === 'object') {
                            if (individual.INDIVIDUAL_DOCUMENT.TYPE_OF_DOCUMENT) {
                                idList.id.push({
                                    idType: 'Type of document',
                                    idNumber: individual.INDIVIDUAL_DOCUMENT.TYPE_OF_DOCUMENT || '-'
                                });
                            }
                            if (individual.INDIVIDUAL_DOCUMENT.NUMBER) {
                                idList.id.push({
                                    idType: 'Document number',
                                    idNumber: individual.INDIVIDUAL_DOCUMENT.NUMBER || '-'
                                });
                            }
                            if (individual.INDIVIDUAL_DOCUMENT.ISSUING_COUNTRY) {
                                idList.id.push({
                                    idType: 'Issuing country',
                                    idNumber: individual.INDIVIDUAL_DOCUMENT.ISSUING_COUNTRY || '-'
                                });
                            }
                            if (individual.INDIVIDUAL_DOCUMENT.DATE_OF_ISSUE) {
                                idList.id.push({
                                    idType: 'Date of issue',
                                    idNumber: individual.INDIVIDUAL_DOCUMENT.DATE_OF_ISSUE || '-'
                                });
                            }
                            if (individual.INDIVIDUAL_DOCUMENT.CITY_OF_ISSUE) {
                                idList.id.push({
                                    idType: 'City of issue',
                                    idNumber: individual.INDIVIDUAL_DOCUMENT.CITY_OF_ISSUE || '-'
                                });
                            }
                        }
                        return {
                            authority,
                            firstName,
                            lastName,
                            sdnType,
                            addressList,
                            programList,
                            akaList,
                            idList,
                            dateOfBirthList,
                            placeOfBirthList,
                            pubDate
                        };
                    });
                    results.pubDate = json.CONSOLIDATED_LIST.$.dateGenerated;
                    results.entries = [...individualsResult, ...entitiesResult];
                    resolve(results);
                }
                catch (err) {
                    reject(err);
                }
            })();
        });
    }
    ;
    parseOFACData() {
        const SDN = 'https://www.treasury.gov/ofac/downloads/sdn.xml';
        const NONSDN = 'https://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml';
        return new Promise((resolve, reject) => {
            axios.all([axios.get(NONSDN), axios.get(SDN),]).then(axios.spread((nonSdnDataXml, sdnDataXml) => {
                (async () => {
                    const options = {
                        explicitArray: false
                    };
                    const nonSdnJson = await xmljs.parseStringPromise(nonSdnDataXml.data, options);
                    const sdnJson = await xmljs.parseStringPromise(sdnDataXml.data, options);
                    const data = {};
                    const nonSdnCount = parseInt(nonSdnJson?.sdnList?.publshInformation?.Record_Count) || 0;
                    data.entitiesCount = nonSdnCount;
                    data.pubDate = nonSdnJson?.sdnList?.publshInformation?.Publish_Date;
                    nonSdnJson?.sdnList?.sdnEntry?.map((item) => {
                        item.authority = 'OFAC';
                        item.pubDate = data.pubDate;
                        return item;
                    });
                    sdnJson?.sdnList?.sdnEntry?.map((item) => {
                        item.authority = 'OFAC';
                        item.pubDate = data.pubDate;
                        return item;
                    });
                    data.entries = [...nonSdnJson.sdnList.sdnEntry, ...sdnJson.sdnList.sdnEntry];
                    resolve(data);
                })();
            })).catch(err => {
                reject(err);
            });
        });
    }
    ;
    INSERT_SANCTIONS() {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const OFACsanctions = await this.parseOFACData();
                    const UNSanctions = await this.parseUNData();
                    const EUSanctions = await this.parseEUData();
                    const UKSanctions = await this.parseUKData();
                    const BISSanctions = await this.parseBISData();
                    const allSanctions = [
                        ...OFACsanctions.entries,
                        ...UNSanctions.entries,
                        ...EUSanctions.entries,
                        ...UKSanctions.entries,
                        ...BISSanctions.entries
                    ];
                    const rows = await Promise.all(allSanctions.map(async (sanction, i) => {
                        const uid = i;
                        const { firstName = '', lastName, sdnType, addressList, programList, akaList, idList, authority, dateOfBirthList, placeOfBirthList, citizenshipList = {}, pubDate } = sanction;
                        // switch (authority) {
                        //     case 'OFAC':
                        //         pubDate = Date.parse(OFACsanctions.pubDate);
                        //         break;
                        //     case 'UN':
                        //         pubDate = Date.parse(UNSanctions.pubDate);
                        //         break;
                        //     case 'EU':
                        //         pubDate = Date.parse(EUSanctions.pubDate);
                        //         break;
                        //     case 'UK':
                        //         pubDate = Date.parse(EUSanctions.pubDate);
                        //         break
                        // }
                        return await SanctionEntity.create({
                            uid: uid,
                            firstName: firstName ? firstName.toUpperCase() : '',
                            lastName: lastName.toUpperCase(),
                            fullName: `${firstName || ''} ${lastName}`.toUpperCase(),
                            type: sdnType ? sdnType : null,
                            latestUpdate: pubDate || '08/02/2022',
                            authority: authority
                        }).then((data) => {
                            if (dateOfBirthList?.dateOfBirthItem) {
                                if (Array.isArray(dateOfBirthList.dateOfBirthItem)) {
                                    SanctionInfo.bulkCreate(dateOfBirthList.dateOfBirthItem.map((detail) => {
                                        return {
                                            sanction: uid,
                                            key: 'Date of birth',
                                            value: detail?.dateOfBirth
                                        };
                                    }));
                                }
                                else if (dateOfBirthList.dateOfBirthItem.constructor === Object) {
                                    SanctionInfo.create({
                                        sanction: uid,
                                        key: 'Date of birth',
                                        value: dateOfBirthList?.dateOfBirthItem?.dateOfBirth
                                    });
                                }
                            }
                        }).then((data) => {
                            if (placeOfBirthList?.placeOfBirthItem) {
                                if (Array.isArray(placeOfBirthList.placeOfBirthItem)) {
                                    SanctionInfo.bulkCreate(placeOfBirthList.placeOfBirthItem.map((detail) => {
                                        return {
                                            sanction: uid,
                                            key: 'Place of birth',
                                            value: detail?.placeOfBirth
                                        };
                                    }));
                                }
                                else if (placeOfBirthList.placeOfBirthItem.constructor === Object) {
                                    SanctionInfo.create({
                                        sanction: uid,
                                        key: 'Place of birth',
                                        value: placeOfBirthList?.placeOfBirthItem?.placeOfBirth
                                    });
                                }
                            }
                        }).then((data) => {
                            if (programList?.program) {
                                if (Array.isArray(programList.program)) {
                                    SanctionProgram.bulkCreate(programList.program.map((programName) => {
                                        return {
                                            sanction: uid,
                                            name: programName
                                        };
                                    }));
                                }
                                else if (typeof programList.program === 'string') {
                                    SanctionProgram.create({
                                        sanction: uid,
                                        name: programList.program
                                    });
                                }
                            }
                        }).then((data) => {
                            if (akaList?.aka) {
                                if (Array.isArray(akaList.aka)) {
                                    if (akaList.aka.length) {
                                        SanctionAlias.bulkCreate(akaList.aka.map((alias) => {
                                            return {
                                                sanction: uid,
                                                firstName: alias.firstName || null,
                                                lastName: alias.lastName
                                            };
                                        }));
                                    }
                                }
                                else if (akaList.aka.constructor === Object) {
                                    SanctionAlias.create({
                                        sanction: uid,
                                        firstName: akaList.aka.firstName || null,
                                        lastName: akaList.aka.lastName
                                    });
                                }
                            }
                        }).then((data) => {
                            if (addressList?.address) {
                                if (Array.isArray(addressList.address)) {
                                    SanctionAddress.bulkCreate(addressList.address.map((location) => {
                                        return {
                                            sanction: uid,
                                            address1: location.address1 || null,
                                            address2: location.address2 || null,
                                            stateOrProvince: location.stateOrProvince || null,
                                            city: location.city || null,
                                            postalCode: location.postalCode || null,
                                            country: location.country || null
                                        };
                                    }));
                                }
                                else if (addressList.address.constructor === Object) {
                                    SanctionAddress.create({
                                        sanction: uid,
                                        address1: addressList?.address?.address1 || null,
                                        address2: addressList?.address?.address2 || null,
                                        stateOrProvince: addressList?.address?.stateOrProvince || null,
                                        city: addressList?.address?.city || null,
                                        postalCode: addressList?.address?.postalCode || null,
                                        country: addressList?.address?.country || null
                                    });
                                }
                            }
                        }).then((data) => {
                            if (Array.isArray(idList?.id)) {
                                SanctionInfo.bulkCreate(idList.id.map((detail) => {
                                    return {
                                        sanction: uid,
                                        key: detail?.idType,
                                        value: detail?.idNumber
                                    };
                                }));
                            }
                            else if (idList?.id?.idType && idList?.id?.idNumber) {
                                SanctionInfo.create({
                                    sanction: uid,
                                    key: idList?.id?.idType,
                                    value: idList?.id?.idNumber
                                });
                            }
                            else if (idList?.id?.idType && idList?.id?.idCountry) {
                                SanctionInfo.create({
                                    sanction: uid,
                                    key: 'Document Country',
                                    value: idList?.id?.idCountry
                                });
                            }
                        }).catch((err) => {
                            reject(err);
                        });
                    }));
                    resolve(rows);
                }
                catch (err) {
                    console.log(err);
                    reject(err);
                }
            })();
        });
    }
    async SELECT_SANCTIONS(query) {
        return new Promise((resolve, reject) => {
            const target = query.target;
            SanctionEntity.findAll({
                limit: query.limit,
                offset: ((query.page - 1) * query.limit),
                where: {
                    fullName: {
                        [Op.like]: `%${target}%`
                    }
                },
                include: [SanctionProgram, SanctionAddress, SanctionInfo, SanctionAlias]
            }).then(async (data) => {
                const count = await SanctionEntity.count({
                    where: {
                        fullName: {
                            [Op.like]: `%${target}%`
                        }
                    }
                });
                const response = {
                    entities: data,
                    count: count
                };
                resolve(response);
            }).catch((err) => reject(err));
        });
    }
    ;
    async updateSanctions() {
        console.log('Deleting Addresses table');
        await SanctionAddress.destroy({
            where: {}
        }).then((data) => {
            console.log('Deleting aliases table');
            return SanctionAlias.destroy({
                where: {}
            });
        }).then((data) => {
            console.log('Deleting programs table');
            return SanctionProgram.destroy({
                where: {}
            });
        }).then((data) => {
            console.log('Deleting Infos table');
            return SanctionInfo.destroy({
                where: {}
            });
        }).then((data) => {
            console.log('Deleting sanctions table');
            return SanctionEntity.destroy({
                where: {}
            });
        }).then((data) => {
            console.log('Filling database with new data');
            return this.INSERT_SANCTIONS();
        }).catch((err) => {
            console.log(err);
            console.log('An error occured while cleaning the database');
        });
    }
}
