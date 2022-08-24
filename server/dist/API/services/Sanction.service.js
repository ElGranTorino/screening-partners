import axios from "axios";
import xmljs from "xml2js";
import { Op } from "sequelize";
import SanctionAddress from "../../models/SanctionAddress.model.js";
import SanctionAlias from "../../models/SanctionAlias.model.js";
import SanctionEntity from "../../models/SanctionEntity.model.js";
import SanctionInfo from "../../models/SanctionInfo.model.js";
import SanctionProgram from "../../models/SanctionProgram.model.js";
import { transliterate } from "transliteration";
import path from "path";
import fs from "fs";
// interface IOFACSanction {
//     uuid: string,
//     firstName?: string,
//     lastName: string,
//     sdnType: string,
//     programList: {
//       program: Array<string> | string
//     },
//     akaList: {
//       aka?: Array<any>
//     }
// };
const operatorsAliases = {
    $eq: Op.eq,
    $or: Op.or,
    $like: Op.like
};
export default class SanctionService {
    parseUEData() {
        const options = {
            explicitArray: false // Preventing xml2js from wraping every string into array
        };
        const filePath = '/static/xml/EU.xml';
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(path.resolve(), filePath), (err, xml) => {
                (async () => {
                    const json = await xmljs.parseStringPromise(xml, options);
                    const results = {};
                    results.pubDate = json.export.$.generationDate;
                    const entitiesJson = json.export.sanctionEntity;
                    results.entries = entitiesJson.map((entity, i) => {
                        let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList;
                        if (entity.nameAlias.constructor === Array) {
                            lastName = entity.nameAlias[0].$.wholeName; // In database lastName must always be specified
                        }
                        if (entity.nameAlias.constructor === Object) {
                            lastName = entity.nameAlias.$.wholeName; // In database lastName must always be specified
                        }
                        authority = 'EU';
                        sdnType = entity?.subjectType?.$?.code;
                        addressList = {};
                        idList = {
                            id: []
                        };
                        if (entity?.address) {
                            if (entity.address.constructor === Object) {
                                addressList.address = {
                                    address1: entity.address.$.street,
                                    city: entity.address.$.city,
                                    stateOrProvince: entity.address.$.region,
                                    country: entity.address.$.countryDescription,
                                    postalCode: entity.address.$.zipCode,
                                };
                            }
                            if (entity.address.constructor === Array) {
                                addressList.address = entity.address.reduce((acc, location) => {
                                    acc.push({
                                        address1: location.$.street,
                                        city: location.$.city,
                                        stateOrProvince: location.$.region,
                                        country: location.$.countryDescription,
                                        postalCode: location.$.zipCode,
                                    });
                                    return acc;
                                }, []);
                            }
                        }
                        if (entity?.citizenship?.$?.countryDescription) {
                            idList.id.push({
                                idType: 'Citizenship',
                                idNumber: entity.citizenship.$.countryDescription
                            });
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
                            idList
                        };
                    });
                    resolve(results);
                })();
            });
        });
    }
    parseUNData() {
        const url = 'https://scsanctions.un.org/resources/xml/en/consolidated.xml';
        return new Promise((resolve, reject) => {
            (async function () {
                try {
                    const options = {
                        explicitArray: false // Preventing xml2js from wraping every string into array
                    };
                    const xml = await axios.get(url);
                    const json = await xmljs.parseStringPromise(xml.data, options);
                    const results = {};
                    const individualsJson = json.CONSOLIDATED_LIST.INDIVIDUALS.INDIVIDUAL;
                    const entitiesJson = json.CONSOLIDATED_LIST.ENTITIES.ENTITY;
                    const entitiesResult = entitiesJson.map((entity, i) => {
                        let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList;
                        lastName = entity.FIRST_NAME; // In database lastName must always be specified
                        authority = 'UN';
                        sdnType = 'Entity';
                        if (entity.UN_LIST_TYPE) {
                            programList = {
                                program: [entity.UN_LIST_TYPE]
                            };
                        }
                        ;
                        idList = {};
                        addressList = {};
                        akaList = {};
                        if (entity.ENTITY_ADDRESS) {
                            if (entity.ENTITY_ADDRESS instanceof Object) {
                                addressList = {
                                    address: {
                                        address1: entity.ENTITY_ADDRESS.STREET,
                                        city: entity.ENTITY_ADDRESS.CITY,
                                        stateOrProvince: entity.ENTITY_ADDRESS.STATE_PROVINCE,
                                        country: entity.ENTITY_ADDRESS.COUNTRY,
                                    }
                                };
                            }
                            // if (entity.ENTITY_ADDRESS instanceof Array) {
                            //     addressList = entity.ENTITY_ADDRESS.map((location) => {
                            //         return {
                            //             address1: location.STREET,
                            //             city: location.CITY,
                            //             stateOrProvince: location.STATE_PROVINCE,
                            //             country: location.COUNTRY,
                            //         }
                            //     });
                            // }
                        }
                        ;
                        if (entity.ENTITY_ALIAS) {
                            if (entity.ENTITY_ALIAS.constructor === Object) {
                                if (entity.ENTITY_ALIAS.ALIAS_NAME) {
                                    akaList.aka = [{
                                            lastName: entity.ENTITY_ALIAS.ALIAS_NAME
                                        }];
                                }
                            }
                            if (entity.ENTITY_ALIAS.constructor === Array) {
                                akaList.aka = entity.ENTITY_ALIAS.reduce((acc, alias) => {
                                    if (alias.ALIAS_NAME) {
                                        acc.push({
                                            lastName: alias.ALIAS_NAME
                                        });
                                    }
                                    return acc;
                                }, []);
                            }
                        }
                        if (entity.COMMENTS1) {
                            idList.id = [{
                                    idType: 'Comment',
                                    idNumber: entity.COMMENTS1
                                }];
                        }
                        return {
                            authority,
                            firstName,
                            lastName,
                            sdnType,
                            addressList,
                            programList,
                            akaList,
                            idList
                        };
                    });
                    const individualsResult = individualsJson.map((individual, i) => {
                        let authority, firstName, lastName, sdnType, addressList, programList, akaList, idList;
                        firstName = individual.FIRST_NAME; // In database lastName must always be specified
                        lastName = individual.SECOND_NAME || individual.THIRD_NAME || individual.FIRST_NAME;
                        programList = {};
                        authority = 'UN';
                        sdnType = 'Individual';
                        programList = {};
                        akaList = {};
                        if (individual.UN_LIST_TYPE) {
                            programList = {
                                program: [individual.UN_LIST_TYPE]
                            };
                        }
                        ;
                        idList = {};
                        akaList = {};
                        addressList = {};
                        if (individual.INDIVIDUAL_ADDRESS.COUNTRY ||
                            individual.INDIVIDUAL_ADDRESS.CITY ||
                            individual.INDIVIDUAL_ADDRESS.STATE_PROVINCE ||
                            individual.INDIVIDUAL_ADDRESS.STREET) {
                            if (individual.INDIVIDUAL_ADDRESS instanceof Object) {
                                addressList = {
                                    address: {
                                        address1: individual.INDIVIDUAL_ADDRESS.STREET,
                                        city: individual.INDIVIDUAL_ADDRESS.CITY,
                                        stateOrProvince: individual.INDIVIDUAL_ADDRESS.STATE_PROVINCE,
                                        country: individual.INDIVIDUAL_ADDRESS.COUNTRY,
                                    }
                                };
                            }
                            // if (individual.INDIVIDUAL_ADDRESS instanceof Array) {
                            //     addressList = individual.INDIVIDUAL_ADDRESS.map((location) => {
                            //         return {
                            //             address1: location.STREET,
                            //             city: location.CITY,
                            //             stateOrProvince: location.STATE_PROVINCE,
                            //             country: location.COUNTRY,
                            //         }
                            //     });
                            // }
                        }
                        ;
                        if (individual.INDIVIDUAL_ALIAS) {
                            if (individual.INDIVIDUAL_ALIAS.constructor === Object) {
                                if (individual.INDIVIDUAL_ALIAS.ALIAS_NAME) {
                                    akaList.aka = [{
                                            lastName: individual.INDIVIDUAL_ALIAS.ALIAS_NAME
                                        }];
                                }
                            }
                            if (individual.INDIVIDUAL_ALIAS.constructor === Array) {
                                akaList.aka = individual.INDIVIDUAL_ALIAS.reduce((acc, alias) => {
                                    if (alias.ALIAS_NAME) {
                                        acc.push({
                                            lastName: alias.ALIAS_NAME
                                        });
                                    }
                                    return acc;
                                }, []);
                            }
                        }
                        ;
                        if (individual.COMMENTS1) {
                            idList.id = [{
                                    idType: 'Comment',
                                    idNumber: individual.COMMENTS1
                                }];
                        }
                        // if (individual?.INDIVIDUAL_DATE_OF_BIRTH?.DATE) {
                        //     idList.id.push({
                        //         idType: 'Date of birth',
                        //         idNumber: individual?.INDIVIDUAL_DATE_OF_BIRTH?.DATE
                        //     })
                        // }
                        // if (individual?.INDIVIDUAL_PLACE_OF_BIRTH?.COUNTRY) {
                        //     idList.id.push({
                        //         idType: 'Place of birth',
                        //         idNumber: individual?.INDIVIDUAL_PLACE_OF_BIRTH?.COUNTRY
                        //     })
                        // }
                        return {
                            authority,
                            firstName,
                            lastName,
                            sdnType,
                            addressList,
                            programList,
                            akaList,
                            idList
                        };
                    });
                    results.pubDate = json.CONSOLIDATED_LIST.$.dateGenerated;
                    results.entries = [
                        ...individualsResult,
                        ...entitiesResult
                    ];
                    resolve(results);
                }
                catch (err) {
                    reject(err);
                }
            })();
        });
    }
    parseOFACData() {
        const SDN = 'https://www.treasury.gov/ofac/downloads/sdn.xml';
        const NONSDN = 'https://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml';
        const EU = 'https://data.europa.eu/data/datasets/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions?locale=en';
        // const EU = 'https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4tMjAxNw'
        return new Promise((resolve, reject) => {
            axios.all([
                // axios.get(SDN), //SDN list
                axios.get(NONSDN) // Non SDN list
            ])
                .then(axios.spread((nonSdnDataXml) => {
                (async () => {
                    const options = {
                        explicitArray: false // Preventing xml2js from wraping every string into array
                    };
                    // Parsing json from xml data
                    const nonSdnJson = await xmljs.parseStringPromise(nonSdnDataXml.data, options);
                    const data = {}; // Result object
                    // Getting total length of SDN and NonSDN sanctions lists
                    const nonSdnCount = parseInt(nonSdnJson?.sdnList?.publshInformation?.Record_Count) || 0;
                    data.entitiesCount = nonSdnCount;
                    data.pubDate = nonSdnJson?.sdnList?.publshInformation?.Publish_Date;
                    // Pushing all SDN and NonSDN sanctions data into one array
                    nonSdnJson?.sdnList?.sdnEntry?.map((item) => {
                        item.authority = 'OFAC';
                        return item;
                    });
                    data.entries = [
                        ...nonSdnJson.sdnList.sdnEntry
                    ];
                    resolve(data);
                })();
            })).catch(err => {
                reject(err);
            });
        });
    }
    INSERT_SANCTIONS() {
        return new Promise((resolve, rejecct) => {
            (async () => {
                try {
                    const OFACsanctions = await this.parseOFACData(); // Getting OFAC`s JSON data
                    const UNSanctions = await this.parseUNData();
                    const EUSanctions = await this.parseUEData();
                    const allSanctions = [
                        ...OFACsanctions.entries,
                        ...UNSanctions.entries,
                        ...EUSanctions.entries
                    ];
                    const rows = await Promise.all(allSanctions.map(async (sanction, i) => {
                        const uid = i;
                        const { firstName, lastName, sdnType, addressList, programList, akaList, idList, authority } = sanction;
                        let pubDate;
                        switch (authority) {
                            case 'OFAC':
                                pubDate = Date.parse(OFACsanctions.pubDate);
                                break;
                            case 'UN':
                                pubDate = Date.parse(UNSanctions.pubDate);
                                break;
                            case 'EU':
                                pubDate = Date.parse(EUSanctions.pubDate);
                                break;
                        }
                        return await SanctionEntity.create({
                            uid: uid,
                            firstName: firstName ? firstName.toUpperCase() : null,
                            lastName: lastName.toUpperCase(),
                            type: sdnType ? sdnType : null,
                            latestUpdate: pubDate,
                            authority: authority
                        }).then((data) => {
                            if (programList?.program) {
                                // Sanction program might be a string or an
                                (async () => {
                                    if (programList.program instanceof Array) {
                                        await SanctionProgram.bulkCreate(programList.program.map((programName) => {
                                            return {
                                                sanction: uid,
                                                name: programName
                                            };
                                        }));
                                    }
                                    if (typeof programList.program === 'string') {
                                        await SanctionProgram.create({
                                            sanction: uid,
                                            name: programList.program
                                        });
                                    }
                                })();
                            }
                        }).then((data) => {
                            if (akaList?.aka) {
                                (async () => {
                                    if (akaList.aka instanceof Array) {
                                        await SanctionAlias.bulkCreate(akaList.aka.map((alias) => {
                                            return {
                                                sanction: uid,
                                                firstName: alias.firstName || null,
                                                lastName: alias.lastName
                                            };
                                        }));
                                    }
                                    ;
                                })();
                            }
                        }).then((data) => {
                            if (addressList?.address) {
                                (async () => {
                                    if (addressList.address.constructor === Array) {
                                        await SanctionAddress.bulkCreate(addressList.address.map((location) => {
                                            return {
                                                sanction: uid,
                                                address1: location.address1 || null,
                                                address2: location.address2 || null,
                                                stateOrProvince: location.stateOrProvince || null,
                                                city: location.city || null,
                                                postalCode: location.postalCode || null,
                                                country: location.country || null,
                                            };
                                        }));
                                    }
                                    if (addressList.address.constructor === Object) {
                                        await SanctionAddress.create({
                                            sanction: uid,
                                            address1: addressList?.address?.address1 || null,
                                            address2: addressList?.address?.address2 || null,
                                            stateOrProvince: addressList?.address?.stateOrProvince || null,
                                            city: addressList?.address?.city || null,
                                            postalCode: addressList?.address?.postalCode || null,
                                            country: addressList?.address?.country || null,
                                        });
                                    }
                                })();
                            }
                        }).then((data) => {
                            (async () => {
                                if (idList?.id) {
                                    if (idList?.id.constructor === Array) {
                                        await SanctionInfo.bulkCreate(idList.id.map((detail) => {
                                            return {
                                                sanction: uid,
                                                key: detail?.idType,
                                                value: detail?.idNumber,
                                            };
                                        }));
                                    }
                                    else if (idList.id.constuctor === Object) {
                                        await SanctionInfo.create({
                                            sanction: uid,
                                            key: idList?.id?.idType,
                                            value: idList?.id?.idNumber,
                                        });
                                    }
                                }
                                else {
                                }
                            })();
                        }).catch((err) => {
                            rejecct(err);
                        });
                    }));
                    resolve(rows);
                }
                catch (err) {
                    rejecct(err);
                }
            })();
        });
    }
    async SELECT_SANCTIONS(query) {
        return new Promise((resolve, reject) => {
            const target = transliterate(query.target);
            SanctionEntity.findAll({
                limit: query.limit,
                offset: ((query.page - 1) * query.limit),
                // where: {lastName: "JOINT STOCK COMMERCIAL BANK NOVIKOMBANK"},
                where: {
                    [Op.or]: [{
                            lastName: {
                                [Op.like]: `%${target}%`
                            }
                        }, {
                            firstName: {
                                [Op.like]: `%${target}%`
                            }
                        }]
                },
                include: [SanctionProgram, SanctionAddress, SanctionInfo, SanctionAlias]
            })
                .then(async (data) => {
                const count = await SanctionEntity.count({
                    where: {
                        [Op.or]: [{
                                lastName: {
                                    [Op.like]: `%${target}%`
                                }
                            }, {
                                firstName: {
                                    [Op.like]: `%${target}%`
                                }
                            }]
                    }
                });
                const response = {
                    entities: data,
                    count: count
                };
                resolve(response);
            })
                .catch((err) => reject(err));
        });
    }
    removeAllSanctions() {
        return {};
    }
}
