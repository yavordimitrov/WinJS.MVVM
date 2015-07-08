//Implements Mvvm's RelayCommand 
(function () {
    "use strict";

    var RelayCommand = WinJS.Class.define(function (execute) {
        this.execute = execute;
        this.execute.supportedForProcessing = true;
        this.canExecute = WinJS.Binding.as({ value: true });
    },
        {
            execute: null,
            canExecute: null
        });

    WinJS.Namespace.define("WinJS.Mvvm", {
        RelayCommand: RelayCommand
    });

})()