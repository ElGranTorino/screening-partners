import axios from "axios";
import { uuid } from "uuidv4";
import xmljs from "xml2js";
import Sequelize from "sequelize";
import {Op} from "sequelize";
import SanctionAddress from "../../models/SanctionAddress.model.js"
import SanctionAlias from "../../models/SanctionAlias.model.js"
import SanctionEntity from "../../models/SanctionEntity.model.js"
import SanctionInfo from "../../models/SanctionInfo.model.js"
import SanctionProgram from "../../models/SanctionProgram.model.js"

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
}
export default class SanctionService {
  private parseOFACData(): Promise<any> {
    const SDN = 'https://www.treasury.gov/ofac/downloads/sdn.xml'
    const NONSDN = 'https://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml'
    
    return new Promise((resolve, reject) => {

        // !!!PRODUICTION CODE!!!
        // axios.all([
        //   // axios.get(SDN), 
        //   // axios.get(SDN), //SDN list
        //   axios.get(NONSDN) // Non SDN list
        // ])
        // .then(axios.spread((nonSdnDataXml, sdnDataXml) => {
        //   (async () => {
        //     const options = {
        //       explicitArray : false // Preventing xml2js from wraping every string into array
        //     }

        //     // Parsing json from xml data
        //     const sdnJson = await xmljs.parseStringPromise(sdnDataXml.data, options);
        //     const nonSdnJson = await xmljs.parseStringPromise(nonSdnDataXml.data, options);

        //     const data: any = {} // Result object

        //     // Getting total length of SDN and NonSDN sanctions lists
        //     const [sdnCont, nonSdnCount] = [
        //       parseInt(sdnJson.sdnList.publshInformation.Record_Count) || 0,
        //       parseInt(nonSdnJson.sdnList.publshInformation.Record_Count) || 0
        //     ]

        //     data.entitiesCount = sdnCont + nonSdnCount

        //     data.pubDate = sdnJson.sdnList.publshInformation.Publish_Date

        //     // Pushing all SDN and NonSDN sanctions data into one array
        //     data.entries = [
        //       ...sdnJson.sdnList.sdnEntry,
        //       ...nonSdnJson.sdnList.sdnEntry
        //     ]
            
        //     resolve(data)
        //   })();
        // })).catch(err => console.log(err));
        
        axios.all([
          // axios.get(SDN), //SDN list
          axios.get(NONSDN) // Non SDN list
        ])
        .then(axios.spread((nonSdnDataXml) => {
          (async () => {
            const options = {
              explicitArray : false // Preventing xml2js from wraping every string into array
            }

            // Parsing json from xml data
            const nonSdnJson = await xmljs.parseStringPromise(nonSdnDataXml.data, options);

            const data: any = {} // Result object

            // Getting total length of SDN and NonSDN sanctions lists
            const nonSdnCount = 
              parseInt(nonSdnJson.sdnList.publshInformation.Record_Count) || 0
            

            data.entitiesCount = nonSdnCount

            data.pubDate = nonSdnJson.sdnList.publshInformation.Publish_Date

            // Pushing all SDN and NonSDN sanctions data into one array
            data.entries = [
              ...nonSdnJson.sdnList.sdnEntry
            ]
            
            resolve(data)
          })();
        })).catch(err => console.log(err));
    })
  }
  public INSERT_SANCTIONS(): any {
    
    return new Promise((resolve, rejecct) => {
      (async () => {

        try {
          const OFACsanctions = await this.parseOFACData();
          const rows = await Promise.all(OFACsanctions.entries.map(async (sanction) => {
            const { uid, firstName, lastName, sdnType, addressList, dateOfBirthList, placeOfBirthList, programList, akaList, idList } = sanction;
            return await SanctionEntity.create({
              uid: uid,
              firstName: firstName ? firstName : null,
              lastName: lastName,
              type: sdnType ? sdnType : null,
              latestUpdate: Date.parse(OFACsanctions.pubDate),
            }).then(async (data) => {
              if(programList?.program){
                if(programList.program instanceof Array) {
                  await SanctionProgram.bulkCreate(programList.program.map((programName) => {
                    return  {
                      sanction: uid,
                      name: programName
                    }
                  }))
                } else if (typeof programList.program === 'string') {
                  await SanctionProgram.create({
                    sanction: uid,
                    name: programList.program
                  })
                }
              }
            }).then(async (data) => {
              if(akaList?.aka) {
                if(akaList.aka instanceof Array) {
                  await SanctionAlias.bulkCreate(akaList.aka.map((alias) => {
                    return  {
                      sanction: uid,
                      firstName: alias.firstName || null,
                      lastName: alias.lastName
                    }
                  }))
                } else if (typeof akaList.aka === 'string') {
                  await SanctionAlias.create({
                    sanction: uid,
                    firstName: akaList.aka.firstName || null,
                    lastName: akaList.aka.lastName
                  })
                }
              }
            }).then(async (data) => {
              if(addressList?.address) {
                if(addressList.address instanceof Array) {
                  await SanctionAddress.bulkCreate(addressList.address.map((location) => {
                    return  {
                      sanction: uid,
                      address1: location.address1 || null,
                      address2: location.address2 || null,
                      stateOrProvince: location.stateOrProvince || null,
                      city: location.city || null,
                      postalCode: location.postalCode || null,
                      country: location.country || null,
                    }
                  }))
                } else if(addressList.address instanceof Object) {
                  await SanctionAddress.create({
                      sanction: uid,
                      address1: addressList?.address?.address1 || null,
                      address2: addressList?.address?.address2 || null,
                      stateOrProvince: addressList?.address?.stateOrProvince || null,
                      city: addressList?.address?.city || null,
                      postalCode: addressList?.address?.postalCode || null,
                      country: addressList?.address?.country || null,
                  })
                }
              }
            }).then(async (data) => {
              if(idList?.id) {
                if(idList.id instanceof Array) {
                  await SanctionInfo.bulkCreate(idList.id.map((detail) => {
                    return  {
                      sanction: uid,
                      key: detail.idType,
                      value: detail.idNumber,
                    }
                  }))
                } else if(idList.id instanceof Object) {
                  await SanctionInfo.create({
                      sanction: uid,
                      key: idList?.id?.idType,
                      value: idList?.id?.idNumber,
                  })
                }
              }
            }).catch((err) => {
              console.log(err)
            })
          }));
          resolve(rows)

        } catch (err) {
          rejecct(err)
        }

        
      })();
    })
  }
  public SELECT_SANCTIONS(query: string): Promise<any>{
    return new Promise((resolve, reject) => {
      resolve (
        SanctionEntity.findAll({
          limit: 50,
          // where: {lastName: "JOINT STOCK COMMERCIAL BANK NOVIKOMBANK"},
          where: {
            [Op.or]: [{lastName: {[Op.like]: `%${query}%`}}, {firstName: {[Op.like]: `%${query}%`}}]
          },
          include: [SanctionProgram, SanctionAddress, SanctionInfo, SanctionAlias]
        }).catch((err) => console.log(err))
      )
    })
  }
  removeAllSanctions(): object{
    return {}
  }
}


