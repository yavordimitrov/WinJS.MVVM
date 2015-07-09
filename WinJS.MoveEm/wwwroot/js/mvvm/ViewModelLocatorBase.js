(function () {
    "use strict";

    var ViewModelLocator = WinJS.Class.define(null, {
        createViewModelForTarget: function (viewModelName) {
            return new ViewModels[viewModelName];
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

    var viewModelLocator = new ViewModelLocator();

    WinJS.Namespace.define("Application", {
        ViewModelLocator: viewModelLocator
    });
})()