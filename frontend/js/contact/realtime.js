
(function($){
  $(function() {
    io.socket.on('contact_add', function (data) {
      $.get(rauxa.api + '/api/v1/photo/'+data.file,function(url){
        data.file = {url : url.data.url};
        table.row.add(data).draw();
      });
    });
    io.socket.on('contact_delete', function (deleted) {
      console.log("deleted", deleted);
      var data = table
        .rows()
        .data();

      var newData = [];
      for (var i=0; i < data.length; i++){
        if (data[i].id !== deleted.id){
          newData.push(data[i]);
        }
      }

      table.clear().draw();
      table.rows.add(newData); // Add new data
      table.columns.adjust().draw(); // Redraw the DataTable
    });
  });
})(jQuery);


