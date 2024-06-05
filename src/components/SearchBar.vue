<template>
    <div id="input-wrapper">
        <input v-model="keyword" type="text" placeholder="Search for answers">
        <button type="button" id="search-btn" @click="search" @keyup.enter="search">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: ''
        };
    },
    watch: {
        keyword: {
            handler() {
                this.$emit('search', this.keyword)
            }
        }
    },
    methods: {
        search() {
            
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../scss/_variables';

    #input-wrapper {
        display: flex;
        justify-content: center;

        input {
            border: 2px solid $border-gray;
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
            font-family: $font-family;
            min-height: 3rem;
            padding-left: 15px;
            width: 400px;

            &:focus-visible {
                border: 2px solid $green;
                outline-color: $green;
            }
        };

        #search-btn {
            background-color: $green;
            border: 2px solid $green;
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
            color: white;
            min-height: 3rem;
            width: 4rem;
        }
    }
</style>