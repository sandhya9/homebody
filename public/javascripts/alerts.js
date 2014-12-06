$(document).ready(function(){


    $('.radio-btn').click(function(){

         var link =  $(this).attr('src');

        if(link.indexOf('unselected') > -1) {
            $(this).attr('src', 'images/selected.png');
        } else {
            $(this).attr('src', 'images/unselected.png');
        }

    });




});