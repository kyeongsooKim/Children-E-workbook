/// <reference path="DanFunctions.js" />
function MakeMenu(MenuArray) {
    //get the nav bar
    var NavBar = document.getElementById('NavigationBar');
    var NavSelect = document.getElementById('NavigationSelectDropDown');
    var NavDiv = document.getElementById('NavigationArea');

    //evaluate the json object
    MenuArray = eval(MenuArray);

    //if no menu items then hide the nav bar
    if (!MenuArray.length || MenuArray.length == 0) {
        NavBar.style.visibility = "hidden";
        NavSelect.style.visibility = "hidden";
        NavDiv.style.visibility = "hidden";
        return;
    } else {
        NavBar.style.visibility = "visible";
        NavSelect.style.visibility = "visible";
        NavDiv.style.visibility = "visible";
    }

    //regular menu
    //create the List for the Menu Names
    var Menu = document.createElement('ul');

    //add the menu items to the nav bar
    for (var A = 0; A < MenuArray.length; A++) {
        //create the List Items for the Top name
        var TopMenuList = document.createElement('li');
        TopMenuList.innerHTML = MenuArray[A].Name;
        TopMenuList.setAttribute('style', MenuArray[A].CSS);
        TopMenuList.setAttribute('id', 'Menu' + A);
        if (MenuArray[A].Items.length == 0) {
            TopMenuList.setAttribute('onclick', "TabItemClicked('" + MenuArray[A].IdNumber + "','-1','" + MenuArray[A].Name + "');");
            TopMenuList.setAttribute('data-clickable', "true");
        } else {
            if (CheckTouchScreenDevice()) {
                TopMenuList.setAttribute('onclick', "event.preventDefault();TabClicked(event.target);event.stopPropagation();");
            } else {
                //$("#Menu"+A).hover(function () {
                //    alert('enter');
                //    //$(".NavDropDownActive").removeClass('NavDropDownActive');
                //    //$(this).addClass("NavDropDownActive");

                //}).mouseleave( function () {
                //    $(".NavDropDownActive").removeClass('NavDropDownActive');
                //});
                TopMenuList.setAttribute('onmouseover', "TabClicked(this);event.stopPropagation();");
                TopMenuList.setAttribute('onclick', "TabClicked(this);event.stopPropagation();");
            }
        }

        Menu.appendChild(TopMenuList);

        //create the List for the Menu Item Names
        var MenuDropDown = document.createElement('ul');
        TopMenuList.appendChild(MenuDropDown);

        //create the list items for the drop down
        for (B = 0; B < MenuArray[A].Items.length; B++) {
            var MenuDropDownItems = document.createElement('li');
            MenuDropDownItems.setAttribute('style', MenuArray[A].Items[B].CSS);
            MenuDropDownItems.setAttribute('onclick', "TabItemClicked('" + MenuArray[A].IdNumber + "','" + MenuArray[A].Items[B].IdNumber + "','" + MenuArray[A].Name + "-" + MenuArray[A].Items[B].Name + "');");
            MenuDropDownItems.innerHTML = MenuArray[A].Items[B].Name;
            MenuDropDown.appendChild(MenuDropDownItems);
        }
    }
    NavSelect.appendChild(Menu.cloneNode(true));
    NavBar.appendChild(Menu.cloneNode(true));

    //select the first menu item
    document.getElementById('NavigationSelect').innerHTML = MenuArray[0].Name;

}

function TabClicked(Tab) {
    if (document.getElementById('NavigationSelectDropDown').style.display == "block") return;
    //alert(Tab.innerHTML);
    var Nav = document.getElementById('NavigationBar');
    $(".NavDropDownActive").removeClass('NavDropDownActive');
    //$("nav").find("ul").find("li:visited").find("ul").addClass("NavDropDownActive");
    $(Tab).find("ul").addClass("NavDropDownActive");
    return false;
}
var lastPage = 22;

function TabItemClicked(Tab, TabNumber, Name) {

    if (Tab == 21) {
        localStorage.clear();
    }


    if (lastPage == 22 || lastPage == 23 || lastPage == 31 || lastPage == 25 || lastPage == 26 || lastPage == 27 || lastPage == 28 || lastPage == 29 || lastPage == 30 || lastPage == 32) {

        $("#WorkSpace").on("contextmenu", function(e) {
            return false;
        });
        console.log("calling save pageinput");
        savePageInput(lastPage);
    }
    lastPage = Tab;
    if (Tab == "") return;
    if (TabNumber == undefined) TabNumber = -1;
    //show shield
    ShowShield(true);

    //show the approperiate page or products
    document.getElementById('TabNumberButton').value = Tab;
    document.getElementById('TabItemNumberButton').value = TabNumber;
    document.getElementById('ShowProducts').click();
    document.getElementById('NavigationSelect').innerHTML = Name;
    document.getElementById('NavigationSelectDropDown').style.display = "none";
    $(".NavDropDownActive").removeClass('NavDropDownActive');

}

function ToggleDropdownMenu() {
    var Menu = document.getElementById('NavigationSelectDropDown');

    if (getComputedStyle(Menu, null).getPropertyValue('display') == "none") {
        Menu.style.display = "block";
    } else {
        Menu.style.display = "none";
    }

    //document.getElementById('NavigationSelect').setAttribute('size', document.getElementById('NavigationSelect').length);
    //document.getElementById('MenuIcon').style.visibility = 'hidden';
    //event.stopPropagation();
    //document.getElementById('NavigationSelect').focus();
}

function getData(Tab) {

    if (Tab == 22) {
        setTimeout(
            function() {
                var val1 = localStorage.getItem('page22val1');
                console.log("page22val1 is ", val1);
                if (val1 != null) {
                    document.getElementById('purposeField1').value = val1;
                    document.getElementById('purposeField2').value = localStorage.getItem('page22val2');
                    document.getElementById('purposeField3').value = localStorage.getItem('page22val3');
                    document.getElementById('purposeField4').value = localStorage.getItem('page22val4');
                }
            }, 100);

    } else if (Tab == 23) {} else if (Tab == 25) {
        var val1 = localStorage.getItem('page25val1');
        console.log("val1 on page 4 is ", val1);
        if (val1 != null) {
            document.getElementById('happy-healthy').value = localStorage.getItem('page25val1');
            document.getElementById('happy-unhealth').value = localStorage.getItem('page25val2');
            document.getElementById('sad-health').value = localStorage.getItem('page25val3');
            document.getElementById('sad-unhealth').value = localStorage.getItem('page25val4');
            document.getElementById('mad-healthy').value = localStorage.getItem('page25val5');
            document.getElementById('mad-unhealthy').value = localStorage.getItem('page25val6');
            document.getElementById('scare-health').value = localStorage.getItem('page25val7');
            document.getElementById('scares-unhealthy').value = localStorage.getItem('page25val8');
            document.getElementById('embarrased-health').value = localStorage.getItem('page25val9');
            document.getElementById('embarrased-unhealthy').value = localStorage.getItem('page25val10');
            document.getElementById('anxious-health').value = localStorage.getItem('page25val11');
            document.getElementById('anxious-unhealthy').value = localStorage.getItem('page25val12');
            document.getElementById('excited-health').value = localStorage.getItem('page25val13');
            document.getElementById('excited-unhealthy').value = localStorage.getItem('page25val14');
            document.getElementById('worried-health').value = localStorage.getItem('page25val15');
            document.getElementById('worried-unhealthy').value = localStorage.getItem('page25val16');
            document.getElementById('shy-health').value = localStorage.getItem('page25val17');
            document.getElementById('shy-unhealthy').value = localStorage.getItem('page25val18');
            document.getElementById('disappointed-health').value = localStorage.getItem('page25val19');
            document.getElementById('disappointed-unhealthy').value = localStorage.getItem('page25val20');
            document.getElementById('lonely-health').value = localStorage.getItem('page25val21');
            document.getElementById('lonely-unhealthy').value = localStorage.getItem('page25val22');
            document.getElementById('hurt-health').value = localStorage.getItem('page25val23');
            document.getElementById('hurt-unhealthy').value = localStorage.getItem('page25val24');
        }
    } else if (Tab == 26) {
		var step1_ele, step2_ele, step3_ele, step4_ele, step5_ele;

		var step1 = localStorage.getItem('step1');
		var step2 = localStorage.getItem('step2');
		var step3 = localStorage.getItem('step3');
		var step4 = localStorage.getItem('step4');
		var step5 = localStorage.getItem('step5');
		try{
			step1_ele = document.getElementById(step1);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			step2_ele = document.getElementById(step2);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			step3_ele = document.getElementById(step3);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			step4_ele = document.getElementById(step4);
		}catch(exp){
			console.log(exp);
		}
		
		try{
			step5_ele = document.getElementById(step5);
		}catch(exp){
			console.log(exp);
		}
		
		if(step1_ele != null || step1_ele != undefined){
			step1_ele.parentNode.removeChild(step1_ele);
			document.getElementById('step1').appendChild(step1_ele);
		}else{}
		
		if(step2_ele != null || step2_ele != undefined){
			step2_ele.parentNode.removeChild(step2_ele);
			document.getElementById('step2').appendChild(step2_ele);
		}else{}
		
		if(step3_ele != null || step3_ele != undefined){
			step3_ele.parentNode.removeChild(step3_ele);
			document.getElementById('step3').appendChild(step3_ele);
		}else{}
		
		if(step4_ele != null || step4_ele != undefined){
			step4_ele.parentNode.removeChild(step4_ele);
			document.getElementById('step4').appendChild(step4_ele);
		}else{}
		
		if(step5_ele != null || step5_ele != undefined){
			step5_ele.parentNode.removeChild(step5_ele);
			document.getElementById('step5').appendChild(step5_ele);
		}else{}
	} else if (Tab == 27) {
        var walkaway = localStorage.getItem('walkaway_p');
        var ignorethebully = localStorage.getItem('ignorethebully_p');
        var askanadultforhelp = localStorage.getItem('askanadultforhelp_p');
        var beresfectful = localStorage.getItem('beresfectful_p');
        var talktoafriend = localStorage.getItem('talktoafriend_p');
        var beproudandconfident = localStorage.getItem('beproudandconfident_p');
        var userhumor = localStorage.getItem('userhumor_p');

        var wrong1 = localStorage.getItem('hitthebully_p');
        var wrong2 = localStorage.getItem('bebullyback_p');
        var wrong3 = localStorage.getItem('screamandyell_p');
        var wrong4 = localStorage.getItem('Getinthebullysface_p');
        var wrong5 = localStorage.getItem('teasethebully_p');
        var wrong6 = localStorage.getItem('pushthebully_p');
        var wrong7 = localStorage.getItem('makefunofbully_p');
        var wrong8 = localStorage.getItem('askthebullyincalmvoice_p');
        var wrong9 = localStorage.getItem('whineandpout_p');
        var wrong10 = localStorage.getItem('threatenthebully_p');

        var right = {};
        right.status = "right";
        right.src = "Explorer/UploadedFiles/WebSiteImages/image-right-1.gif";
        var wrong = {};
        wrong.status = "wrong";
        wrong.src = "Explorer/UploadedFiles/WebSiteImages/image-wrong-1.gif";

        if (walkaway == "right") {
            right.id = "walkaway_p";
            right.parentID = "walkaway_p";
            makeImage(right);
        } else if (walkaway == "wrong") {
            wrong.id = "walkaway_p";
            wrong.parentID = "walkaway_p";
            makeImage(wrong);
        } else {}
        if (ignorethebully == "right") {
            right.id = "ignorethebully_p";
            right.parentID = "ignorethebully_p";
            makeImage(right);
        } else if (ignorethebully == "wrong") {
            wrong.id = "ignorethebully_p";
            wrong.parentID = "ignorethebully_p";
            makeImage(wrong);
        } else {}
        if (askanadultforhelp == "right") {
            right.id = "askanadultforhelp_p";
            right.parentID = "askanadultforhelp_p";
            makeImage(right);
        } else if (askanadultforhelp == "wrong") {
            wrong.id = "askanadultforhelp_p";
            wrong.parentID = "askanadultforhelp_p";
            makeImage(wrong);
        } else {}
        if (beresfectful == "right") {
            right.id = "beresfectful_p";
            right.parentID = "beresfectful_p";
            makeImage(right);
        } else if (beresfectful == "wrong") {
            wrong.id = "beresfectful_p";
            wrong.parentID = "beresfectful_p";
            makeImage(wrong);
        } else {}
        if (talktoafriend == "right") {
            right.id = "talktoafriend_p";
            right.parentID = "talktoafriend_p";
            makeImage(right);
        } else if (talktoafriend == "wromg") {
            wrong.id = "talktoafriend_p";
            wrong.parentID = "talktoafriend_p";
            makeImage(wrong);
        } else {}
        if (beproudandconfident == "right") {
            right.id = "beproudandconfident_p";
            right.parentID = "beproudandconfident_p";
            makeImage(right);
        } else if (beproudandconfident == "wrong") {
            wrong.id = "beproudandconfident_p";
            wrong.parentID = "beproudandconfident_p";
            makeImage(wrong);
        } else {}
        if (userhumor == "right") {
            right.id = "userhumor_p";
            right.parentID = "userhumor_p";
            makeImage(right);
        } else if (userhumor == "wrong") {
            wrong.id = "userhumor_p";
            wrong.parentID = "userhumor_p";
            makeImage(wrong);
        } else {}
        if (wrong1 == "right") {
            right.id = "hitthebully_p";
            right.parentID = "hitthebully_p";
            makeImage(right);
        } else if (wrong1 == "wrong") {
            wrong.id = "hitthebully_p";
            wrong.parentID = "hitthebully_p";
            makeImage(wrong);
        } else {}
        if (wrong2 == "right") {
            right.id = "bebullyback_p";
            right.parentID = "bebullyback_p";
            makeImage(right);
        } else if (wrong2 == "wrong") {
            wrong.id = "bebullyback_p";
            wrong.parentID = "bebullyback_p";
            makeImage(wrong);
        } else {}
        if (wrong3 == "right") {
            right.id = "screamandyell_p";
            right.parentID = "screamandyell_p";
            makeImage(right);
        } else if (wrong3 == "wrong") {
            wrong.id = "screamandyell_p";
            wrong.parentID = "screamandyell_p";
            makeImage(wrong);
        } else {}
        if (wrong4 == "right") {
            right.id = "Getinthebullysface_p";
            right.parentID = "Getinthebullysface_p";
            makeImage(right);
        } else if (wrong4 == "wrong") {
            wrong.id = "Getinthebullysface_p";
            wrong.parentID = "Getinthebullysface_p";
            makeImage(wrong);
        } else {}
        if (wrong5 == "right") {
            right.id = "teasethebully_p";
            right.parentID = "teasethebully_p";
            makeImage(right);
        } else if (wrong5 == "wrong") {
            wrong.id = "teasethebully_p";
            wrong.parentID = "teasethebully_p";
            makeImage(wrong);
        } else {}
        if (wrong6 == "right") {
            right.id = "pushthebully_p";
            right.parentID = "pushthebully_p";
            makeImage(right);
        } else if (wrong6 == "wrong") {
            wrong.id = "pushthebully_p";
            wrong.parentID = "pushthebully_p";
            makeImage(wrong);
        }
        if (wrong7 == "right") {
            right.id = "makefunofbully_p";
            right.parentID = "makefunofbully_p";
            makeImage(right);
        } else if (wrong7 == "wrong") {
            wrong.id = "makefunofbully_p";
            wrong.parentID = "makefunofbully_p";
            makeImage(wrong);
        } else {}
        if (wrong8 == "right") {
            right.id = "askthebullyincalmvoice_p";
            right.parentID = "askthebullyincalmvoice_p";
            makeImage(right);
        } else if (wrong8 == "wrong") {
            wrong.id = "askthebullyincalmvoice_p";
            wrong.parentID = "askthebullyincalmvoice_p";
            makeImage(wrong);
        } else {}
        if (wrong9 == "right") {
            right.id = "whineandpout_p";
            right.parentID = "whineandpout_p";
            makeImage(right);
        } else if (wrong9 == "wrong") {
            wrong.id = "whineandpout_p";
            wrong.parentID = "whineandpout_p";
            makeImage(wrong);
        } else {}
        if (wrong10 == "right") {
            right.id = "threatenthebully_p";
            right.parentID = "threatenthebully_p";
            makeImage(right);
        } else if (wrong10 == "wrong") {
            wrong.id = "threatenthebully_p";
            wrong.parentID = "threatenthebully_p";
            makeImage(wrong);
        } else {}

    } else if (Tab == 28) {} else if (Tab == 29) {
        var smiley = {};
		var sady = {};
		smiley.status = "smile";
        smiley.src = "http://www.sunshinepreventionctr.org/HTMLEditor/plugins/smiley/images/regular_smile.png";
		
		sady.status = "wrong";
        sady.src = "http://www.sunshinepreventionctr.org/HTMLEditor/plugins/smiley/images/sad_smile.png";

        var smile1 = localStorage.getItem('sharingmytoys_p');
        var sad1 = localStorage.getItem('beingmean_p');
        var smile6 = localStorage.getItem('callingthemonphone_p');
        var sad2 = localStorage.getItem('talkingbehindtheirback_p');
        var sad3 = localStorage.getItem('screaming_p');
        var sad4 = localStorage.getItem('makingthemdowhatiwant_p');
        var smile2 = localStorage.getItem('makinganewfriend_p');
        var smile3 = localStorage.getItem('beingrespectful_p');
        var smile8 = localStorage.getItem('lisyeningtioneanother_p');
        var sad5 = localStorage.getItem('hittingorpunching_p');
        var smile4 = localStorage.getItem('givingcompliments_p');
        var sad6 = localStorage.getItem('makingfunoftheotherperson_p');
        var sad7 = localStorage.getItem('bullying_p');
        var smile5 = localStorage.getItem('invitingthemonmyparty_p');
        var sad8 = localStorage.getItem('teasing_p');
        var smile7 = localStorage.getItem('helping_p');

        if (smile1 == "smile") {
            smiley.id = "sharingmytoys_p";
            smiley.parentID = "sharingmytoys_p";
            makeSmileImage(smiley);
        } else if (smile1 == "sad") {
            sady.id = "sharingmytoys_p";
            sady.parentID = "sharingmytoys_p";
            makeSmileImage(sady);
        } else {}
        if (sad1 == "smile") {
            smiley.id = "beingmean_p";
            smiley.parentID = "beingmean_p";
            makeSmileImage(smiley);
        } else if (sad1 == "sad") {
            sady.id = "beingmean_p";
            sady.parentID = "beingmean_p";
            makeSmileImage(sady);
        } else {}
        if (smile6 == "smile") {
            smiley.id = "callingthemonphone_p";
            smiley.parentID = "callingthemonphone_p";
            makeSmileImage(smiley);
        } else if (smile6 == "sad") {
            sady.id = "callingthemonphone_p";
            sady.parentID = "callingthemonphone_p";
            makeSmileImage(sady);
        } else {}
        if (sad2 == "smile") {
            smiley.id = "talkingbehindtheirback_p";
            smiley.parentID = "talkingbehindtheirback_p";
            makeSmileImage(smiley);
        } else if (sad2 == "sad") {
            sady.id = "talkingbehindtheirback_p";
            sady.parentID = "talkingbehindtheirback_p";
            makeSmileImage(sady);
        } else {}
        if (sad3 == "smile") {
            smiley.id = "screaming_p";
            smiley.parentID = "screaming_p";
            makeSmileImage(smiley);
        } else if (sad3 == "sad") {
            sady.id = "screaming_p";
            sady.parentID = "screaming_p";
            makeSmileImage(sady);
        } else {}
        if (sad4 == "smile") {
            smiley.id = "makingthemdowhatiwant_p";
            smiley.parentID = "makingthemdowhatiwant_p";
            makeSmileImage(smiley);
        } else if (sad4 == "sad") {
            sady.id = "makingthemdowhatiwant_p";
            sady.parentID = "makingthemdowhatiwant_p";
            makeSmileImage(sady);
        } else {}
        if (smile2 == "smile") {
            smiley.id = "makinganewfriend_p";
            smiley.parentID = "makinganewfriend_p";
            makeSmileImage(smiley);
        } else if (smile2 == "sad") {
            sady.id = "makinganewfriend_p";
            sady.parentID = "makinganewfriend_p";
            makeSmileImage(sady);
        } else {}
        if (smile3 == "smile") {
            smiley.id = "beingrespectful_p";
            smiley.parentID = "beingrespectful_p";
            makeSmileImage(smiley);
        } else if (smile3 == "sad") {
            sady.id = "beingrespectful_p";
            sady.parentID = "beingrespectful_p";
            makeSmileImage(sady);
        } else {}
        if (smile8 == "smile") {
            smiley.id = "lisyeningtioneanother_p";
            smiley.parentID = "lisyeningtioneanother_p";
            makeSmileImage(smiley);
        } else if (smile8 == "sad") {
            sady.id = "lisyeningtioneanother_p";
            sady.parentID = "lisyeningtioneanother_p";
            makeSmileImage(sady);
        } else {}
        if (sad5 == "smile") {
            smiley.id = "hittingorpunching_p";
            smiley.parentID = "hittingorpunching_p";
            makeSmileImage(smiley);
        } else if (sad5 == "sad") {
            sady.id = "hittingorpunching_p";
            sady.parentID = "hittingorpunching_p";
            makeSmileImage(sady);
        } else {}
        if (smile4 == "smile") {
            smiley.id = "givingcompliments_p";
            smiley.parentID = "givingcompliments_p";
            makeSmileImage(smiley);
        } else if (smile4 == "sad") {
            sady.id = "givingcompliments_p";
            sady.parentID = "givingcompliments_p";
            makeSmileImage(sady);
        } else {}
        if (sad6 == "smile") {
            smiley.id = "makingfunoftheotherperson_p";
            smiley.parentID = "makingfunoftheotherperson_p";
            makeSmileImage(smiley);
        } else if (sad6 == "sad") {
            sady.id = "makingfunoftheotherperson_p";
            sady.parentID = "makingfunoftheotherperson_p";
            makeSmileImage(sady);
        } else {}
        if (sad7 == "smile") {
            smiley.id = "bullying_p";
            smiley.parentID = "bullying_p";
            makeSmileImage(smiley);
        } else if (sad7 == "sad") {
            sady.id = "bullying_p";
            sady.parentID = "bullying_p";
            makeSmileImage(sady);
        } else {}
        if (smile5 == "smile") {
            smiley.id = "invitingthemonmyparty_p";
            smiley.parentID = "invitingthemonmyparty_p";
            makeSmileImage(smiley);
        } else if (smile5 == "sad") {
            sady.id = "invitingthemonmyparty_p";
            sady.parentID = "invitingthemonmyparty_p";
            makeSmileImage(sady);
        } else {}
        if (sad8 == "smile") {
            smiley.id = "teasing_p";
            smiley.parentID = "teasing_p";
            makeSmileImage(smiley);
        } else if (sad8 == "sad") {
            sady.id = "teasing_p";
            sady.parentID = "teasing_p";
            makeSmileImage(sady);
        } else {}
        if (smile7 == "smile") {
            smiley.id = "helping_p";
            smiley.parentID = "helping_p";
            makeSmileImage(smiley);
        } else if (smile7 == "sad") {
            sady.id = "helping_p";
            sady.parentID = "helping_p";
            makeSmileImage(sady);
        } else {}


    } else if (Tab == 30) {} else if (Tab == 31) {} else if (Tab == 32) {} else {}

}

function makeImage(obj) {
    var img = document.createElement('img');
    img.alt = obj.status;
    img.src = obj.src;
    img.style.height = "40px";
    img.style.width = "120px";
    img.style.position = "absolute";
    img.style.marginLeft = "-100px";
    img.id = obj.id.split("_")[0] + "_1";
    img.addEventListener("mousedown", function(event) {
        rightWrongImageClicked(event);
    });
    document.getElementById(obj.parentID).appendChild(img);
}

function makeSmileImage(obj) {
    var img = document.createElement('img');
    img.alt = obj.status;
    img.src = obj.src;
    img.style.height = "35px";
    img.style.width = "35px";
    img.style.marginTop = "-2px";
    img.style.marginLeft = "-3px";
    img.id = obj.id.split("_")[0] + "_1";
    document.getElementById(obj.parentID).appendChild(img);
}