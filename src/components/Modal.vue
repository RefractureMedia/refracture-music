<template>
    <div class="main" v-if="active">
        <div v-if="type == 'album'">
            
        </div>
    </div>
</template>

<script>
export default {
    name: "modal",
    props: ["active","type","content"]
}
</script>

<style lang="less" scoped>
.main {
    padding: 1rem;
    width: 100%;
    height: 100%;
}
</style>
