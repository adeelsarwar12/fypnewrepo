//Code For Search Result
var showResults = debounce(function (arg) {
  var value = arg.trim();
  if (value == "" || value.length <= 0) {
      $("#search-results").fadeOut();
      return;
  }
  else {
      $("#search-results").fadeIn();
  };
  var jqxhr = $.get('/property/search?q=' + value, function (data) {
      $("#search-results").html("");
  }).done(function (data) {
      if (data.length === 0) {
          $("#search-results").append('<p class="lead text-center mt-2">No Results</p>');
      }
      else {
          data.forEach(x => {
              console.log(x);
              $("#search-results").append('<a href="/property/showProperty/'+x.userId+'"><p class="m-2">' + x.address + '</p></a><hr>')
          })

      }
  }).fail(function (err) {
      console.log(err);
  })
}, 200)

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
      var context = this,
          args = arguments;
      var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  }
}