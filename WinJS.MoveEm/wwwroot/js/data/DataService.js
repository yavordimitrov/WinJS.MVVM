(function () {

    WinJS.Namespace.define("Application.Data", {
        dataService: WinJS.Class.define(null, {
            getPersons: function () {

                return new WinJS.Promise(function (c, e) {
                    WinJS.xhr({
                        url: '/api/home',
                        responseType: 'json',
                        headers: {
                            "If-Modified-Since": "Mon, 27 Mar 1972 00:00:00 GMT",
                            "Accept": "application/json"
                        }
                    }).then(function (data) {
                        if (typeof (data.response) === 'string') {
                            c(JSON.parse(data.response));
                        }
                        else {
                            c(data.response);
                        }
                    });
                });

            }
        })
    })
})()