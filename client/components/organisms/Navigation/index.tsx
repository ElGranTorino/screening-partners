import { NuxtLink } from "#components";
import BreadCrumbs from '@/components/molecules/Breadcrumbs'
export default defineComponent({
    setup() {
        const isMenuOpen = ref<boolean>(false);
    },
    render() {
        return (
            <header class='px-12 py-6 md:px-24 lg:px-24 bg-white border-b-2 border-blue-700'>
                <div class="relative flex items-center justify-between">
                    <NuxtLink to="/" aria-label="Company" title="Company" class="inline-flex items-center">
                        <img src="https://www.screeningpartners.net/_nuxt/img/Brand.a5801a5.jpg" width="200" />
                    </NuxtLink>
                    <nav class="hidden lg:block xl:block 2xl:block">
                        <BreadCrumbs
                        crumbs={
                            [
                                {number: 1, text: 'Entering name'},
                                {number: 2, text: 'Collecting data'},
                                {number: 3, text: 'Showing results'},
                            ]
                        }
                        activeCrumb={1}
                        ></BreadCrumbs>
                    </nav>
                    <div class="hidden">
                        <button aria-label="Open Menu" title="Open Menu"
                            class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        >
                            <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
                                <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z">
                                </path>
                                <path fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"></path>
                            </svg>
                        </button>
                        <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full">
                            <div class="p-5 bg-white border rounded shadow-sm">
                                <div class="flex items-center justify-between mb-4">
                                    <div>
                                        <NuxtLink to="/" aria-label="Company" title="Company" class="inline-flex items-center">
                                        OOO
                                        </NuxtLink>
                                    </div>
                                    <div>
                                        <button aria-label="Close Menu" title="Close Menu"
                                            class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            >
                                            <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul class="space-y-4">
                                        <li>
                                            <a href="/" aria-label="Our product" title="Our product"
                                                class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">Product</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
});
