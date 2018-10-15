(function($) {
  $(function () {
    window.viewClick = function (event, id) {
      io.socket.get('/contact/' + id, null, function(data, jwk){
        if (jwk.statusCode === 200){
          io.socket.get('/api/v1/photo/'+data.file.id, null, function(url, jwk){
            if (jwk.statusCode === 200){
              $('#view-contact-photo').html('<img src="'+url.data.url+'" class="mx-auto d-block" " width="200px">');
              $('#view-contact-name').html("Name: "+data.name);
              $('#view-contact-email').html("Email: "+data.email);
              $('#view-contact-phone').html("Phone: "+data.phone);

              $('#list-container').fadeOut();
              $('#view-contact-container').fadeIn();
            }
          });
        }
      });
    };

    window.deleteClick = function (event, id) {
      io.socket.delete('/contact/' + id,null,function(data, jwk){
        if (jwk.statusCode === 200){}
      });
    };

    $('#btn-close-view-contact-container').click(function(e){
      $('#list-container').fadeIn();
      $('#view-contact-container').fadeOut();
    });
  })
})(jQuery);
