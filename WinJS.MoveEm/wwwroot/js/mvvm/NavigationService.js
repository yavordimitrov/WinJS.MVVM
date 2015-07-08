//Handle pages navigation
(function () {
    "use strict";
    var nav = WinJS.Navigation;

    WinJS.Namespace.define("MvvmStack.Navigation", {
        navigate: function (url, parameters) {
            if (url == nav.location) return null;
            //Creates related viewmodel
            Application.ViewModelLocator.createViewModelForUrl(url);
            //Navigates to page
            return nav.navigate(url, parameters);
        },
        navigateOnResume: function (url, parameters) {
            return nav.navigate(url, parameters);
        },
        canGoBack: function () {
            return nav.canGoBack;
        },
        back: function () {
            nav.back();
        },
        canGoForward: function () {
            return nav.canGoForward;
        },
        forward: function () {
            nav.forward();
        },
        isActive: function (url) {
            return nav.location === url;
        }
    });

    //Subscribes navigation back message so that current viewModel can be set null
    WinJS.Mvvm.Messenger.register(WinJS.Mvvm.Messenger.navigatedBack(), function (msg) {
        Application.ViewModelLocator.deleteViewModelForPage(msg.uri);
    });
}())