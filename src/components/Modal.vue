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
        <div v-if="type == 'artist'">
            <center>
                <img :src="content.images[content.images.length - 1]" width="200vw">
                <h2>{{ content.artist }}</h2>
            </center>
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
