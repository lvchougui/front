<template>
	<ul v-for = "item in questions" class= "question-item" @click="onSelect(item)">
		<div>
			<img class="indicator" src="../../assets/img/hint-indicator.png" /> 
			<li class="questions-title">{{item.title}}</li>
		</div>
		<div class="margin-line"></div>
	</ul>
</template>

<style>
    /*li {clear: both;}*/
    ul,li {margin:0;padding:0;}
    .question-item {
    	margin: 10px;
    	font-size: 15px;
    	color: rgb(47,47,47);
    	height: 44px;
    	line-height: 44px;
    	/*background-color: orange;*/
    	/*border: 1px solid yellow;*/
    }
    .margin-line {
    	margin-top: 5px;
    	background-color: rgb(239, 239, 239);
    	height: 1px;
    	width: 100%;
    }
    .questions-title {
    	text-overflow:ellipsis; 
		white-space: nowrap; 
		overflow: hidden;
        text-align: left;
        /*line-height: 44px;*/
        /*background-color: orange;*/
    }
    .indicator {
    	float: right;
    	margin-top: 17px;
    	margin-right: 10px;
    	width: 6px;
    	height: 10px;
/*    	overflow: hidden;
    	vertical-align: center;*/
    }
    .text-img-center {
/*		flex-direction:row;
		display:flex;*/
		/*text-align:center;*/
		/*background-color: orange;*/
	}
</style>

<script>
	export default {
		ready() {
            var query = this.$route.query;
            if (query.title.length > 0) {
                this.title = query.title;
                // alert(this.title);
                // alert(JSON.stringify(this.title));
            };

            if (query.id > 0) {
                this.id = query.id;
            };

            document.title = this.title;
            if (typeof(JsBridge) != 'undefined'){
                if (JsBridge.setTitle != undefined) {
                    JsBridge.setTitle(this.title);
                };
            }

            this.loadData();
		},
		methods: {
            loadData() {
                var url = "http://121.40.154.32:3001/api/article/getArticleList/" + this.id;

                this.$http.get(
                  url
                )
                .then((res) => {
                  // resolve(res);
                  log("res:" + JSON.stringify(res));

                  if (res.status == 200) {
                    this.questions = res.data;
                  };
                })
                .catch((res) => {
                  log("error:" + JSON.stringify(res));
                });
            },
            onSelect(item) {
                this.$route.router.go({
                    name: 'answer',
                    query: {
                        id: item.id
                    }
                });
            }
		},
		data() {
			return {
                id: 0,
				title: "问题列表",
                questions: [],
				// questions: ["问题1","问题2","问题3","问题4","问题5","问题6",],
			}
		}
	}
</script>