$(document).ready(function () {

  $('.card-text').each(function(i, obj) {
    var cutoff = 100;
    var text = obj.innerHTML;
    if (text.length > cutoff) {
      text;
      obj.innerHTML = text.substring(0, cutoff) + '...';
    }
  });

  $('#loadMore').click(function () {
    let value = $('#search-input').val();
    let url;
    if (!value || value === '') {
      url = `/books?limit=${pageConfig.limit()}&offset=${pageConfig.offset}`;
    } else {
      url = `/books?search=${value}&limit=${pageConfig.limit()}&offset=${pageConfig.offset}`;
    }

    $.get(url, null, function(data, status, xhr) {
      if (status >= 300 || status < 200) {
        console.log("Error loading books for search. Code: " + status);
        return
      }

      const offset = pageConfig.OFFSET
      pageConfig.offset += 9

      const books = data.items;
      let totalHtml = $('#books-container').html();

      console.log(totalHtml);
      for (var i=0; i<books.length; i++) {
        const book = books[i];

        totalHtml += `
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
              <span><p class="card-text">
                ${book.description}
              </p></span>
              <a href="#" data-toggle="modal" data-target="#bookCardModal${book.id}">Read more</a>
              <a href="#" class="card-link">Mark as read</a>
              <a href="#" class="card-link">Add to my list</a>
            </div>
          </div>
          <div class="modal fade" id="bookCardModal${book.id}" tabindex="-1" role="dialog" aria-labelledby="bookCardModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">${book.title}</h5>
                  <h6 class="modal-subtitle mb-2 text-muted">${book.author}</h6>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p class="card-text-modal">${book.description}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">Add to my list</button>
                  <button type="button" class="btn btn-primary">Mark as read</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`
      }

      $('.card-container').html(totalHtml);
      $('.card-text').each(function(i, obj) {
        const cutoff = 100;
        const text = obj.innerHTML;
        if (text.length > cutoff) {
          obj.innerHTML = text.substring(0, cutoff) + '...';
        }
      });

    }, 'json');
  })
});
