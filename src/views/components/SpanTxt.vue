<template>
    <div class="crumbs">
        <span style="display: inline-block;" v-bind:class="ClassName" v-html="(TextModel==null?'':TextModel)+(ExtenModel==null?'':ExtenModel)"></span>
    </div>
</template>
<script>
export default {
    props: ["ClassName", "TextModel", "ExtenModel"],
    methods: {}
};
</script>
<style scoped >
</style>
