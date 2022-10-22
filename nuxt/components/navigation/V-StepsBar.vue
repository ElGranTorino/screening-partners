<template>
	<nav class="nav">
		<div class="nav__container">
			<div class="nav__brand brand">
				<NuxtLink to="/" class="brand__link interact">
                    <img src="@/static/img/Brand.jpg" style="max-width: 220px">
				</NuxtLink>
			</div>
			<div class="nav__steps">
				<ul class="nav__list">
					<li class="nav__item" :class="{'active': step >= 0}">
						<span class="nav__item-count">1</span>
						<span class="nav__item-text">Entering Target Name</span>
					</li>
					<li class="nav__item " :class="{'active': step >= 1}">
						<span class="nav__item-count">2</span>
						<span class="nav__item-text">Collecting Data</span>
					</li>
					<li class="nav__item " :class="{'active': step >= 2}">
						<span class="nav__item-count">3</span>
						<span class="nav__item-text">Showing results</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="nav__progress"></div>
	</nav>
</template>
<script>
export default {
  name: 'SearchSteps',
  props: {
    step: Number
  },
  data(){
    return {
        getStep: 0
    }
  },
};

</script>

<style lang="sass">
.nav
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100px
    background: #fff
    border-bottom: solid 2px rgba(#000, .05)
    z-index: 999
    &__progress
        position: absolute
        top: 100%
        left: 0
        width: calc(100% / 3 * 3)
        height: 3px
        background: #222fe6
    &__container
        max-width: 90%
        height: 100%
        margin: 0 5% 0
        display: flex
        align-items: center
        justify-content: space-between
    &__list
        list-style-type: none
    &__item
        display: inline-block
        margin: 0 1.5rem
        position: relative
        &::after
            display: block
            content: ''
            width: 24px
            height: 2px
            background: rgba(#B9B9C4, .3)
            position: absolute
            left: calc(100% + 0.75rem)
            top: 50%
            transform: translateY(-50%)
        &:last-of-type
            &::after
                display: none
    &__item-count, &__item-text
        display: inline-block
    &__item.active
        .nav__item-count
            background: #222fe6
            color: #f8f8f8
        .nav__item-text
            color: #373941
    &__item-count
        width: 30px
        height: 30px
        line-height: 30px
        border-radius: 50%
        background: #B9B9C4
        color: #e6e6e6
        text-align: center
        margin-right: 0.7rem
        font-size: 0.9rem
        font-weight: 600
    &__item-text
        color: #9D9CA9
        font-size: 0.95rem
        font-weight: 700
        font-family: 'Montserrat'
        letter-spacing: 0.04rem
.brand
    &__text
        font-size: 1.4rem
        font-weight: 800
        font-family: 'Montserrat'
</style>
