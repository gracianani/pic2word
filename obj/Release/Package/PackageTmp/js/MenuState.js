function OnEnterMenuState() {
 
	initMenu();
}

function OnExitMenuState()
{
}

function initMenu() {
    $("menu").siblings().css("display", "none");
    $("menu").css("display", "block");
    var menuStart = $("#start-btnPlay");
    menuStart.click(function (evt) {
        SM.SetStateByName("preload");
    });
}

var MenuState = new State( OnEnterMenuState, OnExitMenuState );

