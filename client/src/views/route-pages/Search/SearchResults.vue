<template>
   <!-- STEPS -->
   <SearchSteps></SearchSteps>
   <!-- STEPS -->  

   <!-- SANCTIONS OFFCANVAS -->
   <div class="offcanvas offcanvas__sanctions" v-if="selectedSanction">
      <div class="offcanvas__container">
         <div class="offcanvas__backdrop" @click="toggleOffcanvas({entity: 'sanction'})"></div>
         <div class="offcanvas__body">
            <button class="btn" @click="toggleOffcanvas({entity: 'sanction'})">
               <ion-icon name="chevron-back" style="vertical-align: middle; line-height: 0;"></ion-icon>
               <span style="vertical-align: middle; margin: 0 0.5rem 0" >Back</span>  
            </button>
            <div class="offcanvas__entity">
               <div class="offcanvas__entity-name title mb-2">
                  {{selectedSanction.fullName}}
               </div>
               <div class="offcanvas__entity-type d-flex justify-between">
                  <span class="offcanvas__key">Type</span>
                  <span class="offcanvas__value">{{selectedSanction.type}}</span>
               </div>
               <div class="offcanvas__entity-programm d-flex justify-between mt-1">
                  <span class="offcanvas__key">Current program</span>
                  <span class="offcanvas__value" style="text-align: right">
                  {{parseSanctionProgram(selectedSanction.SanctionPrograms)}}
                  </span>
               </div>
               <div class="offcanvas__entity-update d-flex justify-between mt-1">
                  <span class="offcanvas__key">Sanctioned since</span>
                  <span class="offcanvas__value">{{getFormatTimeString(selectedSanction.pubDate, 'L')}}</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Authority</span>
                  <span class="offcanvas__value">{{selectedSanction.authority}}</span>
               </div>
              <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Status</span>
                  <span class="tag tag--warning tag--entity offcanvas__value" style="margin: 0">Active</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1" v-if="selectedSanction.list">
                  <span class="offcanvas__key">List</span>
                  <span class="offcanvas__value">{{selectedSanction.list}}</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1" v-if="selectedSanction.website">
                  <span class="offcanvas__key">Source</span>
                  <span class="offcanvas__value"><a :href="selectedSanction.website" style="text-decoration: underline" target="_blank">{{getOriginFromURL(selectedSanction.website)}}</a></span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Latest updated</span>
                  <span class="offcanvas__value">{{getFormatTimeString(selectedSanction.created, 'L')}}</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1" v-if="selectedSanction.remarks">
                  <span class="offcanvas__key">Remarks</span>
                  <span class="offcanvas__value" style="text-align: right">{{selectedSanction.remarks}}</span>
               </div>
                <div class="offcanvas__entity-authority d-flex justify-between mt-1" v-if="selectedSanction.website">
                  <span class="offcanvas__key">Source</span>
                  <span class="offcanvas__value"><a :href="selectedSanction.website" style="text-decoration: underline" target="_blank">{{getOriginFromURL(selectedSanction.website)}}</a></span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Latest updated</span>
                  <span class="offcanvas__value">{{getFormatTimeString(selectedSanction.created, 'L')}}</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1" v-if="selectedSanction.remarks">
                  <span class="offcanvas__key">Remarks</span>
                  <span class="offcanvas__value" style="text-align: right">{{selectedSanction.remarks}}</span>
               </div>
                <div class="offcanvas__entity-authority d-flex justify-between mt-1" v-if="selectedSanction.website">
                  <span class="offcanvas__key">Source</span>
                  <span class="offcanvas__value"><a :href="selectedSanction.website" style="text-decoration: underline" target="_blank">{{getOriginFromURL(selectedSanction.website)}}</a></span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Latest updated</span>
                  <span class="offcanvas__value">{{getFormatTimeString(selectedSanction.created, 'L')}}</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1" v-if="selectedSanction.remarks">
                  <span class="offcanvas__key">Remarks</span>
                  <span class="offcanvas__value" style="text-align: right">{{selectedSanction.remarks}}</span>
               </div>
               <div class="delimiter mt-2 mb-2"></div>
               <div class="offcanvas__tabs tabs">
                  <div class="tabs__container">
                     <div class="tabs__body">
                        <div class="tabs__body-item" v-if="selectedSanction?.SanctionInfos.length">
                           <div class="title search__header" style="margin-bottom: 20px">Generall info</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Key</th>
                                    <th class="table__head-cell search__sanctions-td">Value</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="info in selectedSanction.SanctionInfos" :key="info.id">
                                    <th class="table__body-cell search__sanctions-td">{{info.key}}</th>
                                    <th class="table__body-cell search__sanctions-td" v-if="info.key === 'Website'">
                                       <a :href="info.value">{{info.value}}</a>
                                    </th>
                                    <th class="table__body-cell search__sanctions-td" v-else-if="info.key === 'Email Address'">
                                       <a :href="'mailto:' + info.value">{{info.value}}</a>
                                    </th>
                                    <th class="table__body-cell search__sanctions-td" v-else-if="info.key === 'Date of birth' || info.key === 'Year of birth'">
                                       {{
                                          getFormatTimeString(
                                             new Date(info.value.replace(/ \+00:00$/gi,"")),
                                             "L"
                                          )
                                       }}
                                    </th>
                                    <th class="table__body-cell search__sanctions-td" v-else>
                                       {{info.value}}
                                    </th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <div class="title search__header" style="margin-bottom: 20px; margin-top: 20px" v-if="selectedSanction?.SanctionAddresses.length">Address</div>
                        <div class="tabs__body-item mt-2" v-for="location in selectedSanction?.SanctionAddresses">
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td" v-if="location.address">Street</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="location.city">City</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="location.postalCode">Postal code</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="location.country">Country</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="location.stateOrProvince">State or Province</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="location.zipCode && location.zipCode !== '0'">Zip Code</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="location.note">Note</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row">
                                    <td class="table__head-cell search__sanctions-td" v-if="location.address">{{location.address}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="location.city">{{location.city}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="location.postalCode">{{location.postalCode}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="location.country">{{location.country}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="location.stateOrProvince">{{location.stateOrProvince}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="location.zipCode && location.zipCode !== '0'">{{location.zipCode}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="location.note">{{location.note}}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <div class="tabs__body-item mt-2" v-if="selectedSanction?.SanctionAliases.length">
                           <div class="title search__header" style="margin-bottom: 20px">Alternative names</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Name</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="name, i in selectedSanction.SanctionAliases">
                                    <td class="table__head-cell search__sanctions-td">
                                       {{name.fullName}}
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>



                        <div class="title search__header" style="margin-bottom: 20px; margin-top: 40px" v-if="selectedSanction.SanctionDocuments.length">Identification</div>
                        <div class="tabs__body-item mt-2" v-for="doc, i in selectedSanction.SanctionDocuments">
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td" v-if="doc.type">Type</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="doc.number">ID</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="doc.country">Country</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="doc.city">City</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="doc.date">Date</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="doc.note">Note</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row">
                                    <td class="table__head-cell search__sanctions-td" v-if="doc.type">{{doc.type}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="doc.number">{{doc.number}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="doc.country">{{doc.country}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="doc.city">{{doc.city}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="doc.date">{{getFormatTimeString(doc.date, "L")}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="doc.note">{{doc.note}}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div class="tabs__body-item mt-2" v-for="ethnos, i in selectedSanction.SanctionNationalities">
                           <div class="title search__header" style="margin-bottom: 20px">Nationality/Citizenship</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td" v-if="ethnos.type">Type</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="ethnos.country">Country</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="ethnos.address">Address</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="ethnos.city">City</th>
                                    <th class="table__head-cell search__sanctions-td" v-if="ethnos.stateOrProvince">State or Province</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row">
                                    <td class="table__head-cell search__sanctions-td" v-if="ethnos.type">{{ethnos.type}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="ethnos.country">{{ethnos.country}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="ethnos.address">{{ethnos.address}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="ethnos.city">{{ethnos.city}}</td>
                                    <td class="table__head-cell search__sanctions-td" v-if="ethnos.stateOrProvince">{{ethnos.stateOrProvince}}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>



                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- SANCTIONS OFFCANVAS END -->


   <!-- POLITICALLY EXPOSED PERSONS OFFCANVAS -->
   <div class="offcanvas offcanvas__PEPs" v-if="selectedPEP">
      <div class="offcanvas__container">
         <div class="offcanvas__backdrop" @click="toggleOffcanvas({entity: 'PEP'})"></div>
         <div class="offcanvas__body">
            <button class="btn" @click="toggleOffcanvas({entity: 'PEP'})">
               <ion-icon name="chevron-back" style="vertical-align: middle; line-height: 0;"></ion-icon>
               <span style="vertical-align: middle; margin: 0 0.5rem 0" >Back</span>  
            </button>
            <div class="offcanvas__entity">
               <div class="offcanvas__entity-name title mb-2">
                  {{selectedPEP.caption}}
               </div>

               
               <div class="offcanvas__entity-type d-flex justify-between" v-if="selectedPEP.schema">
                  <span class="offcanvas__key">Type</span>
                  <span class="offcanvas__value text-right">{{selectedPEP.schema}}</span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.firstName">
                  <span class="offcanvas__key">First Name</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.firstName,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.lastName">
                  <span class="offcanvas__key">Last Name</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.lastName,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.fatherName">
                  <span class="offcanvas__key">Father Name</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.fatherName,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.gender">
                  <span class="offcanvas__key">Gender</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.gender,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.nationality">
                  <span class="offcanvas__key">Nationality</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.nationality,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.country">
                  <span class="offcanvas__key">Country</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.country,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.birthDate">
                  <span class="offcanvas__key">Date of Birth</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.birthDate,
                     callback: 'getFirst'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.birthPlace">
                  <span class="offcanvas__key">Place of Birth</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.birthPlace,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.deathDate">
                  <span class="offcanvas__key">Date of Death</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.deathDate,
                     callback: 'getFirst'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.status">
                  <span class="offcanvas__key">Status</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.status,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.religion">
                  <span class="offcanvas__key">Religion</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.religion,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.innCode">
                  <span class="offcanvas__key">INN Code</span>
                  <span class="offcanvas__value text-right">
                     <b>
                        {{convertPEPData({
                           data: selectedPEP.properties.innCode,
                           callback: 'default'
                        })}}
                     </b>
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.phone">
                  <span class="offcanvas__key">Phone number</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.phone,
                     callback: 'default'
                  })}}
                  </span>
               </div>
               
               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.email">
                  <span class="offcanvas__key">Email</span>
                  <span class="offcanvas__value text-right">
                  {{convertPEPData({
                     data: selectedPEP.properties.email,
                     callback: 'default'
                  })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.website">
                  <span class="offcanvas__key">Website</span>
                  <span class="offcanvas__value text-right">
                     {{convertPEPData({
                        data: selectedPEP.properties.website,
                        callback: 'default'
                     })}}
                  </span>
               </div>



               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.createdAt">
                  <span class="offcanvas__key">Created At</span>
                  <span class="offcanvas__value text-right">
                     {{convertPEPData({
                        data: selectedPEP.properties.createdAt,
                        callback: 'default'
                     })}}
                  </span>
               </div>

               <div class="offcanvas__entity-programm d-flex justify-between mt-1" v-if="selectedPEP.properties.modifiedAt">
                  <span class="offcanvas__key">Modified At</span>
                  <span class="offcanvas__value text-right">
                     {{convertPEPData({
                        data: selectedPEP.properties.modifiedAt,
                        callback: 'default'
                     })}}
                  </span>
               </div>
               <div class="delimiter mt-2 mb-2"></div>
               <div class="offcanvas__tabs tabs">
                  <div class="tabs__container">
                     <div class="tabs__body">

                        <!-- PEPs NAMES -->
                        <div class="tabs__body-item" v-if="selectedPEP.properties.name">
                           <div class="title search__header mt-2 mb-2">Person`s Name</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Name</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="name, i in selectedPEP.properties.name" :key="i">
                                    <th class="table__body-cell search__sanctions-td">{{name}}</th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <!-- PEPs NAMES END -->

                        <!-- PEPs NOTES -->
                        <div class="tabs__body-item" v-if="selectedPEP.properties.notes">
                           <div class="title search__header mt-2 mb-2">Additional Notes</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Note</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="note, i in selectedPEP.properties.notes" :key="i">
                                    <th class="table__body-cell search__sanctions-td">{{note}}</th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <!-- PEPs NOTES END -->


                        <!-- PEPs EDUCATION TABLE-->
                        <div class="tabs__body-item" v-if="selectedPEP.properties.education">
                           <div class="title search__header mt-2 mb-2">Person`s Education</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Education</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="ed, i in selectedPEP.properties.education" :key="i">
                                    <th class="table__body-cell search__sanctions-td">{{ed}}</th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <!-- PEPs EDUCATION TABLE END -->


                        <!-- PEPs POSITION TABLE -->
                        <div class="tabs__body-item" v-if="selectedPEP.properties.position">
                           <div class="title search__header mt-2 mb-2">Person`s Position</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Position</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="pos, i in selectedPEP.properties.position" :key="i">
                                    <th class="table__body-cell search__sanctions-td">{{pos}}</th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <!-- PEPs POSITION TABLE END -->


                        <!-- PEPs NAMES -->
                        <div class="tabs__body-item" v-if="selectedPEP.properties.sourceUrl">
                           <div class="title search__header mt-2 mb-2">Source URL</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">URL</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="url, i in selectedPEP.properties.sourceUrl" :key="i">
                                    <th class="table__body-cell search__sanctions-td">
                                       <a target="_blank" :href="url">{{getOriginFromURL(url)}}</a>
                                    </th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <!-- PEPs NAMES END -->



                        <!-- PEPs ALIASES TABLE -->
                        <div class="tabs__body-item" v-if="selectedPEP.properties.alias">
                           <div class="title search__header mt-2 mb-2">Alternative names</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Alias</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="name, i in selectedPEP.properties.alias" :key="i">
                                    <th class="table__body-cell search__sanctions-td">{{name}}</th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <!-- PEPs ALIASES TABLE END -->




                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- POLITICALLY EXPOSED PERSONS OFFCANVAS END -->

   <section class="search">
      <div class="search__container">
         <div class="search__data d-flex justify-between">
            <div class="search__target-info d-flex align-center">
               <div class="search__target-image hidden">
               </div>
               <div class="search__target-data">
                  <div class="search__target-name">
                     {{getTargetName}} 
                     <!-- 
                     <button class="tag" @click="reportIssues($event)">
                        <ion-icon name="alert-circle-outline" style="vertical-align: middle; font-size: 1.3rem; margin-right: 0.4rem; pointer-events: none;"></ion-icon>
                        <span style="vertical-align: middle; pointer-events: none;">Report issues with data</span>
                     </button>
                     -->
                  </div>
                  <div class="search__target-details">request performed in {{getRequestDuration}} seconds</div>
               </div>
            </div>
            <div class="search__controls d-flex">
               <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem " @click="clearBeforeRoute();">Back to search</router-link>
               <button class="btn" style="margin: 1.5rem 1rem" @click="downloadPDF($event);">Download PDF</button>
            </div>
         </div>

         <!-- NEWS -->
         <div class="search__news">
            <div class="search__news-container" v-if="allNews.length">
               <div class="results__data hidden">
                  <div class="results__count title text-center">
                     <span v-if="allNews.length > 100" >Over 100 results found</span>
                     <span v-else>Total results: {{allNews.length}}</span>
                  </div>
                  <div class="results__pdf d-flex justify-center">
                     <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem " @click="clearBeforeRoute();">Back to search</router-link>
                     <button class="btn" style="margin: 1.5rem 1rem" @click="downloadPDF();">Download PDF</button>
                  </div>
               </div>
               <div class="title search__header fullwidth text-center mb-2">
                  Adverse Media Search 
                  <span v-if="allNews.length > 100" >(100+)</span>
                  <span v-else>({{allNews.length}})</span>
               </div>
               <div class="search__row">
                  <!-- CARD -->
                  <NewsCard v-for="news, index in allNews.filter((item) => {
                     return item.id < displayLimit
                     })" :newsData="news"></NewsCard>
                  <!-- CARD --> 
               </div>
               <!-- HIDDEN PAGINATION --> 
               <div class="d-flex justify-center">
                  <button class="btn" style="margin: 1.5rem 1rem" @click="showAllRelevantNews($event);" v-if="allNews?.length > 6">View all</button>
               </div>
               <!-- HIDDEN PAGINATION --> 
            </div>
            <div class="search__noresults mb-10 mt-10" v-else>
               <div class="title text-center">No news found.</div>
               <div class="paragraph" style="padding: 25px 0 15px 0">It seems we can’t find any news based on your search.</div>
            </div>
         </div>
         <!-- NEWS END -->

         <div class="delimiter mt-4"></div>

         <!-- SANCTIONS -->
         <div class="search__sanctions" v-if="allSanctions.length">
            <div class="title search__header fullwidth text-center mb-2">
               Potential Sanctions Matches
               <span v-if="allSanctions.length">({{getTotalSanctionsCount}})</span>
            </div>
            <table class="search__sanctions-table table fullwidth">
               <thead class="table__head">
                  <tr class="table__head-row">
                     <th class="table__head-cell search__sanctions-td">
                        <!--
                        <button @click="sortSanctionsTable($event, 'name')" data-sort-type="ascending" style="width: 100%; height: 100%; display: inline-block; background: transparent; border: none; outline: none;">
                            
                           <ion-icon class="table-arrow" :class="{'active': getSorting.by === 'name' && getSorting.type === 'descending' }" name="caret-up"></ion-icon>
                           <ion-icon class="table-arrow" :class="{'active': getSorting.by === 'name' && getSorting.type === 'ascending' }" name="caret-down"></ion-icon>
                        </button>
                         -->
                        Entity name
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Type
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Country
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Authority
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Current Program
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Last Update 
                     </th>
                  </tr>
               </thead>
               <tbody class="table__body">
                  <tr class="table__body-row" v-for="sanction, indx in allSanctions">
                     <th class="table__body-cell search__sanctions-td">
                        <a href="javascript:void(0);" @click="toggleOffcanvas({entity: 'sanction', id: indx})">
                        {{sanction?.fullName}}
                        </a>
                     </th>
                     <th class="table__body-cell search__sanctions-td">{{sanction.type == "Entity" ? "Organization" : sanction.type}}</th>
                     <th class="table__body-cell search__sanctions-td">{{getCountryIconByName(sanction?.SanctionAddresses[0]?.country) || 'Globally'}} </th>
                     <th class="table__body-cell search__sanctions-td">{{sanction.authority}}</th>
                     <th class="table__body-cell search__sanctions-td">{{
                        parseSanctionProgram(sanction.SanctionPrograms)
                     }}</th>
                     <th class="table__body-cell search__sanctions-td">{{getFormatTimeString(sanction.pubDate, 'L')}}</th>
                  </tr>
               </tbody>
            </table>
            <div class="search__pagination mt-1">
               <ul class="search__pagination-list list horizontal">
                  <li class="search__pagination-item">
                     <!-- Shows only if current active page is the last-->
                     <button class="btn small btn-pg"  
                     @click="moveSanctionsTo(getSanctionsCurrentPage - 2)" 
                     v-if="
                        getSanctionsCurrentPage === countTotalSanctionsPages() && 
                        countTotalSanctionsPages() > 2
                     ">{{getSanctionsCurrentPage - 2}}</button>
                  </li>
                  <li class="search__pagination-item">
                     <button class="btn small btn-pg"  @click="moveSanctionsTo(getSanctionsCurrentPage - 1)" v-if="getSanctionsCurrentPage > 1">{{getSanctionsCurrentPage - 1}}</button>
                  </li>
                  <li class="search__pagination-item">
                     <button class="btn small btn-pg active">{{getSanctionsCurrentPage}}</button>
                  </li>

                  <li class="search__pagination-item">
                     <button class="btn small btn-pg"  
                     @click="moveSanctionsTo(getSanctionsCurrentPage + 1)"
                     v-if="
                        (getSanctionsCurrentPage + 1) <= countTotalSanctionsPages()
                     "
                     >{{getSanctionsCurrentPage + 1}}</button>
                  </li>


                   <li class="search__pagination-item">
                     <!-- Shows only if current active page is first and there are more then 2 pages total-->
                     <button class="btn small btn-pg"  
                     @click="moveSanctionsTo(getSanctionsCurrentPage + 2)" 
                     v-if="
                        getSanctionsCurrentPage === 1 && 
                        countTotalSanctionsPages() > 2
                     ">{{getSanctionsCurrentPage + 2}}</button>
                  </li>
                  <li class="search__pagination-item" 
                     v-if="
                     countTotalSanctionsPages() > 4 && 
                     countTotalSanctionsPages() - 1 > getSanctionsCurrentPage">
                     <!-- Shows only if current active page is first and there are more then 2 pages total-->
                     <button class="btn small btn-pg disabled">...</button>
                  </li>
                  <li class="search__pagination-item">
                     <button class="btn small btn-pg"  
                     @click="moveSanctionsTo(countTotalSanctionsPages())"
                     v-if="
                        countTotalSanctionsPages() > 4 &&
                        countTotalSanctionsPages() - 1 > getSanctionsCurrentPage
                     "
                     >{{countTotalSanctionsPages()}}</button>
                  </li>
               </ul>
            </div>
         </div>
         <div class="search__noresults mb-10 mt-10" v-else>
            <div class="title text-center">No sanctions or export controls matches found.</div>
            <div class="paragraph" style="padding: 25px 0 15px 0; max-width: 60%; margin: 0 auto">It seems there are no matches against the EU,  OFAC, BIS, UN, and UK OFSI sanctions or export controls lists.</div>
         </div>
         <!-- SANCTIONS END -->

         <div class="delimiter mt-4 mb-4"></div>

         <!-- POLITICALLY EXPOSED PERSONS -->
         <div class="search__peps" v-if="allPEPs.length">
            <div class="title search__header fullwidth text-center mb-2">
               Politically exposed persons
               <span>({{getPEPsCount}})</span>
            </div>


            <table class="search__sanctions-table table fullwidth">
               <thead class="table__head">
                  <tr class="table__head-row">
                     <th class="table__head-cell search__sanctions-td">
                        Full Name
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Type
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Nationality
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Country
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Gender
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Birth Place 
                     </th>
                     <th class="table__head-cell search__sanctions-td">
                        Birth Date 
                     </th>
                  </tr>
               </thead>
               <tbody class="table__body  peps-table">
                  <tr class="table__body-row" v-for="pep, i in allPEPs" :key="pep.properties.wikidataId">
                  
                     <th class="table__body-cell search__sanctions-td">
                        <a href="javascript:void(0);" @click="toggleOffcanvas({entity: 'PEP', id: i})">{{pep.caption}}</a>
                     </th>
                     <th class="table__body-cell search__sanctions-td">{{pep.schema}}</th>
                     <th class="table__body-cell search__sanctions-td">{{
                        convertPEPData({
                           callback: 'default',
                           data: pep.properties.nationality
                        })
                     }}</th>
                     <th class="table__body-cell search__sanctions-td">{{
                        convertPEPData({
                           callback: 'default',
                           data: pep.properties.country
                        })
                     }}</th>
                     <th class="table__body-cell search__sanctions-td">{{
                        convertPEPData({
                           callback: 'getFirst',
                           data: pep.properties.gender
                        })
                     }}</th>
                     <th class="table__body-cell search__sanctions-td">{{
                        convertPEPData({
                           callback: 'getFirst',
                           data: pep.properties.birthPlace
                        })
                     }}</th>
                     <th class="table__body-cell search__sanctions-td">{{
                        convertPEPData({
                           callback: 'getFirst',
                           data: pep.properties.birthDate
                        })
                     }}</th>
                  </tr>
               </tbody>
            </table>
            <div class="search__pagination mt-1">
               <ul class="search__pagination-list list horizontal">
                  <!-- PREVIOUS - 1 PEPs TABLE PAGE -->
                  <li class="search__pagination-item"
                     @click="switchPEPsPage(currentPEPPage - 2)"
                     v-if="
                        currentPEPPage === Math.ceil(getPEPsCount / getPEPsLimit) &&
                        Math.ceil(getPEPsCount / getPEPsLimit) > 2
                     "
                  >
                     <button class="btn small btn-pg">{{currentPEPPage - 2}}</button>
                  </li>
                  <!-- PREVIOUS - 1 PEPs TABLE PAGE END-->             


                  <!-- PREVIOUS PEPs TABLE PAGE -->
                  <li class="search__pagination-item"
                   v-if="currentPEPPage > 1"
                  >
                     <button class="btn small btn-pg"
                        @click="switchPEPsPage(currentPEPPage - 1)"
                     >{{currentPEPPage - 1}}</button>
                  </li>
                  <!-- PREVIOUS PEPs TABLE PAGE END-->


                  <!-- CURRENT PEPs TABLE PAGE -->
                  <li class="search__pagination-item">
                     <button class="btn small btn-pg active">{{currentPEPPage}}</button>
                  </li>
                  <!-- CURRENT PEPs TABLE PAGE END-->

                  <!-- NEXT PEPs TABLE PAGE -->
                  <li class="search__pagination-item"
                     v-if="
                        Math.ceil(getPEPsCount / getPEPsLimit) > 1 && 
                        currentPEPPage !== Math.ceil(getPEPsCount / getPEPsLimit)
                     "
                  >
                     <button class="btn small btn-pg" @click="switchPEPsPage(currentPEPPage + 1)">{{currentPEPPage + 1}}</button>
                  </li>
                  <!-- NEXT PEPs TABLE PAGE END-->


                  <!-- NEXT + 1 PEPs TABLE PAGE -->
                  <li class="search__pagination-item" 
                     v-if="
                        currentPEPPage === 1 &&
                        Math.ceil(getPEPsCount / getPEPsLimit) > 2
                     "
                     @click="switchPEPsPage(currentPEPPage + 2)"
                  >
                     <button class="btn small btn-pg">{{currentPEPPage + 2}}</button>
                  </li>
                  <!-- NEXT + 1 PEPs TABLE PAGE END-->


                  <!-- DISABLE PEPs TABLE DOTS -->
                  <li class="search__pagination-item" 
                      v-if="
                        Math.ceil(getPEPsCount / getPEPsLimit) > 4 &&
                        Math.ceil(getPEPsCount / getPEPsLimit) - 1 > currentPEPPage
                     "
                  >
                     <button class="btn small btn-pg disabled">...</button>
                  </li>
                  <!-- DISABLE PEPs TABLE DOTS  END-->


                  <!-- LAST PEPs TABLE PAGE -->
                  <li class="search__pagination-item"
                     v-if="
                        Math.ceil(getPEPsCount / getPEPsLimit) > 4 &&
                        Math.ceil(getPEPsCount / getPEPsLimit) - 1 > currentPEPPage
                     "
                     @click="switchPEPsPage(Math.ceil(getPEPsCount / getPEPsLimit))"
                  >
                     <button class="btn small btn-pg">
                        {{Math.ceil(getPEPsCount / getPEPsLimit)}}
                     </button>
                  </li>
                  <!-- LAST PEPs TABLE PAGE END -->

               </ul>
            </div>
         </div>
         <div class="search__noresults mb-10 mt-10" v-else>
            <div class="title text-center">No politicallly exposed persons matches found.</div>
            <div class="paragraph" style="padding: 25px 0 15px 0; max-width: 60%; margin: 0 auto">A search through a number of PEPs international databases has not identified any matches against the search target.</div>
         </div>
         
         <!-- POLITICALLY EXPOSED PERSONS END -->
      </div>
   </section>
   <!-- FOOTER -->
   <Footer></Footer>
   <!-- FOOTER -->
</template>

<script>
  // Vue environment
  import {
      defineComponent
  } from "vue";
  import {
      mapGetters,
      mapActions,
      mapMutations
  } from "vuex";

  // Importing required libraries and plugins
  import helpers from "@/helpers";
  import moment from "moment"
  import axios from "axios";
  import jsPDF from "jspdf";
  import autoTable from "jspdf-autotable";
  import transliterate from 'transliterate';
  // Importing fonts for jsPDF autotable
  import Montserrat from "@/assets/fonts/Montserrat/Montserrat.js"


  // Components
  import Footer from "@/components/Footer.vue";
  import SearchSteps from "@/components/SearchSteps.vue";
  import NewsCard from "@/components/NewsCard.vue";
  import Offcanvas from "@/components/Offcanvas";

  export default defineComponent({
      name: 'SearchResultsView',
      components: {
          SearchSteps,
          Footer,
          NewsCard,
          Offcanvas
      },
      data() {
          return {
              results: [],
              selectedSanction: null,
              issueReported: false,
          }
      },
      async mounted() {
          document.body.style.overflow = 'auto';
      },
      computed: mapGetters([
         "allNews", 
         "displayLimit", 
         "getRequestDuration",
         "allSanctions", 
         "getTotalSanctionsCount", 
         "getSanctionsLimit",
         "getSanctionsCurrentPage", 
         "getTargetName", 
         "getSorting",
         "allPEPs",
         "getPEPsCount",
         "getPEPsLimit",
         "selectedPEP",
         "currentPEPPage",
         
      ]),
      methods: {
         ...mapActions([
            "fetchGoogleNews", 
            "fetchOFACsanctions", 
            "fetchAndUpdateSanctions", 
            "commitIssuesWithData", 
            "fetchAndUpdatePEPs",
            "setSelectePEP",
            "switchPEPsPageTo",
            "fetchPEPs",
         ]),

         ...mapMutations([
            "UPDATE_DISPLAY_LIMIT", 
            "UPDATE_SANCTIONS_PAGE", 
            "UPDATE_ALL_SANCTIONS", 
            "SORT_SANCTIONS",
            "UPDATE_CURRENT_PEP_PAGE",
            "UPDATE_PEPs_OFFSET"
         ]),
         countTotalSanctionsPages() {
            return Math.ceil(this.getTotalSanctionsCount / this.getSanctionsLimit)
         },
         showSanctionDetails() {
            const offcanvas = document.querySelector()
            offcanvas.classList.remove('hidden')
         },
         switchPEPsPage(to){
            this.preloaderForElement({
               selector: '.peps-table',
               status: 'add'
            })
            this.switchPEPsPageTo(to).finally(() => {
               this.preloaderForElement({
                  selector: '.peps-table',
                  status: 'remove'
               })
            })
            
         },
         getFormatTimeString(date, type) {
            return moment(date).format(type)
         },

         showAllRelevantNews(e) {
            e.target.classList.add('hidden');
            this.UPDATE_DISPLAY_LIMIT(100);
         },

         // sortSanctionsTable(e, sortBy) {
         //    const type = e.target.getAttribute("data-sort-type");

         //    this.sortSanctions({
         //       sortBy,
         //       type
         //    })
         //    switch (type) {
         //       case 'ascending':
         //             e.target.setAttribute("data-sort-type", "descending")
         //             break;
         //       case 'descending':
         //             e.target.setAttribute("data-sort-type", "ascending")
         //             break;
         //    }
         // },
         convertPEPData(options) {
            const {
               callback,
               data
            } = options;
            if(!data) return '-'

            const generator = {
               nationality: () => data.map((ethnos) => this.getCountryIconByName(ethnos)).join(', '),
               date: () => {},
               default: () => data.join(', '),
               getFirst: () => data[0],
            }

            return generator[callback]() 
         },
         parseSanctionProgram(data) {
            switch(data.constructor) {
               case Object:
                  return data.name;
               case Array:
                  return data.map(item => item.name).join(', ');
               case String:
                  return data;
            }
         },
         getCountryIconByName(name) {
            const flags = new Map();
            flags.set('United Arab Emirates', '🇦🇪 United Arab Emirates')
            flags.set('U.A.E.', '🇦🇪 United Arab Emirates')
            flags.set('UAE', '🇦🇪 United Arab Emirates')
            flags.set('Afghanistan', '🇦🇫 Afghanistan')
            flags.set('AFGHANISTAN', '🇦🇫 Afghanistan')
            flags.set('Albania', '🇦🇱 Albania')
            flags.set('Armenia', '🇦🇲 Armenia')
            flags.set('Australia', '🇦🇺 Australia')
            flags.set('Bosnia and Herzegovina', '🇧🇦 Bosnia & Herzegovina')
            flags.set('Barbados', '🇧🇧 Barbados')
            flags.set('Bangladesh', '🇧🇩 Bangladesh')
            flags.set('Benin', '🇧🇯 Benin')
            flags.set('BELARUS', '🇧🇾 Belarus')
            flags.set('Belarus', '🇧🇾 Belarus')
            flags.set(' Belarus', '🇧🇾 Belarus')
            flags.set('BANGLADESH', '🇧🇩 Bangladesh')
            flags.set('Belgium', '🇧🇪 Belgium')
            flags.set('Canada', '🇨🇦 Canada')
            flags.set('Congo (Democratic Republic)', '🇨🇫 Central African Republic')
            flags.set('Democratic Republic of the Congo', '🇨🇫 Central African Republic')
            flags.set('Sweden', '🇸🇪 Sweden')
            flags.set('SWEDEN', '🇸🇪 Sweden')
            flags.set('Singapore', '🇸🇬 Singapore')
            flags.set('Slovenia', '🇸🇮 Slovenia')
            flags.set('Slovakia', '🇸🇰 Slovakia')
            flags.set('San Marino', '🇸🇲 San Marino')
            flags.set('Somalia', '🇸🇴 Somalia')
            flags.set('El Salvador', '🇸🇻 El Salvador')
            flags.set('Syrian Arab Republic', '🇸🇾 Syria')
            flags.set('Syria', '🇸🇾 Syria')
            flags.set('Thailand', '🇹🇭 Thailand')
            flags.set('Tajikistan', '🇹🇯 Tajikistan')
            flags.set('Tunisia', '🇹🇳 Tunisia')
            flags.set('Turkey', '🇹🇷 Turkey')
            flags.set('TANZANIA, UNITED REPUBLIC OF', '🇹🇿 Tanzania')
            flags.set('Ukraine', '🇺🇦 Ukraine')
            flags.set('ua', '🇺🇦 Ukraine')
            flags.set('suhh', 'USSR')
            flags.set('Uruguay', '🇺🇾 Uruguay')
            flags.set('Saint Vincent and the Grenadines', '🇻🇨 St. Vincent & Grenadines')
            flags.set('Venezuela', '🇻🇪 Venezuela')
            flags.set('VENEZUELA', '🇻🇪 Venezuela')
            flags.set('VIRGIN ISLANDS (BRITISH)', '🇻🇬 British Virgin Islands')
            flags.set('Vanuatu', '🇻🇺 Vanuatu')
            flags.set('YEMEN', '🇾🇪 Yemen')
            flags.set('Zambia', '🇿🇲 Zambia')
            flags.set('SWITZERLAND', '🇨🇭 Switzerland')
            flags.set('Colombia', '🇨🇴 Colombia')
            flags.set('Cape Verde', '🇨🇻 Cape Verde')
            flags.set('Cyprus', '🇨🇾 Cyprus')
            flags.set('Czech Republic', '🇨🇿 Czechia')
            flags.set('Czechia', '🇨🇿 Czechia')
            flags.set('Dominica', '🇩🇲 Dominica')
            flags.set('Dominican Republic', '🇩🇴 Dominican Republic')
            flags.set('China', '🇨🇳 China')
            flags.set('ALGERIA', '🇩🇿 Algeria')
            flags.set('Algeria', '🇩🇿 Algeria')
            flags.set('Germany', '🇩🇪 Germany')
            flags.set('Eritrea', '🇪🇷 Eritrea')
            flags.set('France', '🇫🇷 France')
            flags.set('United Kingdom of Great Britain and Northern Ireland', '🇬🇧 United Kingdom')
            flags.set('United Kingdom', '🇬🇧 United Kingdom')
            flags.set('Georgia', '🇬🇪 Georgia')
            flags.set('Guernsey', '🇬🇬 Guernsey')
            flags.set('The Gambia', '🇬🇲 Gambia')
            flags.set('Hong Kong Special Administrative Region', '🇭🇰 Hong Kong SAR China')
            flags.set('Hong Kong', '🇭🇰 Hong Kong SAR China')
            flags.set('Lebanon', '🇱🇧 Lebanon')
            flags.set('Ireland', '🇮🇪 Ireland')
            flags.set('Israel', '🇮🇱 Israel')
            flags.set('Iraq', '🇮🇶 Iraq')
            flags.set('IRAQ', '🇮🇶 Iraq')
            flags.set('Iran', '🇮🇷 Iran')
            flags.set(' Iran', '🇮🇷 Iran')
            flags.set('JORDAN', '🇯🇴 Jordan')
            flags.set('Kenya', '🇰🇪 Kenya')
            flags.set('Cambodia', '🇰🇭 Cambodia')
            flags.set('COMOROS', '🇰🇲 Comoros')
            flags.set('North Korea', '🇰🇵 North Korea')
            flags.set('Democratic People`s Republic of Korea', '🇰🇷 South Korea')
            flags.set('Kuwait', '🇰🇼 Kuwait')
            flags.set('Laos', '🇱🇦 Laos')
            flags.set('LEBANON', '🇱🇧 Lebanon')
            flags.set('Liberia', '🇱🇷 Liberia')
            flags.set('Luxembourg', '🇱🇺 Luxembourg')
            flags.set('LUXEMBOURG', '🇱🇺 Luxembourg')
            flags.set('Latvia', '🇱🇻 Latvia')
            flags.set('Libya', '🇱🇾 Libya')
            flags.set('MOROCCO', '🇲🇦 Morocco')
            flags.set('Monaco', '🇲🇨 Monaco')
            flags.set('Marshall Islands', '🇲🇭 Marshall Islands')
            flags.set('MALI', '🇲🇱 Mali')
            flags.set('Burma', '🇲🇲 Myanmar (Burma)')
            flags.set('Malta', '🇲🇹 Malta')
            flags.set('Maldives', '🇲🇻 Maldives')
            flags.set('Malaysia', '🇲🇾 Malaysia')
            flags.set('Namibia', '🇳🇦 Namibia')
            flags.set('NIGER', '🇳🇪 Niger')
            flags.set('Niger', '🇳🇪 Niger')
            flags.set('Nigeria', '🇳🇬 Nigeria')
            flags.set('NIGERIA', '🇳🇬 Nigeria')
            flags.set('Nicaragua', '🇳🇮 Nicaragua')
            flags.set('NICARAGUA', '🇳🇮 Nicaragua')
            flags.set('The Netherlands', '🇳🇱 Netherlands')
            flags.set('Netherlands', '🇳🇱 Netherlands')
            flags.set('Serbia', '🇷🇸 Serbia')
            flags.set('Russian', '🇷🇺 Russia')
            flags.set('Russia', '🇷🇺 Russia')
            flags.set('ru', '🇷🇺 Russia')
            flags.set('PAKISTAN', '🇵🇰 Pakistan')
            flags.set('Pakistan', '🇵🇰 Pakistan')
            flags.set('Palestinian', '🇵🇸 Palestinian Territories')
            flags.set('Russian Federation', '🇷🇺 Russia')
            flags.set('Qatar', '🇶🇦 Qatar')
            flags.set('RF', '🇷🇺 Russia')
            flags.set('Россия', '🇷🇺 Russia')
            flags.set('OMAN', '🇴🇲 Oman')
            flags.set('PANAMA', '🇵🇦 Panama')
            flags.set('Ascension Island', '🇦🇨 Ascension Island')
            flags.set('Andorra', '🇦🇩 Andorra')
            flags.set('Honduras', '🇭🇳 Honduras')
            flags.set('Croatia', '🇭🇷 Croatia')
            flags.set('Haiti', '🇭🇹 Haiti')
            flags.set('Hungary', '🇭🇺 Hungary')
            flags.set('Canary Islands', '🇮🇨 Canary Islands')
            flags.set('Indonesia', '🇮🇩 Indonesia')
            flags.set('Isle of Man', '🇮🇲 Isle of Man')
            flags.set('India', '🇮🇳 India')
            flags.set('British Indian Ocean Territory', '🇮🇴 British Indian Ocean Territory')
            flags.set('Iceland', '🇮🇸 Iceland')
            flags.set('Italy', '🇮🇹 Italy')
            flags.set('Jersey', '🇯🇪 Jersey')
            flags.set('Jamaica', '🇯🇲 Jamaica')
            flags.set('Japan', '🇯🇵 Japan')
            flags.set('Kyrgyzstan', '🇰🇬 Kyrgyzstan')
            flags.set('Kiribati', '🇰🇮 Kiribati')
            flags.set('St. Kitts & Nevis', '🇰🇳 St. Kitts & Nevis')
            flags.set('Cayman Islands', '🇰🇾 Cayman Islands')
            flags.set('Kazakhstan', '🇰🇿 Kazakhstan')
            flags.set('St. Lucia', '🇱🇨 St. Lucia')
            flags.set('Liechtenstein', '🇱🇮 Liechtenstein')
            flags.set('Sri Lanka', '🇱🇰 Sri Lanka')
            flags.set('Lesotho', '🇱🇸 Lesotho')
            flags.set('Lithuania', '🇱🇹 Lithuania')
            flags.set('Moldova', '🇲🇩 Moldova')
            flags.set('Montenegro', '🇲🇪 Montenegro')
            flags.set('St. Martin', '🇲🇫 St. Martin')
            flags.set('Madagascar', '🇲🇬 Madagascar')
            flags.set('North Macedonia', '🇲🇰 North Macedonia')
            flags.set('Mongolia', '🇲🇳 Mongolia')
            flags.set('Macao Sar China', '🇲🇴 Macao Sar China')
            flags.set('Northern Mariana Islands', '🇲🇵 Northern Mariana Islands')
            flags.set('Martinique', '🇲🇶 Martinique')
            flags.set('Mauritania', '🇲🇷 Mauritania')
            flags.set('Montserrat', '🇲🇸 Montserrat')
            flags.set('Mauritius', '🇲🇺 Mauritius')
            flags.set('Malawi', '🇲🇼 Malawi')
            flags.set('Mexico', '🇲🇽 Mexico')
            flags.set('Mozambique', '🇲🇿 Mozambique')
            flags.set('New Caledonia', '🇳🇨 New Caledonia')
            flags.set('Norfolk Island', '🇳🇫 Norfolk Island')
            flags.set('Norway', '🇳🇴 Norway')
            flags.set('Nepal', '🇳🇵 Nepal')
            flags.set('Nauru', '🇳🇷 Nauru')
            flags.set('Niue', '🇳🇺 Niue')
            flags.set('New Zealand', '🇳🇿 New Zealand')
            flags.set('Peru', '🇵🇪 Peru')
            flags.set('French Polynesia', '🇵🇫 French Polynesia')
            flags.set('Papua New Guinea', '🇵🇬 Papua New Guinea')
            flags.set('Philippines', '🇵🇭 Philippines')
            flags.set('Poland', '🇵🇱 Poland')
            flags.set('St. Pierre & Miquelon', '🇵🇲 St. Pierre & Miquelon')
            flags.set('Pitcairn Islands', '🇵🇳 Pitcairn Islands')
            flags.set('Puerto Rico', '🇵🇷 Puerto Rico')
            flags.set('Portugal', '🇵🇹 Portugal')
            flags.set('Palau', '🇵🇼 Palau')
            flags.set('Paraguay', '🇵🇾 Paraguay')
            flags.set('Réunion', '🇷🇪 Réunion')
            flags.set('Romania', '🇷🇴 Romania')
            flags.set('Rwanda', '🇷🇼 Rwanda')
            flags.set('Saudi Arabia', '🇸🇦 Saudi Arabia')
            flags.set('Solomon Islands', '🇸🇧 Solomon Islands')
            flags.set('Seychelles', '🇸🇨 Seychelles')
            flags.set('Sudan', '🇸🇩 Sudan')
            flags.set('.S. Virgin Islands', '🇻🇮 U.S. Virgin Islands')
            flags.set('Vietnam', '🇻🇳 Vietnam')
            flags.set('Samoa', '🇼🇸 Samoa')
            flags.set('Wallis & Futuna', '🇼🇫 Wallis & Futuna')
            flags.set('Kosovo', '🇽🇰 Kosovo')
            flags.set('Mayotte', '🇾🇹 Mayotte')
            flags.set('South Africa', '🇿🇦 South Africa')
            flags.set('Uzbekistan', '🇺🇿 Uzbekistan')
            flags.set('Vatican City', '🇻🇦 Vatican City')
            flags.set('Uganda', '🇺🇬 Uganda')
            flags.set('U.S. Outlying Islands', '🇺🇲 U.S. Outlying Islands')
            flags.set('United Nations', '🇺🇳 United Nations')
            flags.set('United States', '🇺🇸 United States')
            flags.set('Trinidad & Tobago', '🇹🇹 Trinidad & Tobago')
            flags.set('Tuvalu', '🇹🇻 Tuvalu')
            flags.set('Taiwan', '🇹🇼 Taiwan')
            flags.set('Eswatini', '🇸🇿 Eswatini')
            flags.set('Tristan Da Cunha', '🇹🇦 Tristan Da Cunha')
            flags.set('Turks & Caicos Islands', '🇹🇨 Turks & Caicos Islands')
            flags.set('Chad', '🇹🇩 Chad')
            flags.set('French Southern Territories', '🇹🇫 French Southern Territories')
            flags.set('Togo', '🇹🇬 Togo')
            flags.set('Tokelau', '🇹🇰 Tokelau')
            flags.set('Timor-Leste', '🇹🇱 Timor-Leste')
            flags.set('Turkmenistan', '🇹🇲 Turkmenistan')
            flags.set('Tonga', '🇹🇴 Tonga')
            flags.set('St. Helena', '🇸🇭 St. Helena')
            flags.set('Svalbard & Jan Mayen', '🇸🇯 Svalbard & Jan Mayen')
            flags.set('Sierra Leone', '🇸🇱 Sierra Leone')
            flags.set('Senegal', '🇸🇳 Senegal')
            flags.set('Suriname', '🇸🇷 Suriname')
            flags.set('South Sudan', '🇸🇸 South Sudan')
            flags.set('São Tomé & Príncipe', '🇸🇹 São Tomé & Príncipe')
            flags.set('Sint Maarten', '🇸🇽 Sint Maarten')
            flags.set('Antigua & Barbuda', '🇦🇬 Antigua & Barbuda')
            flags.set('Anguilla', '🇦🇮 Anguilla')
            flags.set('Angola', '🇦🇴 Angola')
            flags.set('Antarctica', '🇦🇶 Antarctica')
            flags.set('Argentina', '🇦🇷 Argentina')
            flags.set('American Samoa', '🇦🇸 American Samoa')
            flags.set('Austria', '🇦🇹 Austria')
            flags.set('Aruba', '🇦🇼 Aruba')
            flags.set('Aland Islands', '🇦🇽 Åland Islands')
            flags.set('Azerbaijan', '🇦🇿 Azerbaijan')
            flags.set('Burkina Faso', '🇧🇫 Burkina Faso')
            flags.set('Bulgaria', '🇧🇬 Bulgaria')
            flags.set('Bahrain', '🇧🇭 Bahrain')
            flags.set('Burundi', '🇧🇮 Burundi')
            flags.set('St. Barthélemy', '🇧🇱 St. Barthélemy')
            flags.set('Bermuda', '🇧🇲 Bermuda')
            flags.set('Brunei', '🇧🇳 Brunei')
            flags.set('Bolivia', '🇧🇴 Bolivia')
            flags.set('Caribbean Netherlands', '🇧🇶 Caribbean Netherlands')
            flags.set('Brazil', '🇧🇷 Brazil')
            flags.set('Bahamas', '🇧🇸 Bahamas')
            flags.set('Bhutan', '🇧🇹 Bhutan')
            flags.set('Bouvet Island', '🇧🇻 Bouvet Island')
            flags.set('Botswana', '🇧🇼 Botswana')
            flags.set('Spain', '🇪🇸 Spain')
            flags.set('Ethiopia', '🇪🇹 Ethiopia')
            flags.set('European Union', '🇪🇺 European Union')
            flags.set('Finland', '🇫🇮 Finland')
            flags.set('Fiji', '🇫🇯 Fiji')
            flags.set('Falkland Islands', '🇫🇰 Falkland Islands')
            flags.set('Micronesia', '🇫🇲 Micronesia')
            flags.set('Faroe Islands', '🇫🇴 Faroe Islands')
            flags.set('Gabon', '🇬🇦 Gabon')
            flags.set('Grenada', '🇬🇩 Grenada')
            flags.set('French Guiana', '🇬🇫 French Guiana')
            flags.set('Ghana', '🇬🇭 Ghana')
            flags.set('Gibraltar', '🇬🇮 Gibraltar')
            flags.set('Greenland', '🇬🇱 Greenland')
            flags.set('Guinea', '🇬🇳 Guinea')
            flags.set('Guadeloupe', '🇬🇵 Guadeloupe')
            flags.set('Equatorial Guinea', '🇬🇶 Equatorial Guinea')
            flags.set('Greece', '🇬🇷 Greece')
            flags.set('South Georgia & South Sandwich Islands', '🇬🇸 South Georgia & South Sandwich Islands')
            flags.set('Guatemala', '🇬🇹 Guatemala')
            flags.set('Guam', '🇬🇺 Guam')
            flags.set('Guinea-Bissau', '🇬🇼 Guinea-Bissau')
            flags.set('Guyana', '🇬🇾 Guyana')
            flags.set('Congo - Kinshasa', '🇨🇩 Congo - Kinshasa')
            flags.set('Cocos (Keeling) Islands', '🇨🇨 Cocos (Keeling) Islands')
            flags.set('Belize', '🇧🇿 Belize')
            flags.set('Congo - Brazzaville', '🇨🇬 Congo - Brazzaville')
            flags.set('Côte d’Ivoire', '🇨🇮 Côte d’Ivoire')
            flags.set('Cook Islands', '🇨🇰 Cook Islands')
            flags.set('Chile', '🇨🇱 Chile')
            flags.set('Cameroon', '🇨🇲 Cameroon')
            flags.set('Clipperton Island', '🇨🇵 Clipperton Island')
            flags.set('Costa Rica', '🇨🇷 Costa Rica')
            flags.set('Cuba', '🇨🇺 Cuba')
            flags.set('Curaçao', '🇨🇼 Curaçao')
            flags.set('Christmas Island', '🇨🇽 Christmas Island')
            flags.set('Diego Garcia', '🇩🇬 Diego Garcia')
            flags.set('Djibouti', '🇩🇯 Djibouti')
            flags.set('Denmark', '🇩🇰 Denmark')
            flags.set('Ceuta & Melilla', '🇪🇦 Ceuta & Melilla')
            flags.set('Ecuador', '🇪🇨 Ecuador')
            flags.set('Estonia', '🇪🇪 Estonia')
            flags.set('Egypt', '🇪🇬 Egypt')
            flags.set('Western Sahara', '🇪🇭 Western Sahara')
            flags.set('Yemen', '🇾🇪 Yemen')
            flags.set('Mali', '🇲🇱 Mali')

            return flags.get(name) || '🌎 Globally'
         },
         clearBeforeRoute() {
            this.UPDATE_DISPLAY_LIMIT(6);
            this.UPDATE_SANCTIONS_PAGE(1);
            this.UPDATE_CURRENT_PEP_PAGE(1);
            this.UPDATE_PEPs_OFFSET(0);
         },
         //  reportIssues(e) {
         //      if (this.issueReported) return;
         //      this.issueReported = true;

         //      this.commitIssuesWithData({
         //          message: 'Sanctions data issue',
         //          type: 'Sanctions data issue',
         //      }).then((res) => {
         //          e.target.innerHTML = `Reported successfully <ion-icon name="checkmark-done" style="vertical-align: middle; font-size: 1.3rem"></ion-icon>`
         //      }).catch((err) => {
         //          this.issueReported = false;
         //      })
         //  },
          moveSanctionsTo(pageNum) {
              this.UPDATE_SANCTIONS_PAGE(pageNum);
              this.fetchAndUpdateSanctions()
          },
          toggleOffcanvas(options) {
               const {
                  entity, 
                  id
               } = options;
               const offcanvasses = {
                  sanction: {
                     show: () => {this.selectedSanction = this.allSanctions[id]},
                     hide: () => {this.selectedSanction = null},
                  },
                  PEP: {
                     show: () => {this.setSelectePEP(id)},
                     hide: () => {this.setSelectePEP()},
                  }
               }
               if(id === null || id === undefined){
                  document.body.style.overflow = 'auto';
                  offcanvasses[entity].hide()
               } else {
                  document.body.style.overflow = 'hidden';
                  offcanvasses[entity].show()
               }
               

          },
          getOriginFromURL(url) {
              url = new URL(url);
              return url.origin;
          },
          preloaderForElement(options) {
            const {
               selector,
               status
            } = options;
            const $el = document.querySelector(selector);
            const cssObj = window.getComputedStyle($el, null);
            let height = cssObj.getPropertyValue("height");

            const callbacks = {
               remove: () => {
                  $el.classList.remove('loading');
                  $el.style.height = 'auto';
               },
               add: () => {
                  $el.classList.add('loading');
                  $el.style.height = height;
               },
            }
            callbacks[status]()
            
          },
          downloadPDF(e) {
              (async () => {
                  e.target.setAttribute("disabled", "")
                  e.target.textContent = 'Generating'
                  const tableDataList = await this.fetchOFACsanctions({
                      limit: 50
                  });
                  const PEPsDataList = await this.fetchPEPs({
                     limit: 50,
                     offset: 0
                  })

                  const tablePeps = PEPsDataList.data.results
                  const tableSanctions = tableDataList.data.entities

                  const doc = new jsPDF();
                  const width = doc.internal.pageSize.getWidth(),
                      height = doc.internal.pageSize.getHeight();

                  doc.setFillColor('#2653ff');
                  doc.rect(0, 0, 300, 20, 'F');

                  const bold = Montserrat.bold;
                  const italic = Montserrat.italic;
                  const regular = Montserrat.regular;

                  doc.addFileToVFS('Montserrat-Bold-normal.ttf', bold);
                  doc.addFileToVFS('Montserrat-Italic-normal.ttf', italic);
                  doc.addFileToVFS('Montserrat-Regular-normal.ttf', regular);

                  doc.addFont('Montserrat-Bold-normal.ttf', 'Montserrat', 'bold');
                  doc.addFont('Montserrat-Italic-normal.ttf', 'Montserrat', 'italic');
                  doc.addFont('Montserrat-Regular-normal.ttf', 'Montserrat', 'regular');

                  doc.setFont('Montserrat', 'bold');
                  doc.setFontSize(20);

                  doc.text('Screening Partners', width - 25, 40, {
                      align: "right"
                  });
                  doc.setFontSize(10);
                  doc.text('Target Name:', 25, 90, {
                      align: "left"
                  });
                  doc.text('Date Of Search:', 25, 100, {
                      align: "left"
                  });
                  
                  // SEARCH RESULTS
                  doc.text('Potential Adverse Media:', 25, 110, {
                      align: "left"
                  });
                  doc.text('Potential Sanctions Matches:', 25, 120, {
                      align: "left"
                  });
                  doc.text('Potential Politically Exposed Persons Matches:', 25, 130, {
                      align: "left"
                  });



                  doc.setFont('Montserrat', 'bold');

                  doc.text(this.getTargetName, width - 25, 90, {
                      align: "right"
                  });
                  doc.text(moment().format('LL'), width - 25, 100, {
                      align: "right"
                  });
                  doc.text(`${this.allNews.length}`, width - 25, 110, {
                      align: "right"
                  });
                  doc.text(`${tableSanctions.length}`, width - 25, 120, {
                      align: "right"
                  });
                  doc.text(`${tablePeps.length}`, width - 25, 130, {
                      align: "right"
                  });


                  doc.setTextColor('#898989');
                  doc.setFont('Montserrat', 'italic');
                  doc.text('Our service does not guarantee the truthfulness', width - 25, 55, {
                      align: "right"
                  });
                  doc.text('correctness and completeness of the results generated. ', width - 25, 60, {
                      align: "right"
                  });
                  doc.text('All results are based on automatic searches of data from public sources.', width - 25, 65, {
                      align: "right"
                  });

                  const generateNewsTableBody = (data) => {
                      if (!data.length) return;
                      return data.reduce((acc, nextItem, indx) => {
                          acc.push([indx + 1, nextItem?.source, nextItem?.pubDate, nextItem?.title, nextItem?.url]);
                          return acc;
                      }, []);
                  };
                  const generateSanctionsTableBody = (data) => {
                      if (!data.length) return;
                      return data.reduce((acc, nextItem, indx) => {
                          acc.push([
                              indx + 1,
                              `${nextItem?.fullName}`,
                              nextItem?.SanctionAddresses[0]?.country || 'Globally',
                              nextItem?.authority || 'OFAC',
                              nextItem.SanctionPrograms.map(item => item.name).join(', '),
                              helpers.getFormatTimeString(nextItem?.pubDate, 'L')
                          ]);
                          return acc;
                      }, []);
                  };
                  const generatePEPsTableBody = (data) => {
                     if(!data.length) return;

                     return data.reduce((acc, nextItem, indx) => {
                        acc.push([
                           indx + 1,
                           nextItem.caption.toUpperCase(),
                           this.convertPEPData({
                            data: nextItem.properties.nationality,
                            callback: 'default',
                           }),
                           this.convertPEPData({
                            data: nextItem.properties.gender,
                            callback: 'default',
                           }),
                           this.convertPEPData({
                            data: nextItem.properties.birthPlace,
                            callback: 'default',
                           }),
                           this.convertPEPData({
                            data: nextItem.properties.birthDate,
                            callback: 'default',
                           })
                        ]);

                        return acc
                     }, [])
                  }
                  const newsTableBody = generateNewsTableBody(this.allNews);
                  const sanctionsTableBody = generateSanctionsTableBody(tableSanctions);
                  const pepsTableBody = generatePEPsTableBody(tablePeps)


                  // If array of news about target is not empty
                  if (newsTableBody) {
                      doc.setTextColor('#000')
                      doc.setFont('Montserrat', 'bold');
                      doc.text(`Potential Adverse Media: ${this.allNews.length}`, width / 2, 150, {
                          align: "center"
                      });
                      // // News table
                      autoTable(doc, {
                          // html: '#my-table',
                          head: [
                              ['#', 'Source', 'Date', 'Description', 'Link']
                          ],
                          body: newsTableBody,
                          startY: 160,
                          // startY: 130,
                          columnStyles: {
                              0: {
                                  cellWidth: 10,
                                  cellPadding: 0,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                                  fontStyle: 'bold'
                              },
                              1: {
                                  cellWidth: 25,
                                  cellPadding: 3,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                                  fontStyle: 'italic'
                              },
                              2: {
                                  cellWidth: 40,
                                  cellPadding: 5,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              3: {
                                  cellWidth: 50,
                                  cellPadding: 5,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              4: {
                                  cellWidth: 56.7793333333,
                                  cellPadding: 5,
                                  overflow: 'ellipsize',
                                  textColor: '#373941',
                                  fillColor: '#F8FAFF',
                                  halign: 'center',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                                  fontStyle: 'bold'
                              }
                          },
                          didParseCell: (data) => {
                              if (data.section === 'head') {
                                  data.cell.styles.fillColor = '#2653ff';
                                  data.cell.styles.textColor = '#f8f8f8';
                                  data.cell.styles.fontStyle = 'bold';
                                  data.cell.styles.lineColor = '#2553ff';
                                  data.cell.styles.halign = 'center';
                              }
                          },
                          willDrawCell: (data) => {
                              doc.setFont('Montserrat', 'regular')
                              if (data.section === 'body' && data.column.index === 4) {
                                  if (data.row.index < 0) return
                                  doc.setFont('Montserrat', 'bold')
                                  doc.textWithLink('________________________________', data.cell.x, data.cell.y + 7, {
                                      url: newsTableBody[data.row.index][4],
                                      overflow: 'ellipsize'
                                  })
                              }
                          },
                          didDrawPage: (data) => {

                              const width = doc.internal.pageSize.getWidth(),
                                  height = doc.internal.pageSize.getHeight();
                              doc.setFillColor('#2653ff')
                              doc.rect(0, height - 10, 300, 10, 'F');
                              doc.setTextColor('#f8f8f8')
                              doc.setFontSize(8)
                              doc.setFont('Montserrat', 'bold')
                              doc.text('Screening Partners © 2022 All right reserved', width / 2, height - 4, {
                                  align: "center"
                              })
                          }
                      })
                  }

                  // If array of sanctions related to target is not empty
                  if (sanctionsTableBody) {
                      let finalY = doc.previousAutoTable.finalY;
                      doc.setTextColor('#000');
                      doc.setFont('Montserrat', 'bold');
                      doc.text(`Potential Sanctions Matches: ${tableSanctions.length}`, width / 2, finalY + 20, {
                          align: "center"
                      });
                      // Sanctions table
                      const columnSizes = {
                          c1: width - 30 / 100 * 5.40540540541,
                          c2: width - 30 / 100 * 27.027027027,
                          c3: width - 30 / 100 * 16.2162162162,
                          c4: width - 30 / 100 * 18.9189189189,
                          c5: width - 30 / 100 * 18.9189189189,
                          c6: width - 30 / 100 * 13.5135135135,
                      };
                      autoTable(doc, {
                          // html: '#my-table',
                          head: [
                              ['#', 'Name', 'Country', 'Authority', 'Programs', 'Latest Update']
                          ],
                          startY: finalY + 30,
                          body: sanctionsTableBody,
                          columnStyles: {
                              0: {
                                  cellWidth: 10,
                                  cellPadding: 0,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                                  fontStyle: 'bold'
                              },
                              1: {
                                  cellWidth: 50,
                                  cellPadding: 3,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                                  fontStyle: 'italic'
                              },
                              2: {
                                  cellWidth: 30,
                                  cellPadding: 5,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              3: {
                                  cellWidth: 31.7793333,
                                  cellPadding: 5,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              4: {
                                  cellWidth: 35,
                                  cellPadding: 5,
                                  textColor: '#373941',
                                  fillColor: '#F8FAFF',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              5: {
                                  cellWidth: 25,
                                  cellPadding: 0,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                          },
                          willDrawCell(data) {
                           doc.setFont('Montserrat', 'regular')
                          },
                          didParseCell: (data) => {
                              if (data.section === 'head') {
                                  data.cell.styles.fillColor = '#2653ff';
                                  data.cell.styles.textColor = '#f8f8f8';
                                  data.cell.styles.fontStyle = 'bold';
                                  data.cell.styles.lineColor = '#2553ff';
                                  data.cell.styles.halign = 'center';
                              }
                          },
                          didDrawPage: (data) => {

                              const width = doc.internal.pageSize.getWidth(),
                                  height = doc.internal.pageSize.getHeight();
                              doc.setFillColor('#2653ff')
                              doc.rect(0, height - 10, 300, 10, 'F');
                              doc.setTextColor('#f8f8f8')
                              doc.setFontSize(8)
                              doc.setFont('Montserrat', 'bold')
                              doc.text('Screening Partners © 2022 All right reserved', width / 2, height - 4, {
                                  align: "center"
                              })
                          }
                      })
                  }

                  // If array of sanctions related to target is not empty
                  if (pepsTableBody) {
                      let finalY = doc.previousAutoTable.finalY;
                      doc.setTextColor('#000');
                      doc.setFont('Montserrat', 'bold');
                      doc.text(`Potential Politically Exposed Persons Matches: ${tablePeps.length}`, width / 2, finalY + 20, {
                          align: "center"
                      });
                      // Sanctions table
                      const columnSizes = {
                          c1: width - 30 / 100 * 5.40540540541,
                          c2: width - 30 / 100 * 30.027027027,
                          c3: width - 30 / 100 * 15.2162162162,
                          c4: width - 30 / 100 * 16.9189189189,
                          c5: width - 30 / 100 * 18.9189189189,
                          c6: width - 30 / 100 * 13.5135135135,
                      };
                      autoTable(doc, {
                          // html: '#my-table',
                          head: [
                              ['#', 'Full Name', 'Nationality', 'Gender', 'Birth Place', 'Birth Date']
                          ],
                          startY: finalY + 30,
                          body: pepsTableBody,
                          columnStyles: {
                              0: {
                                  cellWidth: 10,
                                  cellPadding: 0,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                                  fontStyle: 'bold'
                              },
                              1: {
                                  cellWidth: 40,
                                  cellPadding: 8,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                                  fontStyle: 'italic'
                              },
                              2: {
                                  cellWidth: 25,
                                  cellPadding: 5,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              3: {
                                  cellWidth: 26.7793333,
                                  cellPadding: 5,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              4: {
                                  cellWidth: 55,
                                  cellPadding: 5,
                                  textColor: '#373941',
                                  fillColor: '#F8FAFF',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                              5: {
                                  cellWidth: 25,
                                  cellPadding: 0,
                                  fillColor: '#F7FAFF',
                                  textColor: '#373941',
                                  halign: 'center',
                                  valign: 'middle',
                                  lineColor: '#373941',
                                  lineWidth: 0.1,
                              },
                          },
                          willDrawCell(data) {
                           doc.setFont('Montserrat', 'regular')
                          },
                          didParseCell: (data) => {
                              if (data.section === 'head') {
                                  data.cell.styles.fillColor = '#2653ff';
                                  data.cell.styles.textColor = '#f8f8f8';
                                  data.cell.styles.fontStyle = 'bold';
                                  data.cell.styles.lineColor = '#2553ff';
                                  data.cell.styles.halign = 'center';
                              }
                          },
                          didDrawPage: (data) => {

                              const width = doc.internal.pageSize.getWidth(),
                                  height = doc.internal.pageSize.getHeight();
                              doc.setFillColor('#2653ff')
                              doc.rect(0, height - 10, 300, 10, 'F');
                              doc.setTextColor('#f8f8f8')
                              doc.setFontSize(8)
                              doc.setFont('Montserrat', 'bold')
                              doc.text('Screening Partners © 2022 All right reserved', width / 2, height - 4, {
                                  align: "center"
                              })
                          }
                      })
                  }

                  // Report name template string
                  const reportCompanyName = this.getTargetName.split(/\s/gi).join('_');
                  const reportDate = this.getFormatTimeString(new Date(), "MM-DD-YYYY");
                  const reportFileName = `report_${reportCompanyName}_${reportDate}.pdf`;
                  
                  // Saving file with filename
                  doc.save(reportFileName);
                  e.target.removeAttribute("disabled")
                  e.target.textContent = 'Download PDF'
              })();
          }
      }
  }); 
</script>
<style>
.table-arrow {
   pointer-events: none !important;
   vertical-align: middle;
   color: #fff;
   visibility: visible !important;
}
.table-arrow.active {
   color: #ee6c4d !important;
}
.btn-pg.disabled {
   background: #e3e6f7;
   color: #000;
   cursor: default;
}
.peps-table {
   position: relative;
}
.loading::after {
   content: '';
   display: block;
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background: #F7FAFF;
   z-index: 12
}
.loading::before {
   content: 'Loading...';
   dipslay: block;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   color: #363b45;
   font-family: 'Montserrat';
   z-index: 13;
   font-weight: bold;
   font-size: 1.1rem;
   letter-spacing: 0.04rem;

}
</style>
