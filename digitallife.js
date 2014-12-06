var restler = require('restler'),
    when = require('when');


var header = {
    "Appkey": process.env.DL_APIKEY,
    "Authtoken": "",
    "Requesttoken": ""
}


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



module.exports.authenticate = authenticate;
module.exports.lightSwith = lightSwitch;

