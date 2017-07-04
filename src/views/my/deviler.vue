<template>
	<dl class="deliver-top">
		<dt>物流公司: </dt>
		<dd>{{mainData.company}}</dd><br/>
		<dt>客服电话: </dt>
		<dd><a :href="'tel:' + mainData.phone">{{mainData.phone}}</a></dd><br/>
		<dt>物流单号: </dt>
		<dd>{{mainData.nu}}</dd><br/>
		<dt>运单状态:</dt>
		<dd class="stat">{{mainData.state}}</dd><br/>
	</dl>
	<div class="deliver-mid">
		如暂无物流信息或对信息有疑问<br/>请拨打官方电话实时查询
	</div>
	<ul class="deliver-bot" v-show="mainData.list.length != 0">
		<li v-for='item in mainData.list'>
			<div class="dot"></div>
			<p>快件已到达: {{item.location}}</p>
			<p class="time">{{item.time}}</p>
		</li>
	</ul>
</template>

<script>
	export default {
		route:{
			data(){
				document.title="查看物流"
			}
		},
		ready() {
				this.id = this.$route.params.id;
				this.$dispatch.apply(this,['onTitleChanged',{title:'查看物流',back:true}])
				this.getDevilerData();
			},
			methods: {
				getDevilerData() {
					this.$http.post('', {
						act: 'commonOrder_getDeliveryMessages',
						ordersn: this.id
					}).then((result) => {
						this.mainData = result.data.data;
					})
				},
			},
			data() {
				return {
					id: '',
					mainData: {}
				}
			}
	}
</script>

<style>
	.deliver-top {
		background-color: #fafafa;
		border-top: 1px solid rgb(220,220,220);
		border-bottom: 1px solid rgb(220,220,220);
		padding: 8px;
		font-size: 0.875em;
	}
	
	.deliver-top dt, .deliver-top dd {
		display: inline-block;
	}
	
	.deliver-top dt {
		color: #646464;
		margin-right: 4px;
	}
	
	.deliver-top a {
		text-decoration: none;
		color: #64b5f6;
	}
	
	.deliver-top .stat {
		color: #58bc9a;
	}
	
	.deliver-mid {
		padding: 8px;
		font-size: 0.75em;
		color: #646464;
		text-align: center;
	}
	
	.deliver-bot {
		background-color: #fafafa;
		border-top: 1px solid rgb(220,220,220);
		border-bottom: 1px solid rgb(220,220,220);
		padding: 0;
	}
	
	.deliver-bot li {
		height: 60px;
		margin-left: 16px;
		border-top: 1px solid rgb(220,220,220);
		border-left: 1px solid rgb(220,220,220);
		position: relative;
		padding-left: 8px;
	}
	
	.deliver-bot li:first-child {
		border-top: none;
	}
	
	.deliver-bot li .dot {
		width: 5px;
		height: 5px;
		border-radius: 3.5px;
		background-color: rgb(220,220,220);
		border: 1px solid #fafafa;
		position: absolute;
		left: -4px;
		top: 25px;
	}
	
	.deliver-bot li p {
		height: 30px;
		line-height: 30px;
		font-size: 0.875em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.deliver-bot li .time {
		color: #646464;
	}
</style>