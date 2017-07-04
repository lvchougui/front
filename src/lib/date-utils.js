export default {
	format2yyyyMMdd(date){
		if(date instanceof Date){

			var mon = '0' + (date.getMonth()+1);
			mon = mon.substring(mon.length-2,mon.length);

			var day = '0' + date.getDate();
			day = day.substring(day.length-2, day.length);

			return date = date.getFullYear() + '-' + mon+'-'+day;
		}
		return '';
	}
}