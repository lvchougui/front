<style type="text/css">
	.date-list{
		padding: 0;
		overflow-x: scroll;
		overflow-y: hidden;
		white-space:nowrap
	}
	.date-list .date {
		color: #fff;
		display:inline-block;
		*display:inline;
		text-align: center;
		height: 30px;
		line-height: 30px;
		width: 80px;
		font-size: 14px;
	}
	.date-list .normal {
		background-color: rgba(0,0,0,0.8);

	}
	.date-list .selected {
		background-color: #58bc9a;
	}
	.stage-list {
		margin-top: 30px;
	}
</style>
<template>
	<ul class="date-list" >
		<li 
			v-bind:class="{'selected':index==selectedIndex, 'normal':index!=selectedIndex}" 
			class="date" 
			@click="selectedIndex=index"
			v-for="(index,date) in dates">
			<span>{{date}}</span>
		</li>
	</ul>
	<stage-list :data="stages"></stage-list>
</template>
<script>
	import StageList from '../partial/stage-list'
	import dateUtils from '../../lib/date-utils'

	export default {
		route:{
			data(){
				document.title="拍卖";
			}
		},
		components:{
			StageList
		},
		ready(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'拍卖',back:false}])
			this.getData();
		},
		data(){
			return {
				selectedIndex:-1,
				dates:[],
				rawDates:[],
				date:'',
				stages:[]
			}
		},
		methods:{
			getData(){
				this.getDates();
			},

			// 拍卖日期列表
			getDates(){
				this.$http.post('',{
					act:'auctionstage_getTimes'
				}).then((result)=>{

					log(result.data);
					
					if (result && result.data && result.data.code == 200) {

						var datalist = result.data.datalist;
						if(!datalist || datalist.length == 0){
							return;
						}
						datalist = datalist.reverse();
						this.rawDates = datalist;
						
						var today = dateUtils.format2yyyyMMdd(new Date());
						
						var tmp = [];
						for(var i in this.rawDates){
							var d  =this.rawDates[i];
							if(d == today){
								this.selectedIndex = i;
							}
							var strs = d.split('-');
							tmp[i] = strs[1]+'月'+strs[2]+'日';
						}

						if(this.selectedIndex == -1){
							this.selectedIndex = 0;
						}
						this.dates = tmp;
					}
				})
			},

			getStagesByDate(){
				
				this.date = this.rawDates[this.selectedIndex];
							// 期次列表
				this.$http.post('',{
					act:'auctionstage_getList',
					time:this.date
				}).then((result)=>{
					if (result && result.data && result.data.code == 200) {
						var datalist = result.data.datalist;
						this.stages = datalist;
					}
				})
			}
		},
		watch:{
			selectedIndex (){
				
				this.getStagesByDate();

				var container = document.getElementsByClassName('date-list')[0];
				var selected = document.getElementsByClassName('selected')[0];
				container.scrollLeft = selected.offsetLeft - window.outerWidth/2 + 40;
			}
		}
	}
</script>