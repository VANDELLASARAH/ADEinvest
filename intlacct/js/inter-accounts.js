fontControl = {
adjustFont : function(link,id,size)
{
	var elmID = null;
	var newSize = null;
	var currentLink = null;
	var container = null;
	
	try
	{
		elmID = id;
		newSize = size;
		currentLink = link;

		if(typeof elmID == null || elmID == "undefined" ||
	      	typeof newSize == null || newSize == "undefined" ||
		     	typeof currentLink == null || currentLink == "undefined")
		{
			return false;
		}
		else
		{
			container =	document.getElementById(elmID);
		
			if(typeof container == null || container == "undefined")
			{
				return false;
			}
			else
			{
				container.style.fontSize = newSize + "px";
			}
			fontControl.changeAnchorText(currentLink);
		}
	}
	catch(e)
	{
		// do something here
	}
},
		
changeAnchorText : function(currentLink)
{
	var linkArr = new Array();
	linkArr[0] = document.getElementById("text1");
	linkArr[1] = document.getElementById("text2");
	linkArr[2] = document.getElementById("text3");
			
	for(i = 0; i < linkArr.length ; i++)
	{
		if(typeof linkArr[i] == "undefined" || linkArr[i] == null)
		{
			return false; 
		}		
		else
		{
			if(linkArr[i].id == currentLink)
			{
				linkArr[i].className = currentLink + " active";
			}
			else
			{
				linkArr[i].className = linkArr[i].id;
			}
		}
	}		
}
}
//Scripts

//Utility Functions

function addEvent(obj, type, fn) {
	
	try {

    if (obj.addEventListener) {

        obj.addEventListener(type, fn, false);



    } else if (obj.attachEvent) {

        obj["e" + type + fn] = fn;

        obj[type + fn] = function () {

            obj["e" + type + fn](window.event);

        }

        obj.attachEvent("on" + type, obj[type + fn]);

    } else {

        obj["on" + type] = obj["e" + type + fn];

    }
	
	}
	
	catch(e) {
		return;
	}

}


//Attach init functions to window on load event

addEvent(window, 'load', function () {

    init();

});

function init() {
	try	{
	isPrintPreviewPage();
	sideBarHeight();
	displayNextPreviousArticleLessons();
	displaySelectedClass();
	displayMessageHighLvlComp();
  //  displayLinkName();
    attachMouseEvents();
    attachValidationEvents();
	initFeatureWideOverThree();
	}
	
	catch(e)	{
		return;
	}
	
}

/* Start of Print Preview code */
function isPrintPreviewPage()
{
var urlInfo = window.location.href.indexOf("print=true");

if(urlInfo != -1)
  {	

    var element = document.createElement("link");
    element.href="/bin-public/060_www_fidelity_com/css/print.css";
    element.type="text/css";
    element.rel="stylesheet";
    element.media="screen, print";
    var headelement = document.getElementsByTagName('head')[0];
    headelement.appendChild(element);	

    var printElement = "<div id='print-preview-region-1'><div class='header-region'><div class='align-logo'> " +
    "<img src='/bin-public/060_www_fidelity_com/images/css/fidelityDotBlack.gif' alt='Fidelity Logo' title='Fidelity Logo'/></div>" +
    "<input id='btnPrint' type='button' value='Print' onclick='printPage();'/></div><div class='Double-Horizontal-Rule'>"+
    "<hr class='hr-for-ie'/></div></div>";

    document.getElementById('layout-region-page-controls').innerHTML = printElement;

    var rightSideRail = document.getElementById('layout-region-right-rail').innerHTML;

    document.getElementById('layout-region-right-rail').innerHTML = document.getElementById('layout-region-page-disclosure').innerHTML;
    document.getElementById('layout-region-page-disclosure').innerHTML = rightSideRail;
    replaceVideo();
    disableLinks();
  }
}

function loadPrintPreview()
{
    var urlInfo = window.location.href.split("?");
    if(urlInfo.length == 1)
    {
      var url = window.location.href.split("#")[0] + "?print=true";
    }
    else
    {	
	var url = window.location.href.split("#")[0] + "&print=true";
    }

    var printWindow = window.open(url, 'printWindow', 'menubar=0,location=0,resizable=0,scrollbars=1,status=0,width=696,height=500');

    if (window.focus) {
	printWindow.focus();		
    }
}
function printPage() {   
	window.print();
}

function disableLinks()
{
//retrieve links on the page
	objLinks = document.links;
	var i = objLinks.length;	
	while (i)
	{
	modifyLinkCSS(objLinks[i - 1]);
	i--;
	}
}

function modifyLinkCSS(argLink)
{
	argLink.style.color = "#000000";
	argLink.style.cursor = "default";
	argLink.style.textDecoration = "underline";
}
/* End of Print Preview code */
// Maintain height consistency between article and sidebar
function sideBarHeight()	{
	// If page type equals article page then ensure the sidebar and article are the same height
    try{
		if (pageGlobals.pageTemplateType == "article")	{
		
			// Get height of article layout region
			var articleHeight = document.getElementById('layout-region-3').offsetHeight - 1;
			// Set height of sidebar layout region equal to article layout region
			document.getElementById('layout-region-4').style.height = articleHeight + 'px';
			
		}
		
		else	{
		
			return;
			
		}
   }	catch(e)	{ return ;}
}
function attachValidationEvents()
{
try{

//var btnGo =document.getElementById("go");
var form = document.getElementById('zipCodeForm');;
 
addEvent(form, 'submit', function () {
			
			zipCodeValidation();
			
			});
 }
 catch(e){return;}

}
function zipCodeValidation()
{
   
		   var txtZipCode = document.getElementById("zipCode").value;
		   if((IsNumeric(txtZipCode)== false) || (txtZipCode.length<5))
		   {
		    
			 document.getElementById("errorMessage").style.display='block';
             stopEvent();
			 
		   }
		   else
		   {
		 
			document.getElementById("errorMessage").style.display='none';
			
		   }
   
}
function IsNumeric(input){
  var reg = new RegExp("^[0-9]{1,5}$");
    return (reg.test(input));
}

function stopEvent() {

	   var e = getEvent();
	
	//e.cancelBubble is supported by IE - this will kill the bubbling process.
	e.cancelBubble = true;
	e.returnValue = false;

	//e.stopPropagation works only in Firefox.
	if (e.stopPropagation) {
		e.stopPropagation();
		e.preventDefault();
	}
	return false;
}

function getEvent() {

 //if(typeof window.event  == "undefined") 
 // return advancedlink.caller.arguments[0];
 if (window.event) return window.event;
 else return zipCodeValidation.caller.arguments[0];
}

function attachMouseEvents(){

  try
  {
		var courseLink = getElementsByClassName('courseLessonLink','A');
		var courseLinkPopups = getElementsByClassName('course-details-popup','div');
		//alert(courseLinkPopups.length);
		//var divId = document.getElementById('courselessons');
		for (var i = 0; i < courseLink.length; i++) {
			{
				courseLink[i].popupId = courseLinkPopups[i];
			
				addEvent(courseLink[i], 'mouseover', function(){
						ShowCourseDetails(this);
					});
						
				addEvent(courseLink[i], 'focus', function(){
				
					ShowCourseDetails(this);
						});
						
				addEvent(courseLink[i], 'mouseout', function(){
				
					HideCourseDetails(this);
					

						});
						
				addEvent(courseLink[i], 'blur', function(){
				
					
					
						HideCourseDetails(this);
						});
			}
			
		}
	}
	catch(e){return;}
}



