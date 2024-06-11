<template>
    <div>
        <Header></Header>
		<SearchBar />

        <div id="content">
            <div class="row">
                <p v-for="(item, index) in breadcrumbs" :key="index" @click="() => { navigate(item) }">
                    {{ item.text }}
                    <span v-if="index != breadcrumbs.length - 1">{{ '>' }}</span>
                </p>
            </div>
            <div class="row justify-center">
                <h2>Showing Results for <span id="search-keyword">"{{ keyword }}"</span></h2>
            </div>
            <div class="row" v-if="result.length > 0">
                <div class="col-12">
                    <div v-for="article in result" id="article">
                        <i :class="'fas fa-' + article.icon"></i>
                        <div class="row flex-column">
                            <div class="col-12">
                                <h2>{{ article.title }}</h2>
                            </div>
                            <p>{{ article.content }}</p>
                        </div>
                        <i class="fas fa-caret-right"></i>
                    </div>
                </div>
            </div>
            <div class="row" id="no-result" v-else>
                <NoResult />
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import Header from '../components/Header.vue';
import SearchBar from '../components/SearchBar.vue';
import NoResult from '../assets/empty-search.svg';

export default {
    components: {
        Header,
        NoResult,
        SearchBar
    },
    data() {
        return {
            keyword: '',
            result: [],
            breadcrumbs: []
        }
    },
    watch: {
        $route: {
            handler() {
                if(this.$route.query.keyword) {
                    this.keyword = this.$route.query.keyword
                    this.search()
                }

                if(this.$route.meta && this.$route.meta.breadcrumb) {
                    this.breadcrumbs = [...this.$route.meta.breadcrumb]
                }
            },
            immediate: true
        }
    },
    methods: {
        async search() {
            await Axios.get(`http://localhost:9000/api/search/${this.keyword}`).then((res) => {
                this.result = res.data.filter((article) => 
                    article.title.toLowerCase().includes(this.keyword.toLowerCase())
                )
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/_variables';

    #content {
        background-color: $background-gray;
        font-family: $font-family;
        margin-top: 5rem;
        min-height: 40rem;

        p {
            color: $text-gray;

            & > span {
                margin-left: 0.5rem;
                margin-right: 0.5rem;
                color: $text-gray
            }
        }

        p:first-of-type {
            color: $green;
            cursor: pointer;
        }
    }

    #article {
        align-items: center;
        background-color: white;
        border: 1px solid $border-gray;
        border-radius: $border-radius;
        display: flex;
        font-family: $font-family;
        margin-bottom: 2rem;
        padding: 0rem 2rem;
        position: relative;

        i {
            color: $green;
            font-size: 28px;
            
            &:nth-of-type(2) {
                position: absolute;
                right: 30px;
            }
        }

        h2 {
            margin-bottom: 0;
        }
    }

    .row {
        display: flex;
        padding: 1rem 3rem;

        &.flex-column {
            flex-direction: column;
        }
    }

    .col-12 {
        display: block;
        min-width: 100%;
        width: 100%;
    }

    #search-keyword {
        color: $green;
    }

    #no-result {
        justify-content: center;
    }

    .justify-center {
        justify-content: center;
    }
</style>