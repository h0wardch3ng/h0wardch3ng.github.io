
$(document).ready(function(){
	$(".creditContainer").hide(0);
	$(".buttomButtons").hide(0);

	$(".timerTitle").hide(0);
	$(".timerContainer1").hide(0);
	$(".timerContainer2").hide(0);
	$(".hashtag").hide(0);

	$(".timerTitle").show(1000);
	$(".timerContainer1").delay(3000).show(1000);
	$(".timerContainer2").delay(6000).show(1000);
	$(".hashtag").delay(9000).show(1000);


	$(".buttomButtons").delay(12000).show(1000);
	
	updateTime();		
});

function updateTime()
{

	var d2047 = new Date("July 1, 2047 00:00:00");	//july first 2047
	var dNow = new Date();
	var n = Math.floor((d2047.getTime() - dNow.getTime())/1000);
	if(n < 0) n = 0;

	$(".timerContainer1").html(n);

	var outputString = Math.floor(n/86400);
	n %= 86400;
	outputString += " days " + Math.floor(n/3600) + " Hr ";
	n %= 3600;
	if(n/60<10) outputString += "0";
	outputString += Math.floor(n/60) + " Min ";
	n %= 60;
	if(n<10) outputString += "0";
	outputString += n + " Sec";


	$(".timerContainer2").html(outputString);
	window.setTimeout(updateTime, 1000);
}

$(".cleanBg").click(function(){
	if($(".buttomButtons").css("opacity")<=1)
	{
		$(".buttomButtons").show(1000);
		$(".bubble").animate({opacity:0,marginTop:-400},500).hide(0);

		$(".container").clearQueue().show(1000);

		$(".countdownBg").fadeTo(1,0.5);
	}
});


$(".button").click(function(){
	$(".buttomButtons").hide(1000);
	$(".formContainer").show(0).animate({opacity:0,marginTop:-50},0).animate({opacity:1,marginTop:-200},1000);

	$(".container").hide(300);

});


$(".creditBtn").click(function(){
	$(".buttomButtons").hide(1000);
	$(".creditContainer").show(0).animate({opacity:0,marginTop:$(".creditContainer").height()*-0.5+150},0).animate({opacity:1,marginTop:$(".creditContainer").height()*-0.5},1000);

	$(".container").delay(1000).hide(100);

	$(".countdownBg").fadeTo(1,0.8);
});


$(".homeBtn").click(function(){
	location.href="http://addoilteam.hk/index.html";
});
$(".hashtag").click(function(){
	location.href="https://www.instagram.com/explore/tags/2047hk/";
});

