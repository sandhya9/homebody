var dl = require('../digitallife');


dl.authenticate();


describe('Digital Life API Test', function() {


    it("should authenticate", function(done){

        dl.authenticate().then(function(result){

            expect(result.status).toBe('0');
            done();
        });
    });

    it("should turn on the light", function(done) {

        dl.lightSwith('PE00000005','on').then(function(result){

            expect(result.status).toBe('0');
            done();
        });

    });

});