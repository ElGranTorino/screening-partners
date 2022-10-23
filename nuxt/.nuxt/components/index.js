export { default as CardsVChartCard } from '../../components/cards/V-ChartCard.vue'
export { default as CardsVNewsCard } from '../../components/cards/V-NewsCard.vue'
export { default as CardsVPepCard } from '../../components/cards/V-PepCard.vue'
export { default as CardsVSanctionCard } from '../../components/cards/V-SanctionCard.vue'
export { default as CardsVSkeletonCard } from '../../components/cards/V-SkeletonCard.vue'
export { default as CardsVTableCard } from '../../components/cards/V-TableCard.vue'
export { default as GenerallVNavbar } from '../../components/generall/V-Navbar.vue'
export { default as GenerallVToast } from '../../components/generall/V-Toast.vue'
export { default as NavigationVStatusBar } from '../../components/navigation/V-StatusBar.vue'
export { default as NavigationVStepsBar } from '../../components/navigation/V-StepsBar.vue'
export { default as PaginationVPaginationDefault } from '../../components/pagination/V-PaginationDefault.vue'
export { default as SectionsVFooter } from '../../components/sections/V-Footer.vue'
export { default as SectionsVSteps } from '../../components/sections/V-Steps.vue'
export { default as TablesVTable } from '../../components/tables/V-Table.vue'
export { default as TablesVTableRow } from '../../components/tables/V-TableRow.vue'
export { default as ModalsVNewsModal } from '../../components/modals/V-NewsModal.vue'
export { default as ModalsVPdfModal } from '../../components/modals/V-PdfModal.vue'
export { default as ModalsVPepModal } from '../../components/modals/V-PepModal.vue'
export { default as ModalsVSanctionModal } from '../../components/modals/V-SanctionModal.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
