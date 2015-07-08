
(function () {
    "use strict";
    var nav = WinJS.Navigation;

    WinJS.Namespace.define("Application", {
        PageNavigator: WinJS.Class.define(function Navigator(element, options) {
            this._element = element || document.createElement("div");
            this._element.appendChild(this._createPageElement());
            document.body.onkeypress = this._keypressHandler.bind(this);
            nav.onnavigating = this._navigating.bind(this);

        },
        {
            pageControl: {
                get: function () { return this.pageElement && this.pageElement.winControl; }
            },

            // This is the root element of the current page.
            pageElement: {
                get: function () { return this._element.firstElementChild; }
            },
            _element: null,
            _createPageElement: function () {
                var element = document.createElement("div");
                element.className = "navhost";
                element.setAttribute("dir", window.getComputedStyle(this._element, null).direction);
                element.style.width = "100%";
                element.style.height = "100%";
                return element;
            },

            _navigating: function (eventObject) {
                var url = eventObject.detail.location;
                var newElement = this._createPageElement();
                var oldElement = this.pageElement;
                var root = this._element;
                WinJS.UI.Animation.exitPage(oldElement).done(function () {
                    if (oldElement.winControl) {
                        oldElement.winControl.unload && oldElement.winControl.unload();
                        oldElement.winControl.dispose && oldElement.winControl.dispose();
                    }
                    WinJS.Utilities.disposeSubTree(oldElement);
                    WinJS.Utilities.empty(oldElement);



                    WinJS.log && WinJS.log("", "", "status");

                    var p = WinJS.UI.Pages.render(url, newElement, eventObject.detail.state);
                    p.done();
                    root.removeChild(oldElement);
                    root.appendChild(newElement);
                    WinJS.UI.Animation.enterPage(newElement);
                    eventObject.detail.setPromise(p);
                });
            },

            _keypressHandler: function (args) {
                if (args.key === "Backspace") {
                    this._goBack();
                }
            },

            _goBack: function () {
                var msg = messenger.navigatedBack();
                msg.uri = nav.location;
                nav.back();
                messenger.send(msg);
            },
        })
    });
})();