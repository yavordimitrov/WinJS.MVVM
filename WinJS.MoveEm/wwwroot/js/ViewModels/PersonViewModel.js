/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    "use strict";

    WinJS.Namespace.define("ViewModels", {
        PersonsViewModel: WinJS.Class.define(function () {
            this._dataService = new Application.Data.dataService();
            this.persons = new WinJS.Binding.List([{ FirstName: "GG", LastName: "WP" }]);
        },
        {
            _dataService: null,
            persons: null,
            loadPersonsCommand: new WinJS.Mvvm.RelayCommand(function (element) {
                this.loadPersonsCommand.canExecute.value = false;
                var that = this;
                this._dataService.getPersons().done(function (data) {
                    that.persons.push(data);
                });

                this.loadPersonsCommand.canExecute.value = true;
            }),
        })
    });
})();