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
                        <div class="row mb-2"><span class="title">{{fullName}}</span></div>
                        <div class="row container card__row" v-if="type">
                            <div class="col-6 text-left card__row-key"><span>Type</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{type}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="firstName">
                            <div class="col-6 text-left card__row-key"><span>First Name</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{firstName}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="secondName">
                            <div class="col-6 text-left card__row-key"><span>Second Name</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{secondName}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="lastName">
                            <div class="col-6 text-left card__row-key"><span>Last Name</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{lastName}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="fatherName">
                            <div class="col-6 text-left card__row-key"><span>Father Name</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{fatherName}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="gender">
                            <div class="col-6 text-left card__row-key"><span>Gender</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{gender}}</span></div>
                        </div>                    
                        <div class="row container card__row" v-if="nationality">
                            <div class="col-6 text-left card__row-key"><span>Nationality</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{nationality}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="country">
                            <div class="col-6 text-left card__row-key"><span>Country</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{country}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="birthDate">
                            <div class="col-6 text-left card__row-key"><span>Date of Birth</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{birthDate}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="birthPlace">
                            <div class="col-6 text-left card__row-key"><span>Place of Birth</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{birthPlace}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="deathDate">
                            <div class="col-6 text-left card__row-key"><span>Date of Death</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{deathDate}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="status">
                            <div class="col-6 text-left card__row-key"><span>Status</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{status}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="religion">
                            <div class="col-6 text-left card__row-key"><span>Religion</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{religion}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="innCode">
                            <div class="col-6 text-left card__row-key"><span>INN Code</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{innCode}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="website">
                            <div class="col-6 text-left card__row-key"><span>Website</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{website}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="modifiedAt">
                            <div class="col-6 text-left card__row-key"><span>Modified At</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{modifiedAt}}</span></div>
                        </div>  
                        <div class="row container card__row" v-if="createdAt">
                            <div class="col-6 text-left card__row-key"><span>Created At</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{createdAt}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="nameVariations">
                            <div class="col-6 text-left card__row-key"><span>Name Variations</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{nameVariations}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="sourceUrl">
                            <div class="col-6 text-left card__row-key"><span>Source URL</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{sourceUrl}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="education">
                            <div class="col-6 text-left card__row-key"><span>Education</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{education}}</span></div>
                        </div>
                        <div class="row container card__row" v-if="ethnicity">
                            <div class="col-6 text-left card__row-key"><span>Ethnicity</span></div>
                            <div class="col-6 text-right card__row-value"><span>{{ethnicity}}</span></div>
                        </div>
                   
                        <div class="row card__row" v-if="position">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Person`s Position</div>
                            <table class="table">
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell">Position Name</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr 
                                        v-for="p, i in position" 
                                        :key="i"
                                        class="table__body-row"
                                    >
                                        <td class="table__body-cell">{{p}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row card__row" v-if="aliases">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Person`s Name</div>
                            <table class="table">
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell">Name</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr 
                                        v-for="alias, i in aliases" 
                                        :key="i"
                                        class="table__body-row"
                                    >
                                        <td class="table__body-cell">{{alias}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 

                        <div class="row card__row" v-if="weakAlias">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Weak Aliases</div>
                            <table class="table">
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell">Name</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr 
                                        v-for="alias, i in weakAlias" 
                                        :key="i"
                                        class="table__body-row"
                                    >
                                        <td class="table__body-cell">{{alias}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        


                        <div class="row card__row" v-if="notes">
                            <div class="title search__header mt-3" style="margin-bottom: 20px">Notes</div>
                            <table class="table">
                                <thead class="table__head">
                                    <tr class="table__head-row">
                                        <th class="table__head-cell">Note</th>
                                    </tr>
                                </thead>
                                <tbody class="table__body">
                                    <tr 
                                        v-for="note, i in notes" 
                                        :key="i"
                                        class="table__body-row"
                                    >
                                        <td class="table__body-cell">{{note}}</td>
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
    name: 'VPepModal',
    props: {
        _id: String
    },
    computed: {
        ...mapGetters('components-logic', [
            "activeModalWindow"
        ]),
        type(){return this.activeModalWindow.data.type},
        fullName(){return this.activeModalWindow.data.fullName},
        firstName(){
            if(this.activeModalWindow.data.firstName){
                return this.activeModalWindow.data.firstName.join(', ')
            } else {
                return ''
            }
        },
        secondName(){
            if(this.activeModalWindow.data.secondName){
                return this.activeModalWindow.data.secondName.join(', ')
            } else {
                return ''
            }
        },
        lastName(){
            if(this.activeModalWindow.data.lastName){
                return this.activeModalWindow.data.lastName.join(', ')
            } else {
                return ''
            }
        },

        fatherName(){
            if(this.activeModalWindow.data.fatherName){
                return this.activeModalWindow.data.fatherName.join(', ')
            } else {
                return ''
            }
        },

        gender(){
            if(this.activeModalWindow.data.gender){
                return this.activeModalWindow.data.gender.join(', ')
            } else {
                return ''
            }
        },
        nationality(){
            if(this.activeModalWindow.data.nationality){
                return this.activeModalWindow.data.nationality.join(', ')
            } else {
                return ''
            }
        },
        country(){
            if(this.activeModalWindow.data.country){
                return this.activeModalWindow.data.country.join(', ')
            } else {
                return ''
            }
        },
        birthDate(){
            if(this.activeModalWindow.data.birthDate){
                return this.activeModalWindow.data.birthDate.join(', ')
            } else {
                return ''
            }
        },
        birthPlace(){
            if(this.activeModalWindow.data.birthPlace){
                return this.activeModalWindow.data.birthPlace.join(', ')
            } else {
                return ''
            }
        },
        deathDate(){
            if(this.activeModalWindow.data.deathDate){
                return this.activeModalWindow.data.deathDate.join(', ')
            } else {
                return ''
            }
        },
        status(){
            if(this.activeModalWindow.data.status){
                return this.activeModalWindow.data.status.join(', ')
            } else {
                return ''
            }
        },
        religion(){
            if(this.activeModalWindow.data.religion){
                return this.activeModalWindow.data.religion.join(', ')
            } else {
                return ''
            }
        },
        innCode(){
            if(this.activeModalWindow.data.innCode){
                return this.activeModalWindow.data.innCode.join(', ')
            } else {
                return ''
            }
        },
        website(){
            if(this.activeModalWindow.data.website){
                return this.activeModalWindow.data.website.join(', ')
            } else {
                return ''
            }
        },
        modifiedAt(){
            if(this.activeModalWindow.data.modifiedAt){
                return this.activeModalWindow.data.modifiedAt.join(', ')
            } else {
                return ''
            }
        },
        createdAt(){
            if(this.activeModalWindow.data.createdAt){
                return this.activeModalWindow.data.createdAt.join(', ')
            } else {
                return ''
            }
        },
        nameVariations(){
            if(this.activeModalWindow.data.nameVariations){
                return this.activeModalWindow.data.nameVariations.join(', ')
            } else {
                return ''
            }
        },
        sourceUrl(){
            if(this.activeModalWindow.data.sourceUrl){
                return this.activeModalWindow.data.sourceUrl.join(', ')
            } else {
                return ''
            }
        },
        education(){
            if(this.activeModalWindow.data.education){
                return this.activeModalWindow.data.education.join(', ')
            } else {
                return ''
            }
        },
        ethnicity(){
            if(this.activeModalWindow.data.ethnicity){
                return this.activeModalWindow.data.ethnicity.join(', ')
            } else {
                return ''
            }
        },
        
        notes(){return this.activeModalWindow.data.notes},
        aliases(){return this.activeModalWindow.data.aliases},
        weakAlias(){return this.activeModalWindow.data.weakAlias},
        position(){return this.activeModalWindow.data.position},



        
        

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