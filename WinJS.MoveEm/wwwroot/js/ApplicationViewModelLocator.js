(function (target) {
    "use strict";

    var ViewModelLocator = WinJS.Class.derive(WinJS.Mvvm.ViewModelLocatorBase, function (target) {
        this.target = target;
    },
    {
        createViewModelForUrl: function (uri) {
            return new ViewModels.PersonsViewModel();
        }
    });

    var viewModelLocator = new ViewModelLocator({ list: '/controls/list/list.html' });
    WinJS.Namespace.define("Application", {
        ViewModelLocator: viewModelLocator
    });

})()