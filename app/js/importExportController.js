$( document ).ready(function() {
/*  $("#import").click(function() {
    // Get input values
    url =         $('#url').val();
    container =   $('#container').val();
    item =        $('#item').val();
    nextbutton =  $('#nextbutton').val();
    searcharea =  $('#searcharea').val();
    regex =       $('#regex').val();

  });*/

  $("#export").click(function() {
    // Get input values
    var file = [
      $('#url').val(),
      $('#container').val(),
      $('#item').val(),
      $('#nextbutton').val(),
      $('#searcharea').val(),
      $('#regex').val()
    ];
    JSON.stringify(file);
  });
});
