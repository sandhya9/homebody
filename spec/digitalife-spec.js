var dl = require('../digitallife');


dl.authenticate();


describe('Digital Life API Test', function() {


    it("should authenticate", function(done){

        dl.authenticate().then(function(result){

            expect(result.status).toBe('0');
            done();
        });
    });

    it("should detect motion", function(done){

        dl.eventDetection();
        expect(true).toBe(true);
    });

    it("should turn on the light", function(done) {

        dl.lightSwith('PE00000005','off').then(function(result){

            expect(result.status).toBe('0');
            done();
        });

    });



});