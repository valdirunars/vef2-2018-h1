$(document).ready(function () {

  $('.card-text').each(function(i, obj) {
    var cutoff = 100;
    var text = obj.innerHTML;
    if (text.length > cutoff) {
      text;
      obj.innerHTML = text.substring(0, cutoff) + '...';
    }
  });
});
