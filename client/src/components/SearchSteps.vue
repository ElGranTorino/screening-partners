<template>
	<nav class="nav">
		<div class="nav__container">
			<div class="nav__brand brand">
				<router-link to="/" class="brand__link interact">
					<img src="@/assets/img/Brand.jpg" style="max-width: 220px">
				</router-link>
			</div>
			<div class="nav__steps">
				<ul class="nav__list">
					<li class="nav__item" :class="{'active': getSearchStep >= 0}">
						<span class="nav__item-count">1</span>
						<span class="nav__item-text">Entering Target Name</span>
					</li>
					<li class="nav__item " :class="{'active': getSearchStep >= 1}">
						<span class="nav__item-count">2</span>
						<span class="nav__item-text">Collecting Data</span>
					</li>
					<li class="nav__item " :class="{'active': getSearchStep >= 2}">
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
import { defineComponent } from "vue";
import {mapGetters} from "vuex";

export default defineComponent({
  name: 'SearchSteps',
  data(){
    return {
        getStep: 0
    }
  },
  computed: mapGetters(["getSearchStep"])
});

</script>


