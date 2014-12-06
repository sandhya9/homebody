$(document).ready(function(){



    function updatePanel() {

        $.get('/inactive', function(data) {

            $('#number-hour').html(data);

        });

    }

    setInterval(updatePanel, 2000);


});