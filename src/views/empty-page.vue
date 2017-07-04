<template>
    <div class="empty">
        <img src="../assets/img/img_arts_empty.png">
        <div class="note">敬请期待</div>
    </div>
</template>
<script>
export default {
    ready() {
        document.title = '今日特价 (敬请期待)';
            this.$dispatch.apply(this, ['onTitleChanged', {
                title: '敬请期待',
                back: true
            }]);
        },
        methods: {},
        data() {
            return {}
        }
}
</script>
<style type="text/css" scoped>
img {
    width: 100%;
    height: auto;
    margin: 80px auto 0 auto;
}

.note {
    text-align: center;
    color: #646464;
}
</style>
