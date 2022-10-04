<template>
    <div class="v-table mt-10" style="max-width: 80%; margin: 200px auto;">
        <div class="v-table__title title text-center mb-2">
            <div class="title__body">{{title}}</div>
        </div>
        <div class="v-table__table">
            <div class="v-table__head">
                <div class="v-table__head-row v-table__row">
                    <div 
                    v-for="column, i in columns"
                    :key="i"
                    class="v-table__head-cell v-table__cell text-center"
                    >{{column}}</div>
                    
                </div>
            </div>
            <div class="v-table__body">
                <TableRow
                v-for="row, r in rows"
                :key="r"
                :rowData="row"
                />
            </div>
        </div>

        <div class="v-table__pagination"></div>
    </div>
</template>

<script>
import TableRow from "@/components/tables/V-TableRow.vue"
export default {
  name: 'VTable',
  components: {
    TableRow
  },
  props: {
    title: String,
    columns: Array,
    rows: Array,
  }
}
</script>

<style lang="scss">
</style>