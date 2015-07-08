//Provides support for elaborated bindings in WinJS applications
(function () {
    "use strict";
    var disabledClassName = "mvvm-disabled";

    var getEventParams = function (destProps) {
        var propInfo = {
            srcProps: [],
            eventName: null,
            destProps: []
        };
        destProps.forEach(function (data) {
            var isComplex = data.indexOf('$');
            if (isComplex > 0) {
                var props = data.split('$');
                for (var i = 0; i < props.length; i++) {
                    var propName = props[i];
                    if (i === 0) {
                        propInfo.eventName = propName;
                    } else {
                        propInfo.destProps.push(propName);
                    }
                }
            } else {
                if (propInfo.destProps.length == 0) {
                    propInfo.srcProps.push(data);
                } else {
                    propInfo.destProps.push(data);
                }
            }

        });

        return propInfo;
    };

    var getObjectFromProps = function (object, props, setMode) {
        var i = 0;
        var eventSource = object;
        props.forEach(function (prop) {
            if (setMode === undefined) {
                eventSource = eventSource[prop];
            } else {
                if (i < props.length - 1) {
                    eventSource = eventSource[prop];
                }
            }

            i++;
        });

        return eventSource;
    };

    var getIsTwoWay = function (props) {
        var lastIndex = props.length - 1;
        var lastparam = props[lastIndex];
        var lastOccurrence = lastparam.lastIndexOf('$');
        return lastparam.substring(lastOccurrence) === "$two";
    };

    var removeBindingInfo = function (destProps) {
        var lastIndex = destProps.length - 1;
        var lastparam = destProps[lastIndex];
        var lastOccurrence = lastparam.lastIndexOf('$');
        destProps[lastIndex] = lastparam.substring(0, lastOccurrence);
        return destProps;
    };

    WinJS.Namespace.define("Binding.Mode", {
        //Implements two-way binding
        twoway: WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
            WinJS.Binding.defaultBind(source, sourceProps, dest, destProps);
            dest.onchange = function () {
                var d = dest[destProps[0]];
                var s = source[sourceProps[0]];
                if (s !== d) source[sourceProps[0]] = d;
            };
        }),

        //Pushes a property value when an event occurs optionally using two way mode
        eventToProperty: WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
            //Check whether binding is two-way
            var isTwoWay = getIsTwoWay(sourceProps);
            if (isTwoWay) sourceProps = removeBindingInfo(sourceProps);

            var propInfo = getEventParams(destProps);
            var originPropInfo = getEventParams(sourceProps);
            //Retrieve event source object
            var eventSource = getObjectFromProps(dest, propInfo.srcProps);
            //Subscribe event
            var destObj = getObjectFromProps(source, propInfo.destProps, true);
            eventSource[propInfo.eventName] = function (e) {
                var value = getObjectFromProps(dest, originPropInfo.srcProps);
                destObj[propInfo.destProps[propInfo.destProps.length - 1]] = value;
            };

            //Handles 2-way binding
            if (isTwoWay) {
                destObj.bind(propInfo.destProps[propInfo.destProps.length - 1], function (value) {
                    var srcObj = getObjectFromProps(dest, sourceProps, true);
                    var propName = sourceProps[sourceProps.length - 1];

                    if (srcObj[propName] != value) {
                        srcObj[propName] = value;
                    }
                });
            }
        }),

        //Invokes a method when an event occurs passing source control as event parameter
        invokeOnEvent: WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
            var eventSource = dest;
            var targetMethod = source;
            var sourceItems = destProps.length;
            var destItems = sourceProps.length;
            for (var i = 0; i < sourceItems - 1; i++) {
                eventSource = eventSource[destProps[i]];
            }
            for (var i = 0; i < destItems - 1; i++) {
                targetMethod = targetMethod[sourceProps[i]];
            }

            //Subscribes the event
            eventSource[destProps[sourceItems - 1]] = function () {
                targetMethod[sourceProps[destItems - 1]].call(source, dest);
            };
        }),

        //Allows binding to properties exposed as array e.g: -> data-win-bind="src:dataTile[0].image" mode is one-time
        arrayBind: WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
            var srcObj = source;
            var len = sourceProps.length;
            for (var j = 0; j < len - 1; j++) {
                srcObj = srcObj[sourceProps[j]];
            }

            var destObj = dest;
            for (var i = 0; i < destProps.length - 1; i++) {
                destObj = destObj[destProps[i]];
            }

            destObj[destProps[destProps.length - 1]] = srcObj[sourceProps[len - 1]];
        }),


        command: WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
            //sourceProps.push("execute");
            var eventSource = dest;
            var command = source;
            var sourceItems = destProps.length;
            var destItems = sourceProps.length;
            for (var i = 0; i < sourceItems - 1; i++) {
                eventSource = eventSource[destProps[i]];
            }
            for (var x = 0; x < destItems ; x++) {
                command = command[sourceProps[x]];
            }

            //Subscribes the event
            eventSource[destProps[sourceItems - 1]] = function () {
                if (!WinJS.Utilities.hasClass(disabledClassName)) {
                    command["execute"].call(source, dest);
                }
            };

            //monitors canExecute
            command["canExecute"].bind("value", function (isEnabled) {
                var sourceType = eventSource.tagName.toLowerCase();
                if (isEnabled) {
                    WinJS.Utilities.removeClass(eventSource, disabledClassName);
                } else {
                    WinJS.Utilities.addClass(eventSource, disabledClassName);
                }

                if (sourceType == "button") {
                    eventSource.disabled = !isEnabled;
                }

            });
        })
    });

})()