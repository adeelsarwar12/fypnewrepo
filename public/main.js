$(document).ready(function() {
    $("#HostelData").submit(function() {
      var f_num = $("#f_num").val();
      var num_of_room = $("#num_of_room").val();
      var available_seats = $("#available_seats").val();
      $.ajax({
        global: false,
        type: "post",
        url: "/admin/addhosteldata",
        dataType: "json",
        data: {
          f_num: f_num,
          num_of_room: num_of_room,
          available_seats: available_seats
        },
  
        success: function(res) {
          alert("Success");
        },
        error: function(err) {
          alert("Something Wrong");
        }
      });
      return false;
    });
  });