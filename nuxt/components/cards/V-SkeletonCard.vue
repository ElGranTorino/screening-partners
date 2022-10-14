<template>
    <article class="v-newscard card skeleton">
        <div class="v-newscard__container skeleton__container">
            <div class="v-newscard__date skeleton__date">
                <div class="skeleton-text" style="max-width: 40%"></div>
            </div>
            <div class="v-newscard__title title">
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
            </div>
            <div class="v-newscard__body paragraph">
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
            </div>
        </div> 
    </article>
</template>

<script>

export default {
  name: 'VSkeletonCard',
}
</script>

<style lang="sass">
.skeleton-text
  display: inline-block
  height: 1rem
  width: 100%
  animation: skeleton 1s linear infinite alternate
  &:last-child
    width: 80%
.skeleton
  &__container
    width: 100%
</style>