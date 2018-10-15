(function($) {
  $(function () {

    window.table = $('#list-data').DataTable({
      "order": [[ 1, "asc" ]],
      "columnDefs": [
        { "orderable": false, "targets": [0,2] }
      ],
      "columns": [
        {
          "title": "Photo",
          "data": "file",
          "render": function ( data, type, row ) {
            return '<img src="'+data.url+'" width="30px">';
          },
          width: '10%',
          "orderable": false
        },
        {

          "title": "Name",
          "data": "name"
        },
        {
          "title": "Actions",
          "data": "id",
          "render": function(data){
            return '<span class="btn btn-sm" onclick="viewClick(event,'+data+')">view</span>&nbsp;<span class="btn btn-sm" onclick="deleteClick(event,'+data+')">delete</span>';
          },
          width: '20%',
          "orderable": false
        }
      ]
    });
    io.socket.get('/contact', {}, function (resData, jwres) {
      if (jwres.statusCode === 200) {
        resData.forEach(function (d) {
          $.get(rauxa.api + '/api/v1/photo/' + d.file.id, function (data) {
            d.file.url = data.data.url;
            table.row.add(d).draw();
          });
        });
      }
    });
  })
})(jQuery);
