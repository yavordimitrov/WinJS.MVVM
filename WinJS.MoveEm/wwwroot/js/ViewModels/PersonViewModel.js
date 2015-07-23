/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    "use strict";

    WinJS.Namespace.define("ViewModels", {
        PersonsViewModel: WinJS.Class.define(function () {
            this._dataService = new Application.Data.dataService();
            this.persons = new WinJS.Binding.List([{ FirstName: "GG", LastName: "WP" }]);
            this._realtimeService = new Application.Realtime.realtimeService();
            this._realtimeService.addEventListener("messagereceived", this.messageReceived.bind(this));
        },
        {
            _dataService: null,
            _realtimeService: null,
            persons: null,

            loadPersonsCommand: new WinJS.Mvvm.RelayCommand(function (element) {
                this._realtimeService.send("stuff", "you");
            }),
            messageReceived: function (args) {
                this.persons.push(args.detail.FirstName, args.detail.LastName);
            }
        })
    });
})();