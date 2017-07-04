<template>
	<div class="article">{{{intro}}}</div>
</template>
<script>
import { configShare } from '../../lib/wxclient'

export default {
    route: {
        data() {
            document.title = this.title;
        }
    },
    ready: function() {
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: this.title,
            back: true
        }]);
        this.getMaster();
        this.getShareInfo();

    },
    data: function() {
        return {
            intro: '',
            title: '大师详情'
        }
    },
    methods: {
    	delHtmlTag(str) {
			return str.replace(/<\/?[^>]*>/g,'');
		},
        getMaster() {
            this.$http.post('', {
                act: 'master_getInfo',
                id: this.$route.params.id,
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.intro = result.data.data.desc;
                    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
                    this.intro = this.intro.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
                    if (typeof(JsBridge) != 'undefined'){
                        this.$dispatch('inApp')
                    }
                }
            })
        },
        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'master',
                id: this.$route.params.id
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    var stageInfo = result.data.data;
                    var shareInfo = {
                        title: result.data.data.title,
                        desc: result.data.data.summary,
                        link: result.data.data.url,
                        imgUrl: result.data.data.img
                    }
                    configShare(shareInfo);
                }
            })
        },
    }
}
</script>

<style scoped>
	.article {
		padding: 8px;
		position: relative;
	}
	.article p {
		text-indent: 1em;
	}
	.article img {
		width: 100px !important;
	}
</style>
