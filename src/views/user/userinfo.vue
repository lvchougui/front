<template>
    <div></div>
</template>
<script>
export default {
    ready() {
            this.id = this.$route.params.id;
            this.$dispatch.apply(this, ['onTitleChanged', {
                title: '一元夺宝',
                back: true
            }]);
            this.getUser();
        },
        methods: {
            getUser() {
                this.$http.post('', {
                    act: 'user_getUser',
                    id: this.id
                }).then((result) => {
                    var resp = result.data;
                    if (result && result.data && result.data.code == 200) {
                        this.user = result.data.data;
                    }
                })
            }
        },
        data() {
            return {}
        }
}
</script>
