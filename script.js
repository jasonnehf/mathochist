$(document).ready(init);

var $resetbtn;
var $submitbtn;
var $rerollbtn;

var $stars;
var $deck;

function init(event) {
	$resetbtn = $("#button-reset");
	$submitbtn = $("#button-submit");
	$rerollbtn = $("#button-reroll");
	$message=$("#message");

	$stars=$("#star-container");
	$stars.data("value",-1);
	$deck=$("#deck-container");
	
	console.log("ready!");
	
	// for(var i=0;i<10;i++)
	// {
		
	// }

	$deck.on('click', ".card:not(.disabled)",cardClicked);

	$resetbtn.on('click',resetClicked);
	$submitbtn.on('click',submitClicked);
	$rerollbtn.on('click',rerollClicked);

	$(document).on('keydown',cheatcode);

	$deck.on('click',cardClicked);

	resetClicked(event); 	// just intializing/resetting the board

	// $("#entry-button").on('click', addItemToMain);
	// $(".group-container").on('click', '.list-item, .group', itemClicked);		
	// $(".group-container").on('dblclick', '.list-item', itemDblClicked);	
}

function cheatcode(event)
{
	console.log("cheatcode");
	$(".card:not(.clicked)").removeClass("clicked").addClass("disabled");	
}

function makeNewStars() {
	// console.log("newstars");
	$stars.empty();
	var num=Math.floor(Math.random()*5)+6;
	// while(num!==$stars.data().value)
	// {
	// 	
	// }
	for(var i=0;i<num;i++) {
		var $newstar=$('<div>').addClass("star");
		$stars.append($newstar);
		// console.log("madenewstar:", $newstar);

	}
	$stars.find(".star").addClass('animated flipInY');
	$stars.data("value",num);
}

function resetClicked(event) {
	console.log("reset");
	$(".clicked").removeClass("clicked");
	$(".disabled").removeClass("disabled");
	
	resetReroll();
	makeNewStars();

}
function submitClicked(event) {
	var allClickedData=$(".clicked").map(function(i) { return $(this).data().value;}).get();
	var sumAllClickedData=(allClickedData.length ? allClickedData.reduce((p,c)=>p+c) : 0);
	if(sumAllClickedData === $stars.data().value)
	{
		//you got it!
		console.log("yes");
		$(".clicked").removeClass("clicked").addClass("disabled");
		makeNewStars();
	}
	else
	{
		console.log("no");
		$message.text("Your answer is incorrect. Please try again.");
		$message.addClass("animated shake");
		$(".clicked").removeClass("clicked");
	}

	if($(".disabled").length===9)
	{
		$message.text("Holy shit! You won, dude!");
		$message.addClass("animated tada");
		$stars.find(".star").addClass('animated flipOutX');
		$("#thegrid").addClass('animated tada');

	}

}
function rerollClicked(event) {
	if($rerollbtn.data().rerolls > 0) {
		makeNewStars();
		setRerollCounter(-1);
	}
	else
	{
		$message.text("No re-rolls remaining! :(");
	}

}

function getClickedCardValues() {
}

function cardClicked(event) {
	var $this=$(this);
	$this.toggleClass("clicked");
}

function resetReroll()
{
	setRerollCounter(3);
	$message.text("");
}

function setRerollCounter(num) {
	
	if(num < 0) {
		num=$rerollbtn.data("rerolls")+num;
	}
	$rerollbtn.data("rerolls",num);
	$rerollbtn.text("Re-roll ("+num+" left)");
}