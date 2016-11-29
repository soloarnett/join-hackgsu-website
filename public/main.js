var bodyPos = $('body').scrollTop();
var sections = ['wih', 'org', 'mark', 'tech', 'admin', 'awe'];
var numOfSections = sections.length;
var windowWidth = window.innerWidth;

function getSectionTitleSize(section){
	return $('.title.' + section).height() + 20;
}

function getSectionPosition(section){
	return $('.title.' + section).offset().top - ($('.title.' + section).height() + 20) + 12;
}

function getSectionTopPosition(section){
	return $('.container.' + section).offset().top - 60 + 2;
}

function getSectionNextPosition(section1, section2){
	// console.log(getSectionTopPosition(section2) - (getSectionTitleSize(section1) + (22 * (parseInt((getSectionTitleSize(section1) - 20)/parseInt($('.container.' + section1 + ' .title').css('font-size') + 5)))  ) ));
	if (getSectionTitleSize(section2) > getSectionTitleSize(section1)) {
		console.log(false);
		return getSectionTopPosition(section2) - (getSectionTitleSize(section1) + (22 * (parseInt((getSectionTitleSize(section1) - 20)/parseInt($('.container.' + section1 + ' .title').css('font-size') + 5)) - (1 * 
			parseInt(parseInt((getSectionTitleSize(section1) - 20)/parseInt($('.container.' + section1 + ' .title').css('font-size') + 5)) / 2)
			) )  ) );
	}else{
		console.log(true);
		return getSectionTopPosition(section2) - (getSectionTitleSize(section1) + 22); //* (parseInt((getSectionTitleSize(section2) - 20)/parseInt($('.container.' + section2 + ' .title').css('font-size') + 5)))  ) );
	}
	

}

function scrolling(){
	/*
		FUNCTION NAME:	scrolling
		PARAMETERS:		none
		DESCRIPTION:	do this stuff when the browser scrolls
	*/
	windowWidth = window.innerWidth;

	bodyPos = $('body').scrollTop();
	// console.log('bodyPos is ' + bodyPos);

	/////////////////////////////////////////// apply attributes to all sections ///////////////////////////////////////////
	
	if (windowWidth > 600) {
		for(i = 0; i< numOfSections; i++){
			if (bodyPos > getSectionTopPosition(sections[i])) {
				move(sections[i]);
				if ((i+1) < numOfSections){
					if( bodyPos > getSectionNextPosition(sections[i], sections[i+1])){
						stay(sections[i]);
					}else{
						reset(sections[i+1]);
					}
				}
			}else{
				reset(sections[i]);
			}
		}
	}
	
}

function move(elem){
	$('.container.' + elem + ' .title').css('top', (bodyPos + 20 - ($('.container.' + elem).offset().top - 60)) + 'px');
}

function stay(elem){
	$('.container.' + elem + ' .title').css('top', 
		$('.container.' + elem).height() - ($('.container.' + elem + ' .title').height() + 20)
	);
}

function reset(elem){
	$('.container.' + elem + ' .title').css('top', '20px');
}

/////////////////////////////////////////// READY ///////////////////////////////////////////


$(document).ready(function(){
	// console.log((parseInt((getSectionTitleSize('wih') - 20)/parseInt($('.container.' + 'wih' + ' .title').css('font-size') + 5)))  );
	scrolling();
	window.onscroll = scrolling;
	window.onresize = scrolling;

});