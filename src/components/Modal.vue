<template>
    <div class="main" v-if="active">
        <a v-on:click="$parent.modal.active = false">Back</a>
        <div v-if="type == 'album'">
            <img :src="content.image">
            <p>{{ content.title }}</p>
            <songs
                :songs="content.songs"
                :currentSong="$parent.currentSong"
                :player="$parent.player"
                displayHeader="false"
                songContainer="songContainer"
                style="margin-left: .5rem; margin-top: 1rem;"
            />
        </div>
    </div>
</template>

<script>
import Songs from "./Songs.vue";

export default {
    name: "modal",
    props: ["active","type","content"],
    components: {
        Songs
    }
}
</script>

<style lang="less" scoped>
.main {
    padding: 1rem;
    width: 100%;
    height: 100%;
}
</style>
