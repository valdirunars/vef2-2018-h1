$(document).ready(function () {

  $('.card-text').each(function(i, obj) {
    var cutoff = 100;
    var text = obj.innerHTML;
    if (text.length > cutoff) {
      text;
      obj.innerHTML = text.substring(0, cutoff) + '...';
    }
  });

  $('#search-button').click(function () {
    let value = $('#search-input').val();
    if (!value) {
      value = '';
    }

    const url = '/books?search=' + value;
    $.get(url, null, function(data, status, xhr) {
      const books = data.items;

      let html = `
      <div class="card add-card" style="width: 18rem;">
        <div class="card-body">
          <div class="plus-card">
            <svg height="30" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <a href="#" data-toggle="modal" data-target="#ModalAddNewBook">Add new book</a>
          </div>
        </div>
      </div>

      <div class="modal fade" id="ModalAddNewBook" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ModalAddBookTitle">Add new book</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="new-book-fill-out" action="index.html" method="post">
                <div class="form-group">
                  <label for="title-add-book">Title:</label>
                  <input id="title-add-book" class="form-control" type="text" name="" value="" required>
                </div>
                <div class="form-group">
                  <label for="author-add-book">Author:</label>
                  <input id="author-add-book" class="form-control" type="text" name="" value="">
                </div>
                <div class="form-group">
                  <label for="description-add-book">Description:</label>
                  <input id="description-add-book" class="form-control" type="textarea" name="" value="">
                </div>
                <div class="form-group">
                  <label for="category-add-book">Category:</label>
                  <input id="category-add-book" class="form-control" type="text" name="" value="">
                </div>
                <div class="form-group">
                  <label for="isbn-add-book">ISBN number:</label>
                  <input id="isbn-add-book" class="form-control" type="text" name="" value="">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary">Save Book</button>
            </div>
          </div>
        </div>
      </div>`;

      for (var i=0; i<books.length; i++) {
        const book = books[i];

        html += `<div class="card" style="width: 18rem;">
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
      $('.card-container').html(html);
      $('.card-text').each(function(i, obj) {
        var cutoff = 100;
        var text = obj.innerHTML;
        if (text.length > cutoff) {
          text;
          obj.innerHTML = text.substring(0, cutoff) + '...';
        }
      });
    }, 'json');
  });
});
