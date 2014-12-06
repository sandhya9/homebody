var restler = require('restler'),
    when = require('when'),
    request = require('request');


var header = {
    "Appkey": process.env.DL_APIKEY,
    "Authtoken": "",
    "Requesttoken": ""
};

var active = false;

var lastEvent = Date.now();


var authenticate = function() {

    var deferred = when.defer();

    var url = 'https://systest.digitallife.att.com:443/penguin/api/authtokens?userId='
            + process.env.DL_USER
            + '&password='
            + process.env.DL_PASSWORD
            + '&domain='
            + process.env.DL_DOMAIN
            + '&appKey='
            + process.env.DL_APIKEY;

    restler.post(url).on('complete', function(result, response){
        header.Authtoken = result.content.authToken;
        header.Requesttoken = result.content.requestToken;

        deferred.resolve(result);
    });

    return deferred.promise;

};

var lightSwitch = function(id, status) {

    var deferred = when.defer();

    var url = 'https://systest.digitallife.att.com:443/penguin/api/' + process.env.DL_GATEWAY  + '/devices/' +
            id + '/switch/' + status;

    restler.post(url, {headers: header} ).on('complete', function(result,response){

        deferred.resolve(result);

    });


    return deferred.promise;
};

// Enable event detection, which is pretty flaky right now
var eventDetection = function() {

    var url = 'https://systest.digitallife.att.com/messageRelay/pConnection?uuid='
            + header.Authtoken
            + '&app2='
            + process.env.DL_APIKEY
            + '&key='
            + process.env.DL_GATEWAY;


    request.get(url).on('data', function(chunk){

        var data = chunk.toString();

        var openIdx = data.indexOf('{');

        if(openIdx > -1) {

            var endIdx = data.indexOf('}');

            var payload = data.substr(openIdx, endIdx+1);

            var json  = JSON.parse(payload);

            console.log("Event from: " + json.dev);

            var delta = Date.now() - lastEvent;
            active = (delta > 5000);
            lastEvent = Date.now();
        }
    });
};

var garageDoor = function(id, action) {

    var deferred = when.defer();

    var url = 'https://systest.digitallife.att.com:443/penguin/api/' + process.env.DL_GATEWAY  + '/devices/' +
            id + '/garage-door-control/' + action;

    restler.post(url, {headers: header} ).on('complete', function(result,response){

        deferred.resolve(result);

    });


    return deferred.promise;
};



var isActive = function() {
    return active;
};

var setActive = function(v) {
    active = (v == true)
};


module.exports.authenticate = authenticate;
module.exports.lightSwith = lightSwitch;
module.exports.eventDetection = eventDetection;
module.exports.isActive = isActive;
module.exports.setActive = setActive;
module.exports.garageDoor = garageDoor

