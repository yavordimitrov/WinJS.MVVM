/// <reference path="lib/winjs/js/ui.js" />
/// <reference path="lib/winjs/js/base.js" />
(function () {
    WinJS.UI.processAll().done(function () {
        WinJS.Navigation.navigate('/controls/home/home.html');
    });
})();

window.onerror = function (E) {
    debugger;
}