<template>
    <article class="v-chartcard card">
        <div class="v-chartcard__container">
            <div class="v-chartcard__head mt-1">
                <div class="v-chartcard__title">{{title}}</div>
                <div class="v-chartcard__dropdown arrow-dropdown">{{sortBy}}</div>
            </div>
            <div class="v-chartcard__body mt-2">
                <div class="v-chartcard__canvas pr-1">
                    <bar-chart v-if="chartType === 'bar'"
                    :chart-options='chartOptions'
                    :chart-data='chartData'
                    class="chart v-chartcard__chart"
                    />
                    <line-chart v-if="chartType === 'line'"
                    :chart-options='chartOptions'
                    :chart-data='chartData'
                    class="chart v-chartcard__chart"
                    />
                    <doughnut-chart v-if="chartType === 'doughnut'"
                    :chart-options='chartOptions'
                    :chart-data='chartData'
                    class="chart v-chartcard__chart"
                    />
                    <pie-chart v-if="chartType === 'pie'"
                    :chart-options='chartOptions'
                    :chart-data='chartData'
                    class="chart v-chartcard__chart"
                    />
                </div>
            </div>
        </div> 
    </article>
</template>

<script>
export default {
  name: 'VNewsCard',
  props: {
		title: String,
		sortBy: String,
		chartType: String,
		chartOptions: Object,
		chartData: Object,
		chartStyle: String
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
</style>