// This is how a single Sanction entity looks like when we get it from home.treasury.gov


// {
//   "uid": "18287",
//   "lastName": "VEB ENGINEERING LLC",
//   "sdnType": "Entity",
//   "remarks": "For more information on directives, please visit the following link: http://www.treasury.gov/resource-center/sanctions/Programs/Pages/ukraine.aspx#directives.; (Linked To: STATE CORPORATION BANK FOR DEVELOPMENT AND FOREIGN ECONOMIC AFFAIRS VNESHECONOMBANK)",
//   "programList": {
//       "program": [
//           "UKRAINE-EO13662",
//           "RUSSIA-EO14024"
//       ]
//   },
//   "idList": {
//       "id": [
//           {
//               "uid": "24701",
//               "idType": "Registration Number",
//               "idNumber": "1107746181674",
//               "idCountry": "Russia"
//           },
//           {
//               "uid": "24702",
//               "idType": "Tax ID No.",
//               "idNumber": "7708715560",
//               "idCountry": "Russia"
//           },
//           {
//               "uid": "117561",
//               "idType": "Executive Order 13662 Directive Determination -",
//               "idNumber": "Subject to Directive 1"
//           },
//           {
//               "uid": "117544",
//               "idType": "Website",
//               "idNumber": "vebeng.ru"
//           },
//           {
//               "uid": "146610",
//               "idType": "Organization Established Date",
//               "idNumber": "11 Mar 2010"
//           },
//           {
//               "uid": "151167",
//               "idType": "Secondary sanctions risk:",
//               "idNumber": "Ukraine-/Russia-Related Sanctions Regulations, 31 CFR 589.201 and/or 589.209"
//           }
//       ]
//   },
//   "akaList": {
//       "aka": [
//           {
//               "uid": "28285",
//               "type": "a.k.a.",
//               "category": "strong",
//               "lastName": "OOO VEB INZHINIRING"
//           },
//           {
//               "uid": "28286",
//               "type": "a.k.a.",
//               "category": "strong",
//               "lastName": "OBSHCHESTVO S OGRANICHENNOI OTVETSTVENNOSTYU VEB INZHINIRING"
//           },
//           {
//               "uid": "55043",
//               "type": "a.k.a.",
//               "category": "strong",
//               "lastName": "VEB ENGINEERING LIMITED LIABILITY COMPANY"
//           },
//           {
//               "uid": "55044",
//               "type": "a.k.a.",
//               "category": "strong",
//               "lastName": "OOO VEB ENGINEERING"
//           }
//       ]
//   },
//   "addressList": {
//       "address": [
//           {
//               "uid": "27670",
//               "address1": "d. 9 prospekt Akademika Sakharova",
//               "city": "Moscow",
//               "postalCode": "107996",
//               "country": "Russia"
//           },
//           {
//               "uid": "52533",
//               "address1": "Per. Lyalin D. 19, Korpus 1, Pom. XXIV, Kom 11",
//               "city": "Moscow",
//               "postalCode": "101000",
//               "country": "Russia"
//           }
//       ]
//   }
// }


