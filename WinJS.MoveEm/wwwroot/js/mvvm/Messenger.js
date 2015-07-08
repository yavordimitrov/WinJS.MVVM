(function () {
    "use strict";

    WinJS.Namespace.define("WinJS.Mvvm.Messenger", {
        register: function (message, callback) {
            WinJS.Application.addEventListener(message.type, callback);
        },
        unregister: function (message, callback) {
            WinJS.Application.removeEventListener(message.type, callback);
        },
        send: function (eventInfo) {
            WinJS.Application.queueEvent(eventInfo);
        },

        navigatedBack: function () { return { type: "navigatedBack", uri: null }; },
    });

})();