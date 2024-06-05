<template>
    <div>
        <Header></Header>
        <SearchBar @search="search" />

        <div id="content">
            <div class="row">
                <p v-for="(item, index) in breadcrumbs" :key="index" @click="() => { navigate(item) }">
                    {{ item.text }}
                    <span v-if="index != breadcrumbs.length - 1">{{ '>' }}</span>
                </p>
            </div>
            <div class="row">
                <div class="col-6">
                    <Tile
                        :count="category.totalArticle"
                        :description="category.description"
                        :icon="category.icon"
                        :lastUpdate="category.lastUpdated"
                        :showCount="false"
                        :showDescription="true"
                        :title="category.title"
                    />
                </div>
                <div class="col-6">
                    <div v-for="article in modified" id="article">
                        <i :class="'fas fa-' + article.icon"></i>
                        <div class="row flex-column">
                            <div class="col-12">
                                <h2>{{ article.title }}</h2>
                            </div>
                            <div class="col-12">
                                <p>Updated {{ calculateDuration(article.updatedOn) }}</p>
                            </div>
                        </div>
                        <i class="fas fa-caret-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Header from '../../components/Header.vue';
import SearchBar from '../../components/SearchBar.vue';
import Tile from '../../components/Tile.vue';
import moment from 'moment';

export default {
    components: {
        Header,
        SearchBar,
        Tile
    },
    data() {
        return {
            category: {},
            articles: [],
            modified: [],
            breadcrumbs: []
        };
    },
    watch: {
        $route: {
            handler() {
                if(this.$route.query.id) {
                    let data = this.$route.query

                    this.category = {
                        count: data.totalArticle,
                        description: data.description,
                        icon: data.icon,
                        id: data.id,
                        lastUpdated: data.lastUpdated,
                        title: data.title,
                    }

                    this.getDetails(data.id)
                }

                if(this.$route.meta && this.$route.meta.breadcrumb) {
                    this.breadcrumbs = [...this.$route.meta.breadcrumb]
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        async getDetails(id) {
            await axios.get(`http://localhost:9000/api/category/${id}`).then((res) => {
                this.articles = res.data.filter((item) => {
                    return item.status === 'published'
                })
            });

            if(this.articles.length > 0) {
                this.modified = this.articles;
            }
        },
        navigate(meta) {
            this.$router.push({
                name: meta.name
            });
        },
        calculateDuration(updated_at) {
            return moment(updated_at).fromNow();
        },
        search(keyword) {
            if(keyword !== '') {
                keyword = keyword.toLowerCase().trim();

                this.modified = this.articles.filter((item) => {
                    return item.title.toLowerCase().includes(keyword)
                });
            } else {
                this.modified = this.articles;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../scss/_variables';

    #content {
        background-color: $background-gray;
        font-family: $font-family;
        margin-top: 5rem;

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

    .col-6 {
        display: block;
        max-width: 60%;
        width: 60%;

        &:nth-child(1) {
            width: 40%;
        }
    }

    .col-12 {
        display: block;
        min-width: 100%;
        width: 100%;
    }
</style>