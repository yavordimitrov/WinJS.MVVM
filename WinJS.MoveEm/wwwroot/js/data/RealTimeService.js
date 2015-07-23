(function () {

    var RealtimeService = WinJS.Class.define(function () {
        this.hub = $.connection.chathub;
        this.hub.client.broadCastMessage = this.messageReceived.bind(this);
        $.connection.hub.start();
    },
        {
            hub: null,
            messageReceived: function (name, message) {
                this.dispatchEvent("messagereceived", { FirstName: name, LastName: message })
            },
            send: function (name, message) {
                this.hub.server.send(name, message);
            }
        })
    WinJS.Namespace.define("Application.Realtime", {
        realtimeService: WinJS.Class.mix(RealtimeService, WinJS.Utilities.eventMixin)
    })
})()