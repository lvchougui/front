const PAY_SUCCESS = 1,
  PAY_CANCEL = 0,
  PAY_FAILED = -1;

function payCallback(code) {

  if(PAY_SUCCESS == code){
  	setTimeout(()=>{
  		window.location.href=window.location.href;
  	},1000);
  }
}
