<template>
	<!-- <div class="ques"> -->
		<!-- <img class="img-float" src="../../assets/img/ask.png" /> -->
        <!-- rgb(252,112,124); -->
        <!-- <p class="ask-text" style="background-color: rgb(88,188,154);">问</p> -->
		<!-- <p class="ques-title">{{question}}</p> -->
	<!-- </div> -->
	<!-- <div class="answer"> -->
		<!-- <img class="img-float" src="../../assets/img/answer.png" />  -->
        <!-- <p class="ask-text" style="background-color: rgb(47,47,47);">答</p> -->
		<!-- <p>{{{answer}}}</p> -->
	<!-- </div> -->

    <div>
        <p class="answer-html">{{{answer}}}</p>
    </div>
</template>

<style>
    .ques {
        margin: 10px;
        font-size: 15px;
        color: gray;
    }
    .ques-title {
    	margin-left: 40px;
    	height: auto;
    }
    .answer {
    	margin: 20px 10px; 
    	font-size: 15px;
    	color: rgb(47,47,47);
    }
    .img-float {
    	width: 20px;
    	height: 20px;
    	margin-left: 10px;
    	margin-right: 10px;
    	float: left;
    }
    .ask-text {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        margin-right: 10px;
        float: left;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: white;
    }
    .answer-html {
        margin: 10px;
    }
</style>

<script>
	export default {
		ready() {
			// document.title = "问题详情";

            // if (typeof(JsBridge) != 'undefined'){
            //     JsBridge.setTitle('问题详情');
            // }

            var query = this.$route.query;
            if (query.id > 0) {
                this.id = query.id;
                // alert(this.id);
            };

            this.loadData();
		},
		methods: {
            loadData() {
                var url = "http://121.40.154.32:3001/api/article/getArticleDetail/" + this.id;

                this.$http.get(
                  url
                )
                .then((res) => {
                  // resolve(res);
                  // log("res:" + JSON.stringify(res));

                  if (res.status == 200) {
                    this.answer = res.data.detail;

                    document.title = res.data.title;

                    if (typeof(JsBridge) != 'undefined'){
                        JsBridge.setTitle(res.data.title);
                    }
                  };
                })
                .catch((res) => {
                  log("error:" + JSON.stringify(res));
                });
            }
        },
		data() {
			return {
                id: 0,
                answer: "",
				// question: "如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单如何修改订单",
				// answer: "<div style=\"color:#555;font-size:15px;\"><style>img{width:100%;height:auto;}</style>详细介绍<img style=\"width:100%;margin-top:5px\" src=\"http://appimage2.tiangongyipin.com/1497516491926-woLCY?x-oss-process=image/resize,w_800\"</img></div><div style=\"color:#555;font-size:15px;\"><style>img{width:100%;height:auto;}</style>详细介绍<img style=\"width:100%;margin-top:5px\" src=\"http://appimage2.tiangongyipin.com/1497516491926-woLCY?x-oss-process=image/resize,w_800\"</img></div><div style=\"color:#555;font-size:15px;\"><style>img{width:100%;height:auto;}</style>详细介绍<img style=\"width:100%;margin-top:5px\" src=\"http://appimage2.tiangongyipin.com/1497516491926-woLCY?x-oss-process=image/resize,w_800\"</img></div>",
			}
		}
	}
</script>