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
                    <div class="container">
                        <div class="col-12">
                            <div class="row mb-2"><span class="title">HUAWEI TECHNOLOGIES (BOLIVIA) S.R.L.</span></div>
                        </div>
                        <div class="col-6">
                            
                            <div class="row mb-1 card__row-key"><span>Type</span></div>
                            <div class="row mb-1 card__row-key"><span>Current program</span></div>
                            <div class="row mb-1 card__row-key"><span>Authority</span></div>
                            <div class="row mb-1 card__row-key"><span>List</span></div>
                            <div class="row mb-1 card__row-key"><span>Source</span></div>
                            <div class="row mb-1 card__row-key"><span>Latest updated</span></div>
        
                            <div class="row mb-1 card__row-key"><span>Type</span></div>
                            <div class="row mb-1 card__row-key"><span>Current program</span></div>
                            <div class="row mb-1 card__row-key"><span>Authority</span></div>
                            <div class="row mb-1 card__row-key"><span>List</span></div>
                            <div class="row mb-1 card__row-key"><span>Source</span></div>
                            <div class="row mb-1 card__row-key"><span>Latest updated</span></div>
        
                            
                        </div>
                        <div class="col-6 text-right">
                            
                            <div class="row mb-1 card__row-value"><span>{{activeModalWindow.data.type}}</span></div>
                            <div class="row mb-1 card__row-value"><span>CMIC-95431</span></div>
                            <div class="row mb-1 card__row-value"><span>{{activeModalWindow.data.authority}}</span></div>
                            <div class="row mb-1 card__row-value"><span>El</span></div>
                            <div class="row mb-1 card__row-value"><a href="#">http://www.bis.doc.gov</a></div>
                            <div class="row mb-1 card__row-value"><span>09/12/2022</span></div>


                               <div class="row mb-1 card__row-value"><span>{{activeModalWindow.data.type}}</span></div>
                            <div class="row mb-1 card__row-value"><span>CMIC-95431</span></div>
                            <div class="row mb-1 card__row-value"><span>{{activeModalWindow.data.authority}}</span></div>
                            <div class="row mb-1 card__row-value"><span>El</span></div>
                            <div class="row mb-1 card__row-value"><a href="#">http://www.bis.doc.gov</a></div>
                            <div class="row mb-1 card__row-value"><span>09/12/2022</span></div>
                            

                        </div>
                    </div>
                </div>
                <div class="v-modal__footer">
                    <button class="btn btn--bg-light-gray" type="button" @click="removeActiveModalWindow()">Cancel</button>
                    <button class="btn btn--bg-blue" type="submit">Select Target</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
// Importing VueX environment
import {mapGetters, mapMutations} from "vuex";


export default {
    name: 'VSanctionModal',
    props: {
        _id: String
    },
    computed: {
        ...mapGetters('components-logic', [
            "activeModalWindow"
        ]),
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
.v-modal__footer
    position: fixed
    left: 0
    bottom: 0
</style>