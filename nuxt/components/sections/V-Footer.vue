<template>
   <footer class="footer">
    <div class="footer__container">
        <div class="footer__content hidden">
            <div class="footer__info">
                <div class="footer__paragraph paragraph">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, error.</p>
                </div>
                <!-- <div class="footer__social">
                    <ul class="footer__social-list">
                        <li class="footer__social-item"><a href="https://www.twitter.com" target="_blank" class="footer__social-link interact"><ion-icon name="logo-twitter"></ion-icon></a></li>
                        <li class="footer__social-item"><a href="https://www.instagram.com" target="_blank" class="footer__social-link interact"><ion-icon name="logo-instagram"></ion-icon></a></li>
                        <li class="footer__social-item"><a href="https://www.facebook.com" target="_blank" class="footer__social-link interact"><ion-icon name="logo-facebook"></ion-icon></a></li>
                        <li class="footer__social-item"><a href="https://www.github.com" target="_blank" class="footer__social-link interact"><ion-icon name="logo-github"></ion-icon></a></li>
                    </ul>
                </div> -->
            </div>
            <div class="footer__navigation">
                <div class="footer__navigation-column">
                    <h2 class="footer__navigation-title">Company</h2>
                    <ul class="footer__navigation-list">
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">More</a></div>
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Contacts</a></div>
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Data</a></div>
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Details</a></div>
                    </ul>
                </div>
                <div class="footer__navigation-column">
                    <h2 class="footer__navigation-title">Menu</h2>
                    <ul class="footer__navigation-list">
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Home</a></div>
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">About</a></div>
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Help</a></div>
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Details</a></div>
                    </ul>
                </div>
                <div class="footer__navigation-column">
                    <h2 class="footer__navigation-title">Other</h2>
                    <ul class="footer__navigation-list">
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Privacy policy</a></div>
                        <div class="footer__navigation-item"><a href="#" class="footer__navigation-link interact">Terms and conditions</a></div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer__copy">
            <div class="footer__copyright">&copy; {{ this.getCurrentYear() }} All rights reserved </div>
            <div class="footer__stat"><span>1k</span>  searches performed</div>
        </div>
    </div>
   </footer>
</template>

<script>

export default {
    name: 'V-Footer',
    methods: {
        getCurrentYear() {
            const date = new Date();
            return date.getFullYear()
        }
    },
}
</script>
<style lang="sass">
</style>
