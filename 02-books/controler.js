

function init() {
  creatBooks();
  randerBook();
}


function randerBook() {
  var books = gBooks;
  var strHtmls = books.map(function (book) {
    return `
        <tr class="book-item">
            <td scope="col">${book.id}</td>
            <td scope="col"  >${book.name}</td>
            <td scope="col" > ${formatCurrency(book.price)} </td>
            <td class="btns">
            <button class="btn btn-primary" data-trans="read" onclick="onReadBook(${book.id})">Read</button>
            <button class="btn btn-warning" data-trans="update" onclick="onUpdatebook(${book.id})">Update</></button>
            <button onclick="onDeleteBook(${book.id})" data-trans="delete" class="btn btn-danger">Delete</></button>
            </td>
        </tr> 
        `
  })

  $('.books-board').html(strHtmls.join(''));
}

function renderModal(bookId) {
  var book = gBooks.find(book => {
    return bookId === book.id;
  });

  var strHtml = '';
  strHtml += `
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${book.name}</h5>
                    <button type="button" 	class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true" onclick='hide()'>&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  <p ><div data-trans="Title">Book Name:</div> ${book.name}</p>
                  <div>${formatCurrency(book.price)} </div>
                  <button type="button" onclick='hide()'  class="close btn btn-secondary" data-dismiss="modal">Close</button>
                </>
        
                </div>`;
  $('.modal').html(strHtml);
  document.querySelector('.modal').classList.add('show')
}

function hide() {
  document.querySelector('.modal').classList.remove('show')
}

function onUpdatebook(bookId) {
  var newPrice = +prompt('chang price:');
  updatebook(bookId, newPrice);
  randerBook();
}

function onDeleteBook(id) {
  var id = getBookByid(id);
  gBooks.splice(id, 1);
  randerBook();

}


function onReadBook(bookId) {
  renderModal(bookId);

}


function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') document.body.classList.add('rtl');
  else document.body.classList.remove('rtl');

  doTrans();
}