//UTILITY FUNCTIONS
	function getAbsoluteLeft(o) {    
		oLeft = o.offsetLeft	
		while(o.offsetParent!=null) {	
			oParent = o.offsetParent	
			oLeft += oParent.offsetLeft	
			o = oParent	
		}	
		return oLeft	
	}
	
	function getAbsoluteTop(o) {	
		oTop = o.offsetTop	
		while(o.offsetParent!=null) {	
			oParent = o.offsetParent	
			oTop += oParent.offsetTop	
			o = oParent	
		}	
		return oTop	
	}


	
	
	
	
//For showing the pop-up on mouse Hover
function ShowCourseDetails(linkID) {
	
	var divblk = linkID.popupId;
	var xDiff =0;
	var yDiff = 25;
	var posX = linkID.offsetLeft;
	//alert(linkID.offsetLeft);
	var posY = linkID.offsetTop;
		if(divblk.className =='course-details-popup')
		xDiff = 30;
		else
		xDiff = 220;
	divblk.style.display="block";
	divblk.style.left = (getAbsoluteLeft(linkID)- xDiff)+"px";	
	divblk.style.top = (getAbsoluteTop(linkID) + yDiff) +"px";	
		var targTop = parseInt(divblk.style.top);
		var targLeft = parseInt(divblk.style.left);
		if((targLeft + divblk.offsetWidth) > screen.right){				
		divblk.style.left = (getAbsoluteLeft(linkID)-(targLeft + divblk.offsetWidth-screen.right)) + "px";
		}
		if((targTop) < screen.top){				
		 
		divblk.style.top = (getAbsoluteTop(linkID)+ linkID.offsetHeight) + "px";
		}
	
	
}

//For hiding the pop-up on mouse out
function HideCourseDetails(linkID){

	var divblk = linkID.popupId;
	
	if (divblk.style.display == "block") {
		divblk.style.display = "none";
	}
}


//UTILITY FUNCTIONS
	function getAbsoluteLeft(o) {    
		oLeft = o.offsetLeft	
		while(o.offsetParent!=null) {	
			oParent = o.offsetParent	
			oLeft += oParent.offsetLeft	
			o = oParent	
		}	
		return oLeft	
	}
	
	function getAbsoluteTop(o) {	
		oTop = o.offsetTop	
		while(o.offsetParent!=null) {	
			oParent = o.offsetParent	
			oTop += oParent.offsetTop	
			o = oParent	
		}	
		return oTop	
	}
	
		function getScrollXY() {
	  var scrOfX = 0, scrOfY = 0;
	  if(typeof(window.pageYOffset) == 'number') {
	    //Netscape compliant
	    scrOfY = window.pageYOffset;
	    scrOfX = window.pageXOffset;
	  } else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
	    //DOM compliant
	    scrOfY = document.body.scrollTop;
	    scrOfX = document.body.scrollLeft;
	  } else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) ) {
	    //IE6 standards compliant mode
	    scrOfY = document.documentElement.scrollTop;
	    scrOfX = document.documentElement.scrollLeft;
	  }
	  return [ scrOfX, scrOfY ];
	}
	
	function getWindowSize(){	
	  var winWidth = 0, winHeight = 0;
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    winWidth = window.innerWidth;
	    winHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    winWidth = document.documentElement.clientWidth;
	    winHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    winWidth = document.body.clientWidth;
	    winHeight = document.body.clientHeight;
	  }
	 return [winWidth,winHeight];
	}

	function ScreenObject(){		
		var _docHeight = (document.height || document.body.offsetHeight);
		var _docWidth = (document.width || document.body.offsetWidth);
		
		this.left = getScrollXY()[0];
		this.right = _docWidth > getWindowSize()[0] ? getWindowSize()[0] + getScrollXY()[0]:_docWidth;
		this.top =  getScrollXY()[1];
		this.bottom =   _docHeight > getWindowSize()[1]?getWindowSize()[1] + getScrollXY()[1]:_docHeight;		
		return this;
	}


/*function displayLinkName(){
		var courseLink = document.getElementsByTagName('A');
		
		for (var i = 0; i < courseLink.length; i++) {
			if (courseLink[i].id == 'courseLessonLink') 
				courseLink[i].innerHTML = '6 lessons';
			}
	}*/

	
	var getElementsByClassName = function (classname,tag) {	
	 	if(!tag) tag = "*";
	 	var elements =  document.getElementsByTagName(tag);
	 	var total_elements = elements.length;
	 	var regexp = new RegExp('\\b' + classname + '\\b');
	 	var class_elements = new Array();
	  	//Go thru all the links seaching for the class name
	 	for(var i = 0; i < total_elements; i++) { 
	 		var this_element = elements[i];
	 		if(regexp.test(this_element.className)) {
	 			class_elements.push(this_element);
	  	}
	 }
	 
	 return class_elements;
		 
	}
	
	
	function displaySelectedClass()
	{
	   try
	   {
			var mainDiv = getElementsByClassName('collection-navigation-right','div')[0];
			var contentComponent = document.getElementById('fmr-content-component');
			if (mainDiv)
			{
				var divLi   = mainDiv.getElementsByTagName('li');
		
				
				for(var i = 0; i < divLi.length; i++)
				{
					if (divLi[i].getAttribute('data-fmrTcmId') == contentComponent.getAttribute('data-fmrTcmId'))
					{
						divLi[i].className += " selected";
					}
					else
					{
						if (divLi[i].className.indexOf('selected') != -1) 
							divLi[i].className.replace('selected', '');
					}
				}
			}
	   }
	   catch(e){return;}
		
	}


	




/* Page Control JS */

var articleControl = {};
 
var Destination = {};
var timeoutId;

Destination.displayPopIn = function(e, id){
	clearTimeout(timeoutId);
	timeoutId = setTimeout(function()
	{
		Destination.displayPopIn(e, id);
	}, 1000);
}

/**
 * Returns the left offset got a givem element
 * @param {Object} This
 */
Destination.getOffsetLeft = function(This) {
	var el = This;
	var pL = 0;
	while (el) {
		pL += el.offsetLeft;
		el = el.offsetParent;
	}
	return pL;
};
    
/**
 * Returns the top offset got a givem element
 * @param {Object} This
 */
Destination.getOffsetTop = function(This) {
	var el = This;
	var pT = 0;
	while (el) {
		pT += el.offsetTop;
		el = el.offsetParent;
	}
	return pT;
}

Destination.getTarget = function(e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) { 
		targ = targ.parentNode;
	}
	return targ;
}

Destination.getCurrentStyle = function(el,styleProp) {
	if (el.currentStyle)
		var y = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
	return y;
}

/*
* Initialize the email fields so that they can work without double clicking on submit
*/
try {
	document.getElementById("friendEmail_status").innerHTML = "<div class='email_valid'<ul><li>Your e-mail address appears valid</li></ul></div>";
	document.getElementById("friendEmail_status").className = "hiddenDiv";	
	document.getElementById("friendemail-form").className = "friendemail-form-row";

	document.getElementById("userEmail_status").innerHTML = "<div class='email_valid'<ul><li>Your e-mail address appears valid</li></ul></div>";
	document.getElementById("userEmail_status").className = "hiddenDiv";
	document.getElementById("useremail-form").className = "useremail-form-row";
	
	var recipient = document.getElementById("friendEmail");
	if (!(typeof recipient == "undefined" || recipient == null))
	{
		// This value should coordinate with CS-203 validations for feeds
		recipient.setAttribute('maxLength', 500);
	}

	var sender = document.getElementById("userEmail");
	if (!(typeof sender == "undefined" || sender == null))
	{
		// This value should coordinate with CS-203 validations for feeds
		sender.setAttribute('maxLength', 50);
	}
} catch (e) {}



articleControl.formValidation = function(formId,formType) {
	var friend_flag = false || formType != "email" ;
	var user_flag = false || formType != "email";
	var message_flag = false || formType == "email" ;
	
	if(articleControl.validate_email("userEmail",formId)) {
		user_flag = true;
	}
	
	if(!friend_flag){
		if(articleControl.validate_email("friendEmail",formId)) {
			friend_flag = true;
		}
	}		
	if(!message_flag){
		if(articleControl.validate_email("messageBox",formId)) {
					message_flag = true;
		}
	}	
	if(!friend_flag || !user_flag || !message_flag) {
		return false;
	}	
	return true;
}
/**
 * Retrieves all of the necessary article data and submits the form to pagecontrol service
 */
articleControl.submitemail = function() {
	var formId = "emailFormArea";
	var formDivId = "emailform";
	var confirmFormId = "emailConfirm";
	var formType = "email";

	if(arguments.length == 3) {
		formDivId = arguments[0];
		formId  = arguments[1];
		confirmFormId = arguments[2];
	}

	var formElement = document.getElementById(formId );

	if(typeof formElement.formtype == "undefined" || formElement.formtype == null) {
		formType = "email";
	}else{
		formType = formElement.formtype.value;
	}	

	if(!articleControl.formValidation(formId,formType)){
		return false;
	}
	
	var articleSummary = "";
	var articleAuthor = "";
	var articleDate = articleControl.Date;
	var articleUrl = window.location.href;

	if((articleUrl.indexOf("ccsource") == -1) && formType == "email")
	{
		if(articleUrl.indexOf("?") == -1)
		{
			articleUrl += "?ccsource=email";
		}
		else{
			articleUrl += "&ccsource=email";
		}
	}

	//FMX doesnt support the port, hence striping of from the url,
	//This is only for testing purpose
	//Ideally port wont be there in prod urls
	articleUrl = articleUrl.replace(/:[0-9]+/ig,"");
	

	if(typeof formElement == "undefined" || formElement == null) {

		return false;
	}
	else {
		

		var userEmail_value = formElement.userEmail.value;
		var messageBox_value = formElement.messageBox.value;

		var mail_service = "/pf/service/pagecontrol/email";
		var params = "article_url=" + encodeURIComponent(articleUrl)  +
							"&message=" + escape(messageBox_value);

			if(formType == "email"){

				var pageTitle = (typeof pgCorePageTitle == "undefined" || pgCorePageTitle == "") ? "Fidelity Investments" : pgCorePageTitle;
				var friendEmail_value = formElement.friendEmail.value;

				params += "&sender=" + escape(userEmail_value) +								
								"&recipient=" + escape(friendEmail_value) +
								"&article_title=" + escape(pageTitle);

				if(formElement.emailfooter != null && formElement.emailfooter != "undefined")
				{
					params += "&emailfooter=" + escape(formElement.emailfooter.value);
				}
				

			} else {
				//get title within this form div
				var pageTitle = (typeof pgCorePageTitle == "undefined" || pgCorePageTitle == "") ? "Fidelity Investments" : pgCorePageTitle;
				params +="&emailtoken=" + escape(formElement.emailtoken.value) +
								"&emailsubjectline=" + escape(formElement.emailsubjectline.value) +
								"&formtype=" + escape(formElement.formtype.value) +
								"&article_title=" + escape(pageTitle);			
			}
		articleControl.callWebService(mail_service, params,formDivId, confirmFormId);		

	}
}
/**
 * Validates the e-mail which the user has entered
 * @param field - the input field that is currently being validated
 */
articleControl.validate_email = function(field) {
	if(arguments.length > 1) {
		formId  = arguments[1];	
	}
	else
	{
		formId = "emailFormArea";
	}
	
	var formArea = null;
	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

	try {		
		formArea = document.getElementById(formId);
		if(typeof formArea == "undefined" || formArea == null) 
		{
			return false;
		}
		else 
		{
			var outerDiv = "emailPopin";
			if(!formArea.formtype)
			{
				//default is email
				outerDiv = "emailPopin";
			}			
						
			if(typeof field == "undefined" && field == null )	
			{
				return false;
			}
			else if(field == "friendEmail" || field == "userEmail")
			{
				var successMsg = "";
				var failureMsg = "<div class='email_invalid'><ul><li>Please enter a valid e-mail address</li></ul></div>";
	
				if(field == "friendEmail")
				{
					formArea[field].value = formArea[field].value.split(", ").join(",").split("").join("");
					var emailArr =  formArea[field].value.split(",");
				
					var addressesValid = true;
					
					for (var i=0, il=emailArr.length; i<il; i++) {
						if(!filter.test(emailArr[i])) {
							addressesValid = false;
							break;
						}
					}
					
					if (addressesValid) 
					{
						articleControl.friendEmail_valid = true;
						writeToInnerDiv(outerDiv,"friendEmail_status", "","hiddenDiv");
						document.getElementById('friendemail-form').className='friendemail-form-row';
							
					}
					else {
						articleControl.friendEmail_valid = false;
						writeToInnerDiv(outerDiv,"friendEmail_status", failureMsg, "visibleDiv");
						document.getElementById('friendemail-form').className='friendemail-form-row error';
													
					}
					
					document.getElementById('blankdiv').style.height = document.getElementById('emailform').offsetHeight + 20 + "px";
					return articleControl.friendEmail_valid;
					
					
				}
				else if(field == "userEmail") 
				{
					if(filter.test(formArea.userEmail.value)) 
					{
						articleControl.userEmail_valid = true;
						writeToInnerDiv(outerDiv,"userEmail_status", "","hiddenDiv");
						document.getElementById('useremail-form').className='useremail-form-row';

					}
					else 
					{
						articleControl.userEmail_valid  = false;
						writeToInnerDiv(outerDiv,"userEmail_status", failureMsg, "visibleDiv");
						document.getElementById('useremail-form').className= 'useremail-form-row error';																		
					}
					document.getElementById('blankdiv').style.height = document.getElementById('emailform').offsetHeight + 20 + "px";	
					return articleControl.userEmail_valid;
				}
				

			}
			if(formId != "emailFormArea")
			{
				if(field == "messageBox") 
				{
					if(formArea.formtype.value == "question")
					{
						var failureMsg = "<div class='email_invalid'><ul><li>Please enter your question</li></ul></div>";
					}
					else if(formArea.formtype.value == "feedback")
					{	
						var failureMsg = "<div class='email_invalid'><ul><li>Please enter your feedback</li></ul></div>";
					}
					
					var message = document.getElementById(formId).messageBox.value;
							
					if(message !=null && message.trim() != "" ) 
					{
						articleControl.messageBox_valid = true;
						//clear error messgae
						writeToInnerDiv(outerDiv,"messageBox_status", "", "hiddenDiv");
							
					}
					else
					{
						articleControl.messageBox_valid = false;
						writeToInnerDiv(outerDiv,"messageBox_status", failureMsg, "visibleDiv");
					}
					return articleControl.messageBox_valid;
				}
			}
		}
	}
	catch(e) {
		articleControl	.shoutError(e, "validate_email()");
	}
}

/**
 * Clears the e-mail form
 */
articleControl.clearEmail = function(divId) {

	//default
	var outerDiv = "emailPopin";
	try {
		articleControl.userEmail_valid = false;
		articleControl.friendEmail_valid = false;
		articleControl.messageBox_valid = false;
		
		var formDiv = document.getElementById(divId);
		var thisFormId = formDiv.getAttribute("formid");
		if(!thisFormId)
		{
			thisFormId = "emailFormArea";
		}
		
		var formArea = document.getElementById(thisFormId);
		
		if(typeof formArea == "undefined" || formArea == null) 
		{
			return false;
		}
		else 
		{	
			if(formArea.friendEmail)
			{
				formArea.friendEmail.value = "";
				writeToInnerDivById(divId, "friendEmail_status", "", "hiddenDiv","div");
				document.getElementById("friendemail-form").className = "friendemail-form-row";
			}
			if(formArea.userEmail)
			{
				formArea.userEmail.value = "";
				writeToInnerDivById(divId, "userEmail_status", "", "hiddenDiv","div");
				document.getElementById("useremail-form").className = "useremail-form-row";
			}
			if(formArea.messageBox)
			{
				formArea.messageBox.value = "";
				writeToInnerDivById(divId, "messageBox_status", "", "hiddenDiv","div");
			}
		}
			
		
	}
	catch(e) {
		articleControl.shoutError(e, "clearEmail()");
	}
}

/*
 * Cross browser function for retrieving global/external CSS properties   
 */

function isFixedSupported()
{
    var testDiv = document.createElement("div");
    testDiv.id = "testingPositionFixed";
    testDiv.style.position = "fixed";
    testDiv.style.top = "0px";
    testDiv.style.right = "0px";
    document.body.appendChild(testDiv);
	
    var offset = 1;
	
    if (typeof testDiv.offsetTop == "number" &&
    testDiv.offsetTop != null &&
    testDiv.offsetTop != "undefined") 
    {
        offset = parseInt(testDiv.offsetTop);
    }
    if (offset == 0)
    {
        return true;
    }
    
    return false;
};


function getStyle(element, cssprop)
{



    if (element.currentStyle) //IE
	{

		return element.currentStyle[cssprop];
	}
	else 
	{

		if (document.defaultView && document.defaultView.getComputedStyle) //Firefox
		{

			return document.defaultView.getComputedStyle(element, "")[cssprop];
		}
		else //try and get inline style
 		{

			return element.style[cssprop];
		}
	}
}

/*
 * Wrapper function for getStyle to return int value for position specific styles
 */
function getPosition(element, position)
{

	var pixelValue = getStyle(element, position);
	
	if (pixelValue != "") 
	{
		var intValue = pixelValue.replace(/px/i, "");
		
		if (isNaN(intValue)) 
		{
			return "";
		}
		else 
		{
			return intValue;
		}
	}
	else
	{
		return pixelValue;
	}
}

function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

/*
 * Adds a div to the page within parentDiv;
 * Can give it an ID and a Class
 * @author a474372
 */
function appendDiv(parentDiv, divId, className) {
	var divTag = document.createElement("div");
	var parentDiv = document.getElementById(parentDiv);
	parentDiv.appendChild(divTag);
	
	if(divId != null) {
		divTag.id = divId;
	}
	if(className != null) {
		divTag.className = className;
	}
}	

/*
 * Global flag to cache the fact that the browser supports fixed positioning
 * Should be set to null here and will be intialized by the first FloatingDiv
 * object created
 */
var browserSupportsFixed = null;

/*
 * Creates a floating div object based on the given content div that floats 
 * the content at a position specified by CSS corresponding to the div
 *
 * Usage:
 * var floatingDiv = new FloatingDiv("someId");
 * floatingDiv.init();
 * ............
 * floatingDiv.reset();
 * You would need to cache the reference to be able call reset in a different part of your code
 */
var FloatingDiv = function(floatingDivId)
{
	// Cache a reference to the current object
	var floatingDivObj = this;
	
	// Browser capabilities	
	this.hasInner = (typeof(window.innerWidth) == 'number');

	this.hasElement = ((document.documentElement != null) && (document.documentElement.clientWidth));
	
	// Getting a reference to the actual content div 
	this.content = (document.getElementById ? document.getElementById(floatingDivId) : document.all ? document.all[floatingDivId] : document.layers[floatingDivId]);
	
	// Positioning variables
	this.currentX = 0;
	this.currentY = 0;
	this.shiftX = 0;
	this.shiftY = 0;
	this.defaultTargetLeft = NaN;
	this.defaultTargetTop = NaN;
	this.defaultTargetRight = NaN;
	this.defaultTargetBottom = NaN;	
	this.targetLeft = 0;
	this.targetTop = 0;
	this.targetRight = 0;
	this.targetBottom = 0;
	
	
	// Initialize the global flag only once
	if (browserSupportsFixed == null) 
	{
		browserSupportsFixed = isFixedSupported();
	}
	
	/*
	 * Callback function for registering as a scroll event listener
	 */ 
	this.floatContent = function()
	{
		floatingDivObj.moveContent();
	};
	
	/*
	 * Deferred initialization function
	 * Registers a scroll event listener in case the browser does not support fixed
	 */ 
	this.init = function()
	{

		this.currentX = 0;
		this.currentY = 0;
		this.shiftX = 0;
		this.shiftY = 0;
		this.targetLeft = 0;
		this.targetTop = 0;
		this.targetRight = 0;
		this.targetBottom = 0;
		
		// IE7+, FF
		if (browserSupportsFixed) 
		{

			//this.content.style.position = "fixed";
		}
		else 
		{	// IE6

			// Uses getPosition from styleUtil to get the evaluated CSS styles
			this.targetLeft = parseInt(getPosition(this.content, 'left'));
			this.targetTop = parseInt(getPosition(this.content, 'top'));
			this.targetRight = parseInt(getPosition(this.content, 'right'));
			this.targetBottom = parseInt(getPosition(this.content, 'bottom'));
			
			this.defaultTargetLeft = this.targetLeft;
			this.defaultTargetTop = this.targetTop;
			this.defaultTargetRight = this.targetRight;
			this.defaultTargetBottom = this.targetBottom;
			
			if (document.layers) 
			{

				content.left = 0;
				content.top = 0;
			}
			
			// Register a listener for the scroll event 
			this.addEvent(window, 'onscroll', floatingDivObj.floatContent);
			
			// Move the content now
			floatingDivObj.moveContent();

		}
	};
	
	/*
	 * Unregisters the event listener registered in init()
	 * Restores positioning
	 */
	this.reset = function()
	{

		this.currentX = 0;
		this.currentY = 0;
		this.shiftX = 0;
		this.shiftY = 0;
		this.targetLeft = 0;
		this.targetTop = 0;
		this.targetRight = 0;
		this.targetBottom = 0;
		
		if (!isNaN(this.defaultTargetLeft)) 
		{
			this.content.style.left = this.defaultTargetLeft + 'px';
		}

		if (!isNaN(this.defaultTargetTop)) 
		{
			this.content.style.top = this.defaultTargetTop + 'px';
		}

		if (!isNaN(this.defaultTargetRight)) 
		{
			this.content.style.right = this.defaultTargetRight + 'px';
		}

		if (!isNaN(this.defaultTargetBottom)) 
		{
			this.content.style.bottom = this.defaultTargetBottom + 'px';
		}
		
		this.removeEvent(window, 'onscroll', floatingDivObj.floatContent);
	};


};

/*
 * Computation for positioning of floating div
 */
FloatingDiv.prototype.computeShifts = function()
{
	this.shiftX = this.hasInner ? pageXOffset : this.hasElement ? document.documentElement.scrollLeft : document.body.scrollLeft;
	
	if (this.targetLeft > 0) 
	{
		this.shiftX += this.targetLeft;
	}
	else 
	{
		this.shiftX += (this.hasElement ? document.documentElement.clientWidth : this.hasInner ? window.innerWidth - 20 : document.body.clientWidth) -
		this.targetRight -
		this.content.offsetWidth;
	}
	
	this.shiftY = this.hasInner ? pageYOffset : this.hasElement ? document.documentElement.scrollTop : document.body.scrollTop;
	if (this.targetTop > 0) 
		this.shiftY += this.targetTop;
	else 
	{
		this.shiftY += (this.hasElement ? document.documentElement.clientHeight : this.hasInner ? window.innerHeight - 20 : document.body.clientHeight) -
		this.targetBottom -
		this.content.offsetHeight;
	}
};

/*
 * Computation for positioning of floating div
 */
FloatingDiv.prototype.moveContent = function()
{
	this.computeShifts();
	
	if (this.currentX != this.shiftX || this.currentY != this.shiftY) 
	{
		this.currentX = this.shiftX;
		this.currentY = this.shiftY;
		
		if (document.layers) 
		{
			this.content.left = this.currentX;
			this.content.top = this.currentY;
		}
		else 
		{
			this.content.style.left = this.currentX + 'px';
			this.content.style.top = this.currentY + 'px';
		}
	}
	
	this.content.style.right = '';
	this.content.style.bottom = '';
};

/*
 * addEvent and removeEvent, designed by Aaron Moore
 */
FloatingDiv.prototype.addEvent = function(element, listener, handler)
{
	if (typeof element[listener] != 'function' ||
	typeof element[listener + '_num'] == 'undefined') 
	{
		element[listener + '_num'] = 0;
		if (typeof element[listener] == 'function') 
		{
			element[listener + 0] = element[listener];
			element[listener + '_num']++;
		}
		element[listener] = function(e)
		{
			var r = true;
			e = (e) ? e : window.event;
			for (var i = 0; i < element[listener + '_num']; i++) 
				if (element[listener + i](e) === false) 
					r = false;
			return r;
		}
	}
	
	//if handler is not already stored, assign it
	for (var i = 0; i < element[listener + '_num']; i++) 
		if (element[listener + i] == handler) 
			return;
	element[listener + element[listener + '_num']] = handler;
	element[listener + '_num']++;
};

FloatingDiv.prototype.removeEvent = function(element, listener, handler)
{
	//if the system is not set up, or there are no handlers to remove, exit
	if (typeof element[listener] != 'function' ||
	typeof element[listener + '_num'] == 'undefined' ||
	element[listener + '_num'] == 0) 
		return;
	//loop through handlers,
	//  if target handler is reached, begin overwriting each
	//  handler with the handler in front of it until one before the last
	var found = false;
	for (var i = 0; i < element[listener + '_num']; i++) 
	{
		if (!found) 
			found = element[listener + i] == handler;
		if (found && (i + 1) < element[listener + '_num']) 
			element[listener + i] = element[listener + (i + 1)];
	}
	//if handler was found, decrement the handler count
	if (found) 
		element[listener + '_num']--;
};

/**
 * @author a434006
 */
 
/**
 * Turn on/off debug
 * value - true/false
 */
articleControl.debug = false; 

/**
 * Retrieves the articles json object and stores it
 */
articleControl.articleContent = (typeof articlePageTags == "undefined") ? null : articlePageTags;

/**
 * Default global timer
 */
articleControl.globalTimer = null;

/**
 * Default article body text
 */
articleControl.bodyText = "";

/**
 * Default article author
 */
articleControl.Author = "";

/**
 * Default article publisher
 */
articleControl.Publisher = "";

/**
 * Default article date
 */
articleControl.Date = "";

/**
 * Default send to e-mail address form value
 */
articleControl.friendEmail_valid = false;

/**
 * Default send to e-mail address form value
 */
articleControl.userEmail_valid = false;

/*
 * Z-index across multiple popins
 */
articleControl.lastUsedZIndex = 99999;


/**
 * Displays a popin onto the page
 * @param e - the event which called this function
 * @param id - the id of the container to be closed
 */
 articleControl.displayPopIn = function(e,id) {
 	articleControl.displayPopin(e,id);
 }
articleControl.displayPopin = function(e,id) {
	// set global parameters
	var elmID = null;
	var currLink = null;

	var callCloseMouseOver = null;
	var callClearTimeout = null;
	
	var left = null;
	var top = null;

	try {
		// set the target element of this event
	
			
		// set the popin elements id
		elmID = id;
		
		// get the left and top position of the event element
		if( e != null){
			currLink = Destination.getTarget(e);
			left = Destination.getOffsetLeft(currLink);
			top	= Destination.getOffsetTop(currLink);
		}	

		
		
		
		if(typeof elmID == "undefined" || elmID == null) {
			return false;
		}
		else {	
		if(elmID == "pgcontrolshareform") {
				// retrieve the current shareform popin to be displayed
				var pgControlsharePopin = document.getElementById(elmID);
				
				pgControlsharePopin.style.top = top - 6 + "px";
				pgControlsharePopin.style.left = left - 409 + "px";
				pgControlsharePopin.style.zIndex = 1000;
				
				pgControlsharePopin.className = "pgcontrolshareform";
				document.getElementById('article_title_share').innerHTML = (typeof pgCorePageTitle == "undefined" || pgCorePageTitle == "") ? "" : pgCorePageTitle;
				document.getElementById('blankdivshare').style.top = top - 16 + "px";
				document.getElementById('blankdivshare').style.left = left - 419 + "px";
				document.getElementById('blankdivshare').style.height = pgControlsharePopin.offsetHeight + 20 + "px";
				document.getElementById('blankdivshare').style.display = "block";
				if(document.getElementById('pgcontrolshareformfirstanchor')){
					var anchorInactiveScreen = document.getElementById('pgcontrolshareformfirstanchor');
					anchorInactiveScreen.focus();
				}  
								
			}
			else if(elmID == "emailform") {

				var emailPopin = document.getElementById(elmID);

				if (document.createEventObject){

					articleControl.savedEmailEvent = document.createEventObject(e);
				} else {

					articleControl.savedEmailEvent = e;

				}
				
				var floatingDivRef = "floatingDiv" + elmID;

				if (window[floatingDivRef])
				{
					// Reset the underlying content to default state

					window[floatingDivRef].reset();
				}
				else
				{

					window[floatingDivRef] = new FloatingDiv(elmID);	
				}
				
				emailPopin.style.top = top - 6 + "px";
				emailPopin.style.left = left -354 + "px";
				emailPopin.className = "emailPopin";
				emailPopin.style.position = "absolute";
				
				document.getElementById('article_title_email').innerHTML = (typeof pgCorePageTitle == "undefined" || pgCorePageTitle == "") ? "Fidelity Investments" : pgCorePageTitle;								
				document.getElementById('blankdiv').style.display = "block";
				document.getElementById('blankdiv').style.top = top - 16 + "px";
				document.getElementById('blankdiv').style.left = left - 364 + "px";
				document.getElementById('blankdiv').style.height = emailPopin.offsetHeight + 20 + "px";
				emailPopin.style.zIndex = articleControl.lastUsedZIndex++;
					
				window[floatingDivRef].init();
				
				
			}
			else if (elmID == "emailConfirm") {
				// retrieve the current popin to be displayed
				var emailConfirm = document.getElementById(elmID);
				
				// Sets the opacity of the e-mail confirm div
				var floatingDivRef = "floatingDiv" + elmID;
						
				if (window[floatingDivRef])
				{
					window[floatingDivRef].reset();				
				}
				else
				{
					window[floatingDivRef] = new FloatingDiv(elmID);	
				}
				emailConfirm.style.top = top - 6 + "px";
				emailConfirm.style.left = left -354 + "px";
				emailConfirm.className = "emailConfirmPopin";
				emailConfirm.style.position = "absolute";
				document.getElementById('article_title_email').innerHTML = (typeof pgCorePageTitle == "undefined" || pgCorePageTitle == "") ? "Fidelity Investments" : pgCorePageTitle;
				
				document.getElementById('blankdiv').style.display = "block";
				document.getElementById('blankdiv').style.top = top - 16 + "px";
				document.getElementById('blankdiv').style.left = left - 364 + "px";
				document.getElementById('blankdiv').style.height = emailConfirm.offsetHeight + 20 + "px";
				emailConfirm.style.zIndex = articleControl.lastUsedZIndex++;
				articleControl.setDivOpacity(100, elmID);
				window[floatingDivRef].init();
				
				
            	if(document.attachEvent) {
            	    emailConfirm.attachEvent ('onmouseover', callClearTimeout);
            	} else {
            		emailConfirm.addEventListener ('mouseover', callClearTimeout, false);
            	}
				
			}			
			else if(elmID == "shareform") {
				// retrieve the current shareform popin to be displayed
				var sharePopin = document.getElementById(elmID);
				
				sharePopin.style.top = top + 15 + "px";
				sharePopin.style.left = left + 1 + "px";
				sharePopin.style.zIndex = 1000;
				sharePopin.className = "shareform";
				
				
				if(document.getElementById('shareformfirstanchor')){
					var anchorInactiveScreen = document.getElementById('shareformfirstanchor');
					anchorInactiveScreen.focus();
				}
           	   
			}			
			 else {
				var popin = document.getElementById(elmID);
				if(typeof popin == null || popin == "undefined") {
					return false;
				}
				
				var floatingDivRef = "floatingDiv" + elmID; 
				if (window[floatingDivRef]) 
				{
					// Reset the underlying content to default state
					window[floatingDivRef].reset();
				}
				else
				{
					window[floatingDivRef] = new FloatingDiv(elmID);	
				}
				
				popin.className = "emailPopin";
				popin.style.zIndex = articleControl.lastUsedZIndex++;
				window[floatingDivRef].init();
			}
		}

	}
	catch(e) {	
		articleControl.shoutError(e, "displayPopIn()");
	}
}

/**
 * Hides the popin currently on the page
 * @param id - the id of the container to be closed
 */	
articleControl.hidePopIn = function(id) {
	var elmID = null;
	
	try {
		elmID = id;		
		if(typeof elmID == null || elmID == "undefined") {
			return false;
		}
		else {			
			if(elmID == "emailform") {
				var emailPopin = document.getElementById(elmID);
				emailPopin.className = "hidden";
				document.getElementById('blankdiv').style.display = "none";
				articleControl.clearEmail("emailform");
				
				var floatingDivRef = "floatingDiv" + elmID;
				if (window[floatingDivRef])
				{
					window[floatingDivRef].reset();
				}
			}
			else if(elmID == "emailConfirm" ) {				
				articleControl.fadeOutDiv(elmID);
				var floatingDivRef = "floatingDiv" + elmID;
				if (window[floatingDivRef])
				{
					window[floatingDivRef].reset();
				}
			}			
			else {
				var popin = document.getElementById(elmID);
				popin.className = "hidden";
				articleControl.clearEmail(elmID);
				var floatingDivRef = "floatingDiv" + elmID;
				if (window[floatingDivRef])
				{
					window[floatingDivRef].reset();
				}
			} 
		}
	}
	catch(e) {
		articleControl.shoutError(e, "hidePopIn()");
	}
}
		

/**
* TBD Make sure once all updated to hidePopInForm remove hidePopIn function. 
* It is safer not to remove hidePopIn because if some one is using the same it will be huge impact
 * This was added to change the class name from hidden to hidden-form, 
 * Hides the popinform currently on the page
 * @param id - the id of the container to be closed
 */	
articleControl.hidePopInForm = function(id) {
	var elmID = null;
	
	try {
		elmID = id;			
		if(typeof elmID == null || elmID == "undefined") {
			return false;
		}
		else {
			
			if(elmID == "pgcontrolshareform") {
				var pgcontrolsharePopin = document.getElementById(elmID);
				pgcontrolsharePopin.className = "hidden-form";
				document.getElementById('blankdivshare').style.display = "none";
				if(document.getElementById('pgcontrolshareformsourcelink')){
					var anchorInactiveScreen = document.getElementById('pgcontrolshareformsourcelink');
					anchorInactiveScreen.focus();
				}
			}
			else if(elmID == "emailConfirm" ) {
				articleControl.fadeOutDiv(elmID);
				var floatingDivRef = "floatingDiv" + elmID;
				document.getElementById('blankdiv').style.display = "none";
				if (window[floatingDivRef])
				{
					window[floatingDivRef].reset();
				}
			}
			else if(elmID == "emailform") {
				
				var emailPopin = document.getElementById(elmID);
				emailPopin.className = "hidden-form";
				document.getElementById('blankdiv').style.display = "none";
				articleControl.clearEmail("emailform");
				
				var floatingDivRef = "floatingDiv" + elmID;
				if (window[floatingDivRef])
				{
					window[floatingDivRef].reset();
				}
			}
			else if(elmID == "shareform") {
				var sharePopin = document.getElementById(elmID);
				sharePopin.className = "hidden-form";
				if(document.getElementById('shareformsourcelink')){
					var anchorInactiveScreen = document.getElementById('shareformsourcelink');
					anchorInactiveScreen.focus();
				}
			}
			else {
				var popin = document.getElementById(elmID);
				popin.className = "hidden-form";
				articleControl.clearEmail(elmID);
				var floatingDivRef = "floatingDiv" + elmID;
				if (window[floatingDivRef])
				{
					window[floatingDivRef].reset();
				}
			}
			
			
		}
	}
	catch(e) {
		articleControl.shoutError(e, "hidePopIn()");
	}
}

/**
 * Sets a timer to close the popups
 * @param id - the id of the container to be closed
 */
articleControl.closeMouseOver = function(id, time) 
{

	if (articleControl.globalTimer)
	{
		if (articleControl.globalTimer[id]) 
		{
			clearTimeout(articleControl.globalTimer[id]);
		}
	}
	else 
	{
		articleControl.globalTimer = new Object();
		articleControl.globalTimer[id] = 0;
	}
	
	articleControl.globalTimer[id] = setTimeout("articleControl.hidePopIn('" + id + "')", time);
}

/**
 * Calls the pagecontrol service
 * @param service_uri - the url of the web service
 * @param params - the parameters to pass to the web service
 */
articleControl.callWebService = function(service_uri, params, formDivId, confirmDivId) {
		
	if(typeof service_uri == null || service_uri == "undefined" 
	   || typeof params == null || params == "undefined")
	{
		return false;
	}
	else {
		var http_request = false;
	
		if(window.XMLHttpRequest) {
			http_request = new XMLHttpRequest();
		}
		else if(window.ActiveXObject) {
	       	try {
	        	http_request = new ActiveXObject("Msxml2.XMLHTTP");
	      	} 
	      	catch(e) {
	      		try {
	        		http_request = new ActiveXObject("Microsoft.XMLHTTP");
	        	} 
	        	catch(e) {
	      			http_request = false;
	      		}
			}
		}
	
		if(http_request) {		
			http_request.open("POST", service_uri, true);
			http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http_request.setRequestHeader("Content-length", params.length);
			http_request.send(params);						
			articleControl.hidePopIn(formDivId);
			articleControl.displayPopIn(articleControl.savedEmailEvent,confirmDivId);
			articleControl.clearEmail(formDivId);
			setTimeout("articleControl.hidePopInForm('" + confirmDivId + "')", 5000);		
		} else {
			return false;
		}
	}
}

/**
 * Sets the max length of a message box and stops 
 * the user from adding more text than what is defined
 */
articleControl.maxlength = function(form, countId)
{
	var limitSpan = null;
	var maxLenth = 1000;
	
	try {
		// get the count display element from the document
		if(document.getElementById(countId)) {
			limitSpan = document.getElementById(countId);
		}
		
		if(typeof form == 'undefined' || form == null) {
			return false;
		}
		else {
			if(form.getAttribute('maxlength')) {
				maxLenth = form.getAttribute('maxlength');
			}
			
			if (form.value.length > maxLenth)
			{
				form.value = form.value.substring(0, maxLenth);
			}
			else
			{	
				if(typeof limitSpan != 'undefined' && limitSpan != null)
				{
					limitSpan.innerHTML = maxLenth - form.value.length;
				}
			}
		}
	}	
	catch(e) {
		articleControl.shoutError(e, "maxlength()");
	}
}

/**
 * fades a div out
 * @param divId - id of the container to be faded
 */	
articleControl.fadeOutDiv = function(divId) { 

    var speed = Math.round(10);
    var timer = 0;

    for(i=100; i >= 0; i--) {
        setTimeout("articleControl.setDivOpacity(" + i + ",'" + divId + "')",(timer * speed));
        timer++;
    }
}

/**
 * change the opacity for different browsers
 * @param opacity - the current opacity of the container being faded
 * @param divId - id of the container to be faded
 */
articleControl.setDivOpacity = function(opacity, divId) {

    var object = document.getElementById(divId).style;
    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = "alpha(opacity=" + opacity + ")";
    
	switch (opacity) {
		case 0: 
			object.zIndex = "-100";
			break;
	}    
}

/**
 * when enabled, shout error throws an alert with information as to the error that occured
 * @param err - the error that was thrown
 * @param component - the component that throw the error
 */
articleControl.shoutError = function(err, component) {
	if(articleControl.debug) {
		alert(err + ": in " + component);
	}
}

function writeToInnerDiv(formDivClass,msgClass, errorMsg, msgVis)
{
	var divClass = getElementsByClass(formDivClass);
	var errorNode;
	if(divClass)
	{
		var allInnerDivs = divClass[0].getElementsByTagName("div");

		if(allInnerDivs)
		{
			
			for (i = 0, j = 0; i < allInnerDivs.length; i++) {
				if(allInnerDivs[i].id == msgClass)
				{
				errorNode = allInnerDivs[i];
				}
			}
		}
		
		if(errorNode)
		{
			errorNode.innerHTML = errorMsg;
			errorNode.className = msgVis;
		}
	}
}

function getIdWithinDiv(formDivId,id, tag)
{
	var elem;
	if(tag == null)
	{
		tag = '*';
	}
	var divid = document.getElementById(formDivId);
	if(divid)
	{
		var els = divid.getElementsByTagName(tag);
		if(els)
		{
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)"+id+"(\\s|$)");
			for (i = 0; i < elsLen; i++)
			{
				if ( pattern.test(els[i].id) )
				{
					elem = els[i];
				}
			}
		}
	}
	return elem;
}

function writeToInnerDivById(formDivId,msgId, errorMsg, msgVis,tag)
{
	try {
		var elem;
		var errorNode = null;
		
		if(tag == null)
		{
			tag = '*';
		}
		var divid = document.getElementById(formDivId);
		if(divid)
		{
			var els = divid.getElementsByTagName(tag);
			if(els)
			{
				for (i = 0; i < els.length; i++) {
					if(els[i].id == msgId)
					{
						errorNode = els[i];
					}
				}
			}
		}
		
		if(errorNode)
		{
			errorNode.innerHTML = errorMsg;
		}
		if(msgVis !=null)
		{
			errorNode.className = msgVis;
		}
	}
	catch(e)
	{
		articleControl.shoutError(e, "writeToInnerDivById()");
	}
}

/**
 * Changes the font-size of an article
 * @param string link - the current font adjuster object
 * @param string id - the container that should be affected
 * @param string size - the size of the new adjusted font
 */
articleControl.adjustFont = function() {

	var elmID = null;
	var newSize = null;
	var currentLink = null;
	var container = null;
	try {

		currentLink = arguments[0];		
		newSize  = arguments[1];

		if(	typeof newSize == null || newSize == "undefined" ||
			typeof currentLink == null || currentLink == "undefined" ||
			typeof elmID == null || elmID == "undefined" || elmID == ""){
			return false;
		}else {

			for(i=2;i<arguments.length;i++){
				container =	document.getElementById(arguments[i]);
				if(container != null && container != "undefined") {					
					container.style.fontSize = newSize + "px";
				}
			}
			articleControl.changeAnchorText(currentLink);

		}

	}catch(e) {
		articleControl.shoutError(e, "adjustFont()");
	}
}

/**
 * Changes the Anchor text size
 * @param string currentLink - the current font adjuster object
 */
articleControl.changeAnchorText = function(currentLink) {
	var linkArr = new Array();
	try {
	alert("hi");
		linkArr[0] = document.getElementById("text1");
		linkArr[1] = document.getElementById("text2");
		linkArr[2] = document.getElementById("text3");
	
		for(i = 0; i < linkArr.length ; i++) {
			if(typeof linkArr[i] == null || linkArr[i] == "undefined") {
				return false; 
			}		
			else {
				if(linkArr[i].id == currentLink) {
					linkArr[i].className = currentLink + " active";
				}
				else {
					linkArr[i].className = linkArr[i].id;
				}

			}
		}
	}
	catch(e) {
		articleControl.shoutError(e, "changeAnchorText()");
	}	
}

/**
 * Opens the print version of current article
 */
articleControl.print = function() {
	//if there are no other parameters you must also add a ?
	
	var urlInfo = window.location.href.split("?");
	if(urlInfo.length == 1)
	{
		var url = window.location.href.split("#")[0] + "?print=true";
	}
	else
	{	
		//make sure there is no hash in the url, i.e. when the user clicked on an index(disclaimer) first
		//as the print parameter cannot just blindly be added after that
		var url = window.location.href.split("#")[0] + "&print=true";
	}
	var printWindow = window.open(url, 'printWindow', 'menubar=0,location=0,resizable=0,scrollbars=1,status=0,width=696,height=500');
	
	if (window.focus) {
		printWindow.focus();
	}
}

/*************SHARE*************/

	/**
	*Function used to build the feature 3rd party url. Also calls invokeFeatureUrl 
	*function take user to 3rd part site
	*/
	articleControl.shareArticle = function(feature) {
		
		 var facebook_url 		= "http://www.facebook.com/share.php?u=";
		 var twitter_url 		= "http://twitter.com/?status=";
		 var linkedIn_url 		= "http://www.linkedin.com/shareArticle?mini=true&url=";

		 var fcbook_ccsource 	= "facebook_share";
		 var twitter_ccsource 	= "twitter_share";
		 var linked_ccsource 	= "linkedin_share";
		 
		 var currentPagePath = document.location.href;
		 
		 var seperator = " ";
		 
		try
		{
			var feature_token = (typeof feature == "undefined") ? "" : feature;
			
			var page_title = (typeof pgCorePageTitle == "undefined" || pgCorePageTitle == "") ? "" : pgCorePageTitle;
			var page_desc = (typeof pgCorePageDescription == "undefined" || pgCorePageDescription == "") ? "" : pgCorePageDescription;

			var pg_title = "";
			var pg_desc = "";			
			
			// If page title or page description is not found donot pass these parameters to 3rd party
			if(page_title != "")
			{
				pg_title = "&title="+encodeURIComponent(page_title);
			}			
			if(page_desc != "")
			{
				pg_desc = "&summary="+encodeURIComponent(page_desc);
			}
					
			if(feature_token == "") {
				
				return false;
				
			}else {							
				if(feature.toLowerCase() == "facebook") {			
					var bud_parm  = articleControl.budParams();					
					var fid_url   = getFidUrl(fcbook_ccsource);					
					var long_url  = bud_parm+"&long_url="+fid_url;
					var metaParam = "";					
					articleControl.invokeFeatureUrl(facebook_url,long_url,fid_url,metaParam);					
				}else if(feature.toLowerCase() == "twitter"){

					var bud_parm   = articleControl.budParams();					
					var fid_url    = getFidUrl(twitter_ccsource);						
					var long_url   = bud_parm+"&long_url="+fid_url;
					var metaParam  = encodeURIComponent(page_title+seperator);
					articleControl.invokeFeatureUrl(twitter_url,long_url,fid_url,metaParam);

				}else if(feature.toLowerCase() == "linkedin"){

					var bud_parm   = articleControl.budParams();					
					var fid_url    = getFidUrl(linked_ccsource);
					var long_url   = bud_parm+"&long_url="+fid_url;
					var metaParam  = pg_title+pg_desc;					
					articleControl.invokeFeatureUrl(linkedIn_url,long_url,fid_url,metaParam);
					
				}				
			}
			}catch(e) {
				articleControl.shoutError(e, " shareArticle()");
			}
			
			/**
			*  utility function will make sure to remove additional ccsource parameter getting appended to the pageurl.
			*  */
			function getFidUrl(ccsource)
			{
			
				var fid_url="";				
				var urlpath = currentPagePath.split("ccsource=");								
				if(urlpath.length>1) {
				
					fid_url = currentPagePath.replace(/ccsource=[^&]*/i,'ccsource='+ccsource);
					
				}else{	
				
					var cc_source  = "ccsource="+ ccsource;
					var pgpath = currentPagePath.split("?");
						
					if(pgpath.length>1) {					        
					
						fid_url    = currentPagePath + "&" + cc_source;
						
					}else{					
						
						fid_url    = currentPagePath + "?" + cc_source;	
						
					}					
						
				}
							
				return encodeURIComponent(fid_url);
			}
			
			
	 };
	 
	/**
	* Function used to get compressed url from go.fidelity.com service and invove the 3rd party site
	*/	
	articleControl.invokeFeatureUrl = function(feature_url,long_url,fid_url,metaParm){
	
		// Temp reference
		var linkedIn_url 		= "http://www.linkedin.com/shareArticle?mini=true&url=";
		
		var xmlHttp = articleControl.getAJAX();		
		//Make it Synchronous to make sure there is no surprise when facebook/twetter/.... links clicked randomly.
		var fid_bud_host    = "/pf/buddy";		
		xmlHttp.open("GET",fid_bud_host+long_url,true);		
		
		xmlHttp.onreadystatechange = function() {
		
			if(xmlHttp.readyState == 4){			
				if(xmlHttp.status==200 && (xmlHttp.responseText != null && xmlHttp.responseText.length > 0)) {
			    		processRequest(xmlHttp.responseText);
			    	}
			    	//use the actual page url (bud request has failed)
			    	else{											
			    		processRequest(fid_url);

			    	}
			}
		}
	
		xmlHttp.send();
		
		function processRequest(pageurl)
		{	
			var encode_url = "";
			if(feature_url != linkedIn_url)
			{
				encode_url  = metaParm + pageurl; 
			}else
			{
				encode_url  = pageurl + metaParm;
			}
			
			var share_window = window.open(feature_url + encode_url, 'share_window');
			
			if (window.focus) {
				share_window.focus();
			}
		}
	};	
	 
	/**
	*Utility function used to generate  long url for the current page
	*/
	articleControl.budParams = function() 
	{			
			var  token ="/api/v2/links/shrink?api_key=l63kz9al79s37pu6du2a&"+
						"dupe_check=1&"+
						"format=txt";
			
			return token;

	};

	
	/**
	*Function to return XmlHttpRequest Object
	*/
	articleControl.getAJAX = function()
	{
		var xmlHttp;
		try
		{
			// Firefox, Opera 8.0+, Safari
			xmlHttp=new XMLHttpRequest();
		}
		catch (e)
		{
			// Internet Explorer
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				try
				{
					xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e)
				{
					articleControl.shoutError(e, "Not able to create XMLHttpRequest Object.");
					return false;
				}
			}
		}
		
		return xmlHttp;

	};

/**  Page Control JS  **/


