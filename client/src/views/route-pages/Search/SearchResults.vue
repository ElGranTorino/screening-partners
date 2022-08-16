<template>
<!-- STEPS -->
<SearchSteps></SearchSteps>
<!-- STEPS -->  
<section class="search">
  <div class="search__container">
    <div class="search__data d-flex justify-between">

      <div class="search__target-info d-flex align-center">
        <div class="search__target-image">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAApCAMAAAA4Y0Y/AAAAVFBMVEX///9iZGpeYGbr6+x5e4CJio9YWmFcXmXl5eb4+PhVV17Mzc709PSMjpKDhImGiIzb292XmJxqbHKsrbDU1NadnqJzdXrDxMZNT1e2t7qlpqm9vcAc2ejGAAADqElEQVRYhe2X63alKgyAMSoXRcQLWvd+//ccLgngmk6nPWd2/8ykXasCki8JSbCM/ZO/RHQbJT63W7/Jb6HazTSDlzUM5MGBi/31VO0aAU2QyDXCP0HXvhzb8QYlct/Ss30114nmxh2+h2sLFiL3gG+J84ZRBvJ3XwWI4Xwxls0ppWBTNCPd5F6fziZxO1XNqV++/YdEt7qLXDCyvYuiXoIjVY00mifH67qeuyQ7y9tpaHf5zpxmynUdpXJ3l2Nnj6MMLdvL6NiiirFfBy4EH9YpHYta8IUpZIdXLt4ejDZNY6C6Q7xZpvqSzD6x/E/+HUa2iDz27Wsc8iJ3XoXssNl4EXwKIdBGJCXALRt9ejZiY2EYJ7n0OjzPr6kJml8I99xq0XNzd2mE59pD3F4PYG1oBzxlLJDALRrtGv/+H25SW0mwpeIu6bHmimfsDJHb8xIrQCncvJjiTG+CjzNWn48wmePVaZN3HLi8MchxQasC91rcmibXxS1BHIbAc6+lxx2zk8wuHfmynCPpn0b0ooGJqY3eyc5szLnjHhqeOnCyAnoqrXYgrk/JZBRccSX5CLOfp2bzDBtSJTZHuLP1UUH54PM5XKz3uRt3phqUFRePGPq4mBaEZ7UpuGjsiaGOxdTls1kfo7bRlnzs4njY1urfcy0CwnZMrODWE6eXM8gjnSA/ay7M+ZMlc8WiS8v6kIth48/su5j844a5AjyIyGdZ+1sQxAVTYT/mIgG6cIxlvn+v/MSj4vLqPsv+juzT3B2VtsymzSK8N5G/tfDa31X+zF3V57moR5z4WZKcwjiDmSqZq7y6hRS5IWif5148ZRD2HdjLZCMupiqp7ISp8o2401e4LRZnymb0Q2LlVJGjuGJ8lne4PavlN1yFZ7lQv42asBMAqbeODvQDbuWv0ooOpNXxKtNYsvzU6YjOxE2di6N2KiSxPqW0m78SY31pry4ZNLW43c9J8lfRHNs6Q/3ZGOM/DiZDHfYwXYS0VZeDA/e1K03xwd/9kExSzpgmq0P3vN6M6B4YBlfuI38RWSbXUpkwpEZaXYehRyZ53m7fFNp079NugTY2UM1R+N1tu7218Aa5e74A66rcfgI3Vpmqn1DZ3G37AletZVuVjxvcmhZA336By0u/ETHOokwglz3oah9ujW40PFstuDnT91VRh3G+tTTiXqavxOfVMpehwajuK0pz/67W40QZ4/awpB7V7hmDUwPm7U99mcvdy8v/Zf0n/0l+ABv6MTUt8bMWAAAAAElFTkSuQmCC" alt="">
        </div>
        <div class="search__target-data">
          <div class="search__target-name">Fiverr <span class="tag">Company</span></div>
          <div class="search__target-details">Fiverr is a global online marketplace for freelance services</div>
        </div>
      </div>
      <div class="search__controls d-flex">
        <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem ">Back to search</router-link>
            <button class="btn" style="margin: 1.5rem 1rem">Download PDF</button>
      </div>
    </div>
    <div class="search__news">
      <div class="search__news-container" v-if="getAllNews.length">
        <div class="results__data hidden">
          <div class="results__count title text-center">
            <span v-if="getAllNews.length > 100" >Over 100 results found</span>
            <span v-else>Total results: {{getAllNews.length}}</span>
          </div>
          <div class="results__pdf d-flex justify-center">
            <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem ">Back to search</router-link>
            <button class="btn" style="margin: 1.5rem 1rem">Download PDF</button>
          </div>
        </div>
        <div class="title search__header">Relevant news <span>(100+)</span></div>
        <div class="search__row">
          <!-- CARD -->
          <NewsCard v-for="news in getAllNews" :newsData="news"></NewsCard>
          <!-- CARD --> 
        </div>
        <!-- HIDDEN PAGINATION --> 
        <div class="search__pagination hidden">
          <ul class="search__pagination-list list horizontal">
            <li class="search__pagination-item">
              <button class="btn small btn-pg">1</button>
            </li>
          </ul>
        </div>
        <!-- HIDDEN PAGINATION --> 
      </div>
      <div class="search__noresults" style="padding: 0 0 200px 0" v-else>
        <div class="title text-center">No results found</div>
        <div class="paragraph" style="padding: 25px 0 15px 0">It seems we can’t find any results based on your search.</div>
        <div class="results__pdf d-flex justify-center">
          <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem ">Back to search</router-link>
          <button class="btn" style="margin: 1.5rem 1rem">Download PDF</button>
        </div>
      </div>
    </div>
    <div class="search__sanctions">
      <div class="title search__header">Sanctions <span>(863)</span></div>
      <table class="search__sanctions-table table fullwidth">

        <thead class="table__head">
          <tr class="table__head-row">
            <th class="table__head-cell search__sanctions-td">Entity name</th>
            <th class="table__head-cell search__sanctions-td">Type</th>
            <th class="table__head-cell search__sanctions-td">Country</th>
            <th class="table__head-cell search__sanctions-td">Active Sanctions</th>
            <th class="table__head-cell search__sanctions-td">Current Program</th>
            <th class="table__head-cell search__sanctions-td">Last Update</th>
          </tr>
        </thead>
        
        <tbody class="table__body">
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">GAZPROM ENERGO</th>
            <th class="table__body-cell search__sanctions-td">Organization</th>
            <th class="table__body-cell search__sanctions-td">🇺🇦 Ukraine</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">UKR</th>
            <th class="table__body-cell search__sanctions-td">2019-09-13</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">Tactical Missile Corporation, Joint Stock Company Severny Press</th>
            <th class="table__body-cell search__sanctions-td">Organization</th>
            <th class="table__body-cell search__sanctions-td">🇻🇪 Venezuela</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">VEN</th>
            <th class="table__body-cell search__sanctions-td">2017-05-30</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">Omar Shishani</th>
            <th class="table__body-cell search__sanctions-td">Individual</th>
            <th class="table__body-cell search__sanctions-td">🇻🇪 Venezuela</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">No</th>
            <th class="table__body-cell search__sanctions-td">2016-09-30</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">Seajet Company Limited</th>
            <th class="table__body-cell search__sanctions-td">Organization</th>
            <th class="table__body-cell search__sanctions-td">🇮🇳 India</th>
            <th class="table__body-cell search__sanctions-td">No</th>
            <th class="table__body-cell search__sanctions-td">URK</th>
            <th class="table__body-cell search__sanctions-td">2020-05-29</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">GAZPROM ENERGO</th>
            <th class="table__body-cell search__sanctions-td">Individual</th>
            <th class="table__body-cell search__sanctions-td">🇺🇦 Ukraine</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">UKR</th>
            <th class="table__body-cell search__sanctions-td">2019-09-13</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">Tactical Missile Corporation, Joint Stock Company Severny Press</th>
            <th class="table__body-cell search__sanctions-td">Organization</th>
            <th class="table__body-cell search__sanctions-td">🇻🇪 Venezuela</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">VEN</th>
            <th class="table__body-cell search__sanctions-td">2017-05-30</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">Omar Shishani</th>
            <th class="table__body-cell search__sanctions-td">Individual</th>
            <th class="table__body-cell search__sanctions-td">🇻🇪 Venezuela</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">VEN</th>
            <th class="table__body-cell search__sanctions-td">2016-09-30</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">Seajet Company Limited</th>
            <th class="table__body-cell search__sanctions-td">Organization</th>
            <th class="table__body-cell search__sanctions-td">🇮🇳 India</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">URK</th>
            <th class="table__body-cell search__sanctions-td">2020-05-29</th>
          </tr><tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">GAZPROM ENERGO</th>
            <th class="table__body-cell search__sanctions-td">Organization</th>
            <th class="table__body-cell search__sanctions-td">🇺🇦 Ukraine</th>
            <th class="table__body-cell search__sanctions-td">Yes</th>
            <th class="table__body-cell search__sanctions-td">UKR</th>
            <th class="table__body-cell search__sanctions-td">2019-09-13</th>
          </tr>
          <tr class="table__body-row">
            <th class="table__body-cell search__sanctions-td">Tactical Missile Corporation, Joint Stock Company Severny Press</th>
            <th class="table__body-cell search__sanctions-td">Organization</th>
            <th class="table__body-cell search__sanctions-td">🇻🇪 Venezuela</th>
            <th class="table__body-cell search__sanctions-td">No</th>
            <th class="table__body-cell search__sanctions-td">VEN</th>
            <th class="table__body-cell search__sanctions-td">2017-05-30</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="search__pagination">
      <ul class="search__pagination-list list horizontal">
        <li class="search__pagination-item">
          <button class="btn small btn-pg">1</button>
        </li>
      </ul>
    </div>
  </div>
</section>
<!-- FOOTER -->
<Footer></Footer>
<!-- FOOTER -->

</template>

<script>

// Vue environment
import { defineComponent } from "vue";
import {mapGetters, mapActions} from "vuex";

// Components
import Footer from "@/components/Footer.vue";
import SearchSteps from "@/components/SearchSteps.vue";
import NewsCard from "@/components/NewsCard.vue";

export default defineComponent({
  name: 'SearchResultsView',
  components: {
    SearchSteps, Footer, NewsCard
  },
  data(){
    return {
      
    }
  },
  computed: mapGetters(["getAllNews"])
});
</script>
<style>

</style>