<template>
<div class="offcanvas" v-if="offcanvasData">
    <div class="offcanvas__container">
       <div class="offcanvas__backdrop"></div>
       <div class="offcanvas__body">
          <button class="btn">
             <ion-icon name="chevron-back" style="vertical-align: middle; line-height: 0;"></ion-icon>
             <span style="vertical-align: middle; margin: 0 0.5rem 0" @click="toggleOffcanvas()">Back</span>  
          </button>
          <div class="offcanvas__entity">
             <div class="offcanvas__entity-name title mb-2">Gazprom Energo</div>
             <div class="offcanvas__entity-type d-flex justify-between">
                <span class="offcanvas__key">Type</span>
                <span class="offcanvas__value">{{offcanvasData.type}}</span>
             </div>
             <div class="offcanvas__entity-programm d-flex justify-between mt-1">
                <span class="offcanvas__key">Current program</span>
                <span class="offcanvas__value">UKRAINE-EO13662</span>
             </div>
             <div class="offcanvas__entity-update d-flex justify-between mt-1">
                <span class="offcanvas__key">Latest update</span>
                <span class="offcanvas__value">2016-09-01</span>
             </div>
             <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                <span class="offcanvas__key">Authority</span>
                <span class="offcanvas__value">OFAC</span>
             </div>
             <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                <span class="offcanvas__key">Status</span>
                <span class="tag tag--warning tag--entity offcanvas__value" style="margin: 0">Active</span>
             </div>
             <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                <span class="offcanvas__key">Date added</span>
                <span class="offcanvas__value">2012-08-01</span>
             </div>
             <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                <span class="offcanvas__key">Reference</span>
                <span class="offcanvas__value">2012-08-01</span>
             </div>
             <div class="delimiter mt-2 mb-2"></div>
             <div class="offcanvas__tabs tabs">
                <div class="tabs__container">
                   <div class="tabs__head">
                      <button class="tabs__head-item ">Alias</button>
                      <button class="tabs__head-item tabs__head-item--active">Identification</button>
                      <button class="tabs__head-item">Address</button>  
                   </div>
                   <div class="tabs__body">
                      <div class="tabs__body-item">
                         <table class="search__sanctions-table table fullwidth">
                            <thead class="table__head">
                               <tr class="table__head-row">
                                  <th class="table__head-cell search__sanctions-td">Id type</th>
                                  <th class="table__head-cell search__sanctions-td">Id number</th>
                               </tr>
                            </thead>
                            <tbody class="table__body">
                               <tr class="table__body-row">
                                  <th class="table__body-cell search__sanctions-td">Registration Number</th>
                                  <th class="table__body-cell search__sanctions-td">1072308003063</th>
                               </tr>
                               <tr class="table__body-row">
                                  <th class="table__body-cell search__sanctions-td">Tax ID No.</th>
                                  <th class="table__body-cell search__sanctions-td">2308128945</th>
                               </tr>
                               <tr class="table__body-row">
                                  <th class="table__body-cell search__sanctions-td">Website</th>
                                  <th class="table__body-cell search__sanctions-td">Krasnodar-tr.gazprom.ru</th>
                               </tr>
                               <tr class="table__body-row">
                                  <th class="table__body-cell search__sanctions-td">Email Address</th>
                                  <th class="table__body-cell search__sanctions-td"><a href="#" mailto="d.matutin@tgk.gazprom.ru">d.matutin@tgk.gazprom.ru</a></th>
                               </tr>
                               <tr class="table__body-row">
                                  <th class="table__body-cell search__sanctions-td">Website</th>
                                  <th class="table__body-cell search__sanctions-td"><a href="http://www.treasury.gov/resource">http://www.treasury.gov/resource</a></th>
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
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
    props: ["offcanvasData"],
})
</script>
