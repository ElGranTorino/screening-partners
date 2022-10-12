<template lang="">
    <div  v-if="activeModalWindow.id === _id" class="v-modal" >
        <div class="v-modal__backdrop" @click="removeActiveModalWindow()"></div>
        <div class="v-modal__container card">
            <form>
                <div class="v-modal__head">
                <!-- <button class="btn btn--bg-light-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-m</title><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>
                </button> -->
                </div>
                <div class="v-modal__body">
                    <div class="v-modal__content">
                        <div class="row mb-2"><span class="title">{{name}}</span></div>
                        <div class="row container card__row">
                            <div class="col-6 text-left card__row-key"><span>Type</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{type}}</span></div>
                        </div>
                        <div class="row container card__row">
                            <div class="col-6 text-left card__row-key"><span>Authority</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{authority}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="program">
                            <div class="col-6 text-left card__row-key"><span>Current Programm</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{program}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="list">
                            <div class="col-6 text-left card__row-key"><span>List</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{list}}</span></div>
                        </div> 
                        <div class="row container card__row" v-if="website">
                            <div class="col-6 text-left card__row-key"><span>Website</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{website}}</span></div>
                        </div> 
                        <div class="row container card__row">
                            <div class="col-6 text-left card__row-key"><span>Sanctioned since</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{pubDate}}</span></div>
                        </div>
                        <div class="row container card__row">
                            <div class="col-6 text-left card__row-key"><span>Latest updated</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{created}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="remarks">
                            <div class="col-6 text-left card__row-key"><span>Remarks</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{remarks}}</span></div>
                        </div>  
                              
                        <div class="row card__row" v-if="details.length">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Generall info</div>
                            <table class="table">
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell">Key</th>
                                        <th class="table__head-cell">Value</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr 
                                        v-for="info in details" 
                                        :key="info.id"
                                        class="table__body-row"
                                    >
                                        <td class="table__body-cell">{{info.key}}</td>
                                        <td class="table__body-cell">{{info.value}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row card__row" v-if="addresses.length">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Address</div>
                            <table 
                                v-for="location in addresses"
                                :key="location.id"
                                class="table"
                            >
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell" v-if="location.address">Street</th>
                                        <th class="table__head-cell" v-if="location.city">City</th>
                                        <th class="table__head-cell" v-if="location.country">Country</th>
                                        <th class="table__head-cell" v-if="location.stateOrProvince">State</th>
                                        <th class="table__head-cell" v-if="location.postalCode">Postal Code</th>
                                        <th class="table__head-cell" v-if="location.zipCode">Zip Code</th>
                                        <th class="table__head-cell" v-if="location.note">Note</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr class="table__body-row" >
                                        <td class="table__body-cell" v-if="location.address">{{location.address}}</td>
                                        <td class="table__body-cell" v-if="location.city">{{location.city}}</td>
                                        <td class="table__body-cell" v-if="location.country">{{location.country}}</td>
                                        <td class="table__body-cell" v-if="location.stateOrProvince">{{location.stateOrProvince}}</td>
                                        <td class="table__body-cell" v-if="location.postalCode">{{location.postalCode}}</td>
                                        <td class="table__body-cell" v-if="location.zipCode">{{location.zipCode}}</td>
                                        <td class="table__body-cell" v-if="location.note">{{location.note}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row card__row" v-if="aliases.length">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Alternative Names</div>
                            <table  class="table">
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell">Name</th>
                                        
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr class="table__body-row" 
                                        v-for="alias, i in aliases"
                                        :key="i"
                                    >
                                        <td class="table__body-cell">{{alias.fullName}}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row card__row" v-if="nationatilities.length">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Nationality</div>
                            <table 
                                v-for="ethnos, i in nationatilities"
                                :key="i"
                                class="table"
                            >
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell" v-if="ethnos.type">Type</th>
                                        <th class="table__head-cell" v-if="ethnos.country">County</th>
                                        <th class="table__head-cell" v-if="ethnos.address">Address</th>
                                        <th class="table__head-cell" v-if="ethnos.city">City</th>
                                        <th class="table__head-cell" v-if="ethnos.postalCode">State Or Province</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr class="table__body-row" >
                                        <td class="table__body-cell" v-if="ethnos.type">{{ethnos.type}}</td>
                                        <td class="table__body-cell" v-if="ethnos.country">{{ethnos.country}}</td>
                                        <td class="table__body-cell" v-if="ethnos.address">{{ethnos.address}}</td>
                                        <td class="table__body-cell" v-if="ethnos.city">{{ethnos.city}}</td>
                                        <td class="table__body-cell" v-if="ethnos.stateOrProvince">{{ethnos.stateOrProvince}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row card__row" v-if="documents.length">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Nationality</div>
                            <table 
                                v-for="doc, i in documents"
                                :key="i"
                                class="table"
                            >
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell" v-if="doc.type">Type</th>
                                        <th class="table__head-cell" v-if="doc.number">ID</th>
                                        <th class="table__head-cell" v-if="doc.country">Country</th>
                                        <th class="table__head-cell" v-if="doc.city">City</th>
                                        <th class="table__head-cell" v-if="doc.date">Date</th>
                                        <th class="table__head-cell" v-if="doc.note">Note</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr class="table__body-row" >
                                        <td class="table__body-cell" v-if="doc.type">{{doc.type}}</td>
                                        <td class="table__body-cell" v-if="doc.number">{{doc.number}}</td>
                                        <td class="table__body-cell" v-if="doc.country">{{doc.country}}</td>
                                        <td class="table__body-cell" v-if="doc.city">{{doc.city}}</td>
                                        <td class="table__body-cell" v-if="doc.date">{{doc.date}}</td>
                                        <td class="table__body-cell" v-if="doc.note">{{doc.note}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="v-modal__footer">
                    <button class="btn btn--bg-light-gray" type="button" @click="removeActiveModalWindow()">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
// Importing VueX environment
import {mapGetters, mapMutations} from "vuex";
// import moment from "moment";

export default {
    name: 'VSanctionModal',
    props: {
        _id: String
    },
    computed: {
        ...mapGetters('components-logic', [
            "activeModalWindow"
        ]),
        name() {return this.activeModalWindow.data.fullName},
        type() {return this.activeModalWindow.data.type},
        authority() {return this.activeModalWindow.data.authority},
        program() {
            if(this.activeModalWindow.data.SanctionPrograms.length){
                return this.activeModalWindow.data.SanctionPrograms.map((i) => i.name).join(', ')
            } else {
                return false
            }
        },
        list(){ return this.activeModalWindow.data.list },
        website(){return this.activeModalWindow.data.website},
        pubDate(){return this.activeModalWindow.data.pubDate},
        created(){return this.activeModalWindow.data.created},
        remarks(){return this.activeModalWindow.data.remarks},
        details(){return this.activeModalWindow.data.SanctionInfos},
        addresses(){
            return this.activeModalWindow.data.SanctionAddresses
        },
        aliases(){
            return this.activeModalWindow.data.SanctionAliases
        },
        documents(){
            return this.activeModalWindow.data.SanctionDocuments
            
        },
        nationatilities(){
            return this.activeModalWindow.data.SanctionNationalities
        }

        

    },
    methods: {
        ...mapMutations("components-logic", [
            "addActiveModalWindow",
            "removeActiveModalWindow",
        ]),
        
    
       
    }
}
</script>
<style lang="sass" scoped>
</style>