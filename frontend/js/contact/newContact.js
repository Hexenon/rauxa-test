

(function($){
  $(function() {
    function objectifyForm(formArray) {//serialize data function

      var returnArray = {};
      for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
      }
      return returnArray;
    }

    window.loadFile = function(event) {
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(event.target.files[0]);
    };

    var contactForm = $('#contact-form');
    var contactModal = $('#newContactModal');
    $('#new-contact-save').click(function(e){
      contactForm.parsley().validate();
      if (contactForm.parsley().isValid()){
        $('#new-contact-save').attr("disabled", true);
        $('#new-contact-save').html('Saving');
        let data = objectifyForm(contactForm.serializeArray());
        uploadPhoto(function(response){
          data.file = response.data.files[0].id;
          io.socket.post('/contact', data, function (resData, jwres){
            if (jwres.statusCode === 200){
              contactForm.parsley().reset();
              var output = document.getElementById('output');
              output.src = '';
              document.getElementById("contact-form").reset();
              contactModal.trigger("reset");
              contactModal.modal('hide');
            }
            $('#new-contact-save').attr("disabled", false);
            $('#new-contact-save').html('Save');

          });
        }, function(err){
          console.error(err);
        });
      }else{
        console.log("invalid");
      }
    });

    function uploadPhoto(success, error){
      var file_data = $('#contact-photo').prop('files')[0];
      var form_data = new FormData();
      form_data.append('file', file_data);
      $.ajax({
        url: rauxa.api + '/api/v1/photo/upload', // point to server-side PHP script
        dataType: 'json',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: success,
        error: error
      });
    }
  });
})(jQuery);

