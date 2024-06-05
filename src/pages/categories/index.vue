<template>
	<div>
		<Header></Header>
		<SearchBar @search="search" />

		<div class="content" v-for="chunk in modified">
			<Tile
				v-for="(cat, index) in chunk"
				:key="index"
				:icon="cat.icon"
				:lastUpdate="cat.updatedOn"
				:count="cat.totalArticle"
				:title="cat.title"
				@click="() => navigate(cat)"
			/>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header.vue';
import SearchBar from '../../components/SearchBar.vue';
import Tile from '../../components/Tile.vue';

export default {
	components:{
		Header,
		SearchBar,
		Tile
	},
	data() {
		return {
			categories: [],
            modified: []
		};
	},
	created() {
		this.getCategories();
	},
	methods: {
		async getCategories() {
			await axios.get('http://localhost:9000/api/categories').then((res) => {
				if(res.data.length > 0) {
					this.categories = res.data.filter((item) => {
						return item.enabled;
					})
				}
			});

            if(this.categories.length > 0) {
                this.modified = this.sort(this.categories);
            }
		},
		navigate(cat) {
			this.$router.push({
				name: 'Details',
				query: {
                    count: cat.totalArticle,
                    description: cat.description,
                    icon: cat.icon,
                    id: cat.id,
                    lastUpdated: cat.updatedOn,
                    title: cat.title,
                }
			});
		},
        search(keyword) {
            if(keyword !== '') {
                keyword = keyword.toLowerCase().trim();

                let filtered = this.categories.filter((cat) => {
                    return cat.title.toLowerCase().includes(keyword);
                });

                this.modified = this.sort(filtered);
            } else {
                this.modified = this.sort(this.categories);
            }
        },
        paginate(data, per_row = 3) {
            let paginated = [];

            for(let i = 0; i < data.length; i += per_row) {
                let chunk = data.slice(i, i + per_row);
                
                if(chunk.length > 0) {
                    paginated.push(chunk);
                }
            }

            return paginated;
        },
        sort(data) {
            let sorted = [...data].sort((cur, last) => {
                if(cur.order > last.order) {
                    return 1;
                }

                if(cur.order < last.order) {
                    return -1;
                }

                return 0;
            });

            return this.paginate(sorted);
        }
	}
}
</script>

<style lang="scss" scoped>
    @import '../../scss/_variables';

	.content {
		background-color: $background-gray;
		display: flex;
		justify-content: center;
		padding: 5rem;

		&:nth-of-type(3) {
			margin-top: 5rem;
		}
	}
</style>