(function () {
    "use strict";
    // Sample infrastructure internals
    var currentScenarioUrl = null;

    WinJS.Navigation.addEventListener("navigating", function (evt) {
        currentScenarioUrl = evt.detail.location;
    });
    var sampleTitle = "Animation library JS sample";

    var scenarios = [
        { scenarioNumber: 1, url: "/controls/list/list.html", title: "Show page" },
        { scenarioNumber: 1, url: "/controls/list/list.html", title: "Show page" },
    ];

    WinJS.Namespace.define("SdkSample", {
        sampleTitle: sampleTitle,
        scenarios: new WinJS.Binding.List(scenarios)
    });
    
        var ScenarioSelect = WinJS.UI.Pages.define("/controls/sidemenu/sidemenu.html", {
        ready: function (element, options) {
            var that = this;

            element.addEventListener("selectionchanging", function (evt) {
                if (evt.detail.newSelection.count() === 0) {
                    evt.preventDefault();
                }
            });
            element.addEventListener("iteminvoked", function (evt) {
                evt.detail.itemPromise.then(function (item) {
                    that._selectedIndex = item.index;
                    var newUrl = item.data.url;
                    if (currentScenarioUrl !== newUrl) {
                        WinJS.Navigation.navigate(newUrl);
                        var splitView = document.querySelector("#root.win-splitview-openeddisplayoverlay");
                        splitView && splitView.winControl.closePane();
                    }
                });
            });
            element.addEventListener("keyboardnavigating", function (evt) {
                var listview = evt.target.winControl;
                listview.elementFromIndex(evt.detail.newFocus).click();
            });

            this._selectedIndex = 0;

            var lastUrl = WinJS.Application.sessionState.lastUrl;
            SdkSample.scenarios.forEach(function (s, index) {
                s.scenarioNumber = index + 1;
                if (s.url === lastUrl && index !== that._selectedIndex) {
                    that._selectedIndex = index;
                }
            });

            this._listview = element.querySelector(".win-listview").winControl;
            this._listview.selection.set([this._selectedIndex]);
            this._listview.currentItem = { index: this._selectedIndex, hasFocus: true };
        }
    });
})();
