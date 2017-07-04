<style scoped>
    .master-detail-cover {
        width: 100%;
        height: 100%;
    }
    .master-detail-logo {
        position: relative;
        /*bottom: 35px;*/
        /*position: absolute;*/
        /*margin-top: -35px;*/

        display: flex;
        justify-content: center;
        margin: -40px auto 0 auto;

        /*vertical-align: bottom;*/
        width: 70px;
        height: 70px;
        
        border-radius: 35px;
        border-color: white;
        border-width: 2px;
    }
    .master-detail-nickname {
        display: flex;
        justify-content: center;
        margin: 0 auto;

        font-weight: bold;
        font-size: 17px;
        color: rgb(47,47,47);
        text-align: center;
    }
    .master-detail-summary {
        padding: 10px;
        font-size: 17px;
        color: rgb(47,47,47);
    }
    .line {
        background-color: #e7e7e7;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 1px;
    }
    .cell {
        width: 100%;
        display: inline-block;
        padding-left: 10px;
        padding-right: 10px;
        /*background-color: orange;*/
    }
    
    .margin-middle {
        width: 10px;
        height: 200px;
        background-color: green;
    }
    .preference-list {
        margin-left: 0px;
        margin-right: 0px;
    }
    
    .preference-item {
        width: 100%;
        /*height: 250px;*/
        /*background-color: orange;*/
        display: inline-block;
    }
    .item {
        /*flex-direction: row;*/
/*        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 30px;
        margin-right: 30px;*/
        flex-direction: row;
        padding: 10px;
        height: 140px;
        border: 1px solid #e7e7e7;
        margin-left: 10px;
        margin-right: 10px;
        /*background-color: orange;*/
    }
    .left-item {
        float: left;
        width: 40%;
        height: 100%;
        display: table;
    }
    .item-content{
        padding-right: 5px;
        display: inline-block;
        flex-direction: column;
        /*margin: 0 auto;*/
/*        margin-left: 10px;
margin-top: 10px;*/
/*align-items: center;*/
display: table-cell;
vertical-align: middle;
align-items: center;
text-align: center;
width: 100%;
/*text-align: center;*/
/*        height: 100%;*/
/*background-color: blue;*/
}
.tag {
    color: rgb(88, 188, 154);
    font-size: 15px;
    text-overflow: ellipsis;
    text-align: center;
/*        padding-left: 10px;
padding-right: 10px;*/
}
.summary {
    color: rgb(47,47,47);
    font-size: 30;
    text-overflow: ellipsis;
    text-align: center;
/*        padding-left: 10px;
padding-right: 10px;*/
}
.cover {
    width: 50%;
    height: 50%;
}
.detail-img {
/*        padding-left: 50%;
padding-top: 0%;*/
width:60%;
height: 100%;

}

.artwork-list{
    display: inline-block;
    width: 100%;
    padding: 10px;
}
.row{
    display: inline;
    width: 45%;
    height: 45%;
    float: left;
    padding: 5px;
}
</style>

<template>
    <floatbtn></floatbtn>
    <div style="width:100%;">
        <img :src="masterDict.imgUrl" class="master-detail-cover">
        <img :src="masterDict.logo" class="master-detail-logo">
    </div>
    <div>
        <span class="master-detail-nickname">{{masterDict.nickname}}</span>
        <p class="master-detail-summary">{{masterDict.summary}}</p>
        <div class="line"></div>
    </div>
    <div style="padding:10px;">{{{masterDict.brandDesc}}}</div>
    <div class="line" v-if="masterDict.brandDesc"></div>

    <!-- <div class="master-nickname" v-if="masterList.length">/TA的作品/</div>
    <div class="artwork-list">
        <div v-for="item in masterList" class="row">
            <img :src="item.img" width="100%;">
        </div>
    </div>
    

    <div class="master-nickname" v-if="masterList.length">更多作品></div> -->
    <!-- <span style="color:gray;font-size:14px;text-align:center;height:20px;display:flex;justify-content:center;margin:0auto;" v-if="masterList.length">共{{total}}件</span>
    <div class="line" v-if="preferenceList.length"></div> -->
    <div class="master-detail-nickname" v-if="preferenceList.length">/好物频道/</div>

    <!-- <preference-item summary="{{item.summary}}" cover="{{item.cover}}" tag="{{item.tag}}"></preference-item> -->
    
    <div class="preference-item" v-for="item in preferenceList" style="margin-top:10px;">
        <div class="item">
            <div class="left-item">
                <div class="item-content">
                    <div class="tag" v-if="item.tag.length">#{{item.tag}}#</div>
                    <div class="summary">{{item.summary}}</div>
                </div>
            </div>
            <img class="detail-img" src="{{item.cover}}"></img>
            <div style="width:100%;height:10px;"></div>
        </div>
    </div>

    <div style="width:100%;height:50px;"></div>
</template>

<script>
    import floatbtn from '../../components/floatbtn'
    import {
        configShare
    }
    from '../../lib/wxclient'
    
    export default {
        components: {
            floatbtn
        },
        ready: function() {
            this.getMasterInfo();
            this.getMasterPreferenceInfo();
            this.getShareInfo();
        },
        data: function() {
            return {
                masterDict: {},
                masterList: [],
                preferenceList: [],
                total: 0,
            }
        },
        methods: {
            getMasterInfo: function() {
                this.$http.post('', {
                    act: 'master_getMasterInfo',
                    id: this.$route.params.id,
                }).then((result) => {
                    log('getMasterInfo', result)
                    if (result && result.data && result.data.code == 200) {
                        var retdata = result.data.data
                        this.masterDict = retdata.master
                        this.total = retdata.total

                        this.masterList = retdata.list
                        // var modifiedMasterList = []
                        // for (var i = 0; i < masterList.length; i+=2) {
                        //     var item = []
                        //     item.push(masterList[i])
                        //     if (masterList.length >= i) {
                        //         item.push(masterList[i+1])
                        //     }
                        //     modifiedMasterList.push(item)
                        // }
                        // this.masterList = modifiedMasterList

                        // this.masterList = retdata.list 
                    }
                });
            },
            getMasterPreferenceInfo: function() {
                this.$http.post('', {
                    act: 'preference_getListByMasterId',
                    group: 'preference',
                    masterId: this.$route.params.id,
                }).then((result) => {
                    log('getMasterPreferenceInfo', result)
                    if (result && result.data && result.data.code == 200) {
                        this.preferenceList = result.data.datalist
                    }
                });
            },
            getShareInfo() {
                this.$http.post('', {
                    act: 'share_getInfo',
                    type: 'master',
                    id: this.$route.params.id
                }).then((resp) => {
                    log(resp);
                    if (resp && resp.data) {
                        log('ddd')
                        if (resp.data.code == 200) {
                            log('eee')
                            var result = resp.data.data;

                            var share_info = {
                                title: result.title,
                                desc: result.summary,
                                link: window.location.href,
                                imgUrl: result.img
                            };
                            setTimeout(configShare(share_info),3000);
                            
                        }
                    }
                })
            },
            loadmore(){
                this.page++;
                this.getArtworks();
            },
            success (src, ele) {
              log('success load', src)
          },
          error (src, ele, msg) {
              log('error load', msg, src)
          },
      },
  }
</script>