// public insertSanctions(): any {
//   return new Promise((resolve, reject) => {
//       this.parseSanctionsData()
//           .then((sanctions) => {
//               sanctions.forEach((sanction) => {
//                   // Getting data parsed from xml
//                   const {uid, lastName, firstName, sdnType, programList, idList, akaList, addressList} = sanction;

//                   // Creating entity of sanction. Entity may not have key so we
//                   SanctionEntity.create({
//                       uid: parseInt(uid), 
//                       lastName: lastName || null,
//                       firstName: firstName || null, 
//                       type: sdnType || null,
//                   }).then(() => {
//                     // If there is no programm for this sanction - we skip
//                     if(!programList?.program.length) return
//                     // Program might be a String or an Array
//                     if(programList.program instanceof Array) {
//                       programList.program.forEach((programName: any) => {
//                         SanctionProgram.create({
//                           sanction: parseInt(uid),
//                           name: programName
//                         })
//                       })
//                     } else  {
//                       SanctionProgram.create({
//                         sanction: parseInt(uid),
//                         name: programList?.program 
//                       })
//                     }
//                   }).then(() => {
//                     if(!akaList?.aka.length) return
//                     if(akaList?.aka instanceof Array) {
//                       akaList?.aka.forEach((alias: any) => {
//                         SanctionAlias.create({
//                           sanction: parseInt(uid),
//                           lastName: alias.lastName,
//                           firstName: alias.firstName
//                         })
//                       })
//                     } else if (akaList?.aka instanceof String) {
//                       SanctionAlias.create({
//                         sanction: parseInt(uid),
//                         lastName: akaList?.aka.lastName,
//                         firstName: akaList?.aka.firstName
//                       })
//                     }
//                   }).then(() => {
//                     if(!addressList?.address.length) return
//                     if(addressList?.address instanceof Array) {
//                       addressList?.address.forEach((location: any) => {
//                         SanctionAddress.create({
//                           sanction: parseInt(uid),
//                           address1: location.address1 || null,
//                           city: location.city || null,
//                           postalCode: location.postalCode || null,
//                           country: location.country || null,
//                         })
//                       })
//                     } else if (addressList?.address instanceof String) {
//                       SanctionAddress.create({
//                         sanction: parseInt(uid),
//                         address1: addressList?.address.address1 || null,
//                         city: addressList?.address.city || null,
//                         postalCode: addressList?.address.postalCode || null,
//                         country: addressList?.address.country || null,
//                       })
//                     }
//                   }).then(() => {
//                     if(!idList?.id.length) return
//                     if(idList?.id instanceof Array) {
//                       idList?.id.forEach((instance: any) => {
//                         SanctionInfo.create({
//                           sanction: parseInt(uid),
//                           key: instance?.idType || null,
//                           value: instance?.idNumber || null,
//                         })
//                       })
//                     } else if (idList?.id instanceof String) {
//                       SanctionInfo.create({
//                         sanction: parseInt(uid),
//                         key: idList?.id?.idType || null,
//                         value: idList?.id?.idNumber || null,
//                       })
//                     }
//                   })
//               })
//           }).then(() => resolve({success: true})
//            ).catch((err) => reject(err))
//   })   
// }



// ________________________ HINT _________________________
// const operation1 = Promise.resolve(5)
// const operation2 = Promise.resolve(15)
// const publishResult = () => Promise.reject(`Can't publish`)

// let p = new Promise((resolve, reject) => {
//   (async () => {
//     try {
//       const op1 = await operation1;
//       const op2 = await operation2;

//       if (op2 == null) {
//          throw new Error('Validation error');
//       }

//       const res = op1 + op2;
//       const result = await publishResult(res);
//       resolve(result)
//     } catch (err) {
//       reject(err)
//     }
//   })()
// });

// (async () => {
//   await p;
// })().catch(e => console.log("Caught: " + e));