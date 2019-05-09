<template>
    <div class="main" v-if="active">
        <a v-on:click="$parent.modal.active = false">Back</a>
        <div v-if="type == 'album'">
            <center>
                <img :src="content.data.art.slice(-1).pop()" width="200vw">
                <h2>{{ content.data.title }}</h2>
            </center>
            <songs
                :songs="content.data.songs"
                :currentSong="$parent.currentSong"
                :player="$parent.player"
                displayHeader="false"
                songContainer="songContainer"
                style="margin-left: .5rem; margin-top: 1rem;"
            />
        </div>
        <div v-if="type == 'artist'">
            <center>
                <img :src="content.data.art.slice(-1).pop()" width="200vw">
                <h2>{{ content.data.name }}</h2>
            </center>
            <songs
                :songs="content.data.tracks"
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
