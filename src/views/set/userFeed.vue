<template>
    <div style="margin:10px;border:0.5px solid rgb(220,220,220);">
        <textarea :rows="8" placeholder="谢谢您愿意花时间来让我们变得更好" :value.sync="data.content" class='feedback_textarea'></textarea>
    </div>
    <div style="margin:10px;border:0.5px solid rgb(220,220,220);">
        <textarea :rows="3" placeholder="请留下联系方式，我们会有谢礼相赠" :value.sync="data.contact" class='feedback_textarea'></textarea>
    </div>
    <div style="margin-top:40px;margin-left:10px;margin-right:10px;">
        <x-button type="primary" style="font-size:15px;" @click="submit">发送-让我们变得更好</x-button>
    </div>
</template>
<script>
import Group from 'vux/dist/components/group'
import Textarea from 'vux/dist/components/x-textarea'
import XButton from 'vux/dist/components/x-button'
export default {
    components: {
        Group,
        Textarea,
        XButton
    },

    data() {
        return {
            data: {
                content: '',
                contact: ''
            }
        }
    },
    ready: function() {
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: '用户反馈',
            back: true
        }]);
        document.title = '用户反馈';
    },
    methods: {

        getDefaultData: function() {
            this.$http.post('', {
                act: 'user_getInfo',
                uid: '1' //  this.$route.params.id,   //用户的id
            }).then(function(result) {
                if (result.data.code == 200) {
                    let data = result.data.data;
                    this.data = data;
                } else {
                    alert("请求数据失败");
                }
            });
        },

        submit: function() {

            if (this.data.content == undefined || this.data.content.length == 0) {
                alert("请输入您的反馈信息");
                return;
            };
            this.$http.post('', {
                act: 'feedback_add',
                content: this.data.content,
                contact: this.data.contact,

            }).then(function(result) {
                if (result.data.code == 200) {
                    alert("反馈成功");
                    setTimeout(function() {
                        if (typeof(JsBridge) != 'undefined') {
                            JsBridge.close();
                        } else {
                            window.history.back();
                        }
                    }.bind(this), 500);
                } else {
                    alert("反馈失败");
                }
            });
        }


    }
}
</script>
<style>
.feedback_textarea {
    font-size: 15px;
}

.mymenu {
    position: absolute;
    width: 100%;
    top: 44px;
    margin-bottom: 76px;
}

.mymenu i {
    color: #969696;
    margin-right: 5px;
    display: block;
}

.topView {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 44px;
    background-color: white;
}

.setfont {
    float: left;
    line-height: 44px;
    margin-left: 32%;
}
</style>
