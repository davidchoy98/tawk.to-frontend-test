<template>
    <div>
        <div class="tile-wrapper" @click="click">
            <i :class="'fas fa-' + icon"></i>
            <h3>
                {{ title }}
            </h3>
            <p v-if="showCount" id="count">
                {{ count }} articles
            </p>
            <p id="description">
                Last updated {{ duration }}
            </p>
        </div>
        <div v-if="showDescription" class="tile-wrapper">
            <i class="fas fa-info-circle"></i>
            <p>{{ description }}</p>
        </div>
    </div>
</template>
<script>
import moment from 'moment';

export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            default: 0
        },
        lastUpdate: {
            type: String,
            required: true
        },
        showCount: {
            type: Boolean,
            default: true
        },
        showDescription: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: ''
        }
    },
    computed: {
        duration() {
            return moment(this.lastUpdate).fromNow();
        }
    },
    methods: {
        click() {
            this.$emit('click')
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../scss/_variables';

    .tile-wrapper {
        background-color: white;
        border: 1px solid $border-gray;
        border-radius: $border-radius;
        cursor: pointer;
        font-family: $font-family;
        height: 250px;
        margin-left: 2rem;
        margin-right: 2rem;
        width: 300px;
        text-align: center;
        align-content: center;

        i {
            color: $green;
            font-size: 4rem;
        }

        #count {
            color: $green;
            font-size: 16px;
            margin-bottom: 0;
            margin-top: 3.5rem;
        }

        #description {
            color: $text-gray;
            font-size: 14px;
            margin-top: 0;
        }

        &:nth-child(2) {
            align-content: flex-start;
            height: 10rem;

            i {
                font-size: 20px;
                margin-top: 2rem;
            }

            p {
                color: $text-gray;
                padding: 0rem 1rem;
            }
        }
    }
</style>