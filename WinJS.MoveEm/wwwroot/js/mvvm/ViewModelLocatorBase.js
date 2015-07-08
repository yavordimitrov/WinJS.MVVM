(function () {
    "use strict";

    var ViewModelLocatorBase = WinJS.Class.define(null,
        {
            target: null,
            viewModels: {},
            createViewModelForUrl: function (uri) {
                throw "Implement logic to create proper viewmodel instances";
            },
            createViewModelForTarget: function (viewModelName) {
                var index = viewModelName.indexOf("ViewModel");
                var targetProp = viewModelName.substring(0, index);
                var uri = this.target[targetProp];
                this.createViewModelForUrl(uri);
                return this.viewModels[viewModelName];
            },
            deleteViewModelForPage: function (uri) {
                var parts = uri.split("/");
                if (parts.length > 0) {
                    var pageName = parts[parts.length - 1];
                    var name = pageName.split(".")[0];
                    var viewModelName = name + "ViewModel";
                    this.viewModels[viewModelName] = null;
                }
            },
        });

    WinJS.Namespace.define("WinJS.Mvvm", {
        ViewModelLocatorBase: ViewModelLocatorBase
    });

})()