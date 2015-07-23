/// <reference path="lib/winjs/js/ui.js" />
/// <reference path="lib/winjs/js/base.js" />
(function () {
    "use strict";
    WinJS.UI.Pages.define("/controls/list/list.html", {
        ready: function (element, options) {
            var model = Application.ViewModelLocator.createViewModelForTarget('PersonsViewModel');
            WinJS.Binding.processAll(element, model);
        }
    });
})();
