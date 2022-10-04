<template>
    <div class="v-table__body-row v-table__row">
        <div 
        v-for="col, i in rowData"
        :key="i"
        class="v-table__body-cell v-table__cell text-center"
        ><span>{{col}}</span></div>

        <div class="v-table__body-cell v-table__cell text-center">
            <button class="toggle">
                <input id="checkbox1" type="checkbox"  class="toggle__checkbox">
                <label for="checkbox1" class="toggle__label"></label>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        rowData: String
    }
}
</script>
<style lang="">
    
</style>