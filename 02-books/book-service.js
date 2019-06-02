'use strick'

var gBooks;

var gId = 0;

var gTrans = {
    MainTitle: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    Index: {
        en: 'Index',
        he: 'אינדקס'
    },
    Title: {
        en: 'Title',
        he: 'כותרת'
    },
    Price: {
        en: 'Price',
        he: 'מחיר',
    },
    Action: {
        en: 'Action',
        he: 'פעילות'
    },
    'delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'update': {
        en: 'Update',
        he: 'עדכן',
    },
    'read': {
        en: 'Read',
        he: 'קרא',
    }
}
var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;
        
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];
randerBook();
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}



function creatBook(name, url,price) {

    return {
        id: gId++,
        name: name,
        price: price,
        imgUrl: url,
    }

}



function creatBooks() {

    books = [
        creatBook('Hurri Puter', 'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg',20),
        creatBook('Donald', 'https://cdn.shopify.com/s/files/1/2131/2399/products/DONALD2-A_2048x.jpg?v=1540273413',55),
        creatBook('African Spy', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1549556221-416OUOetrKL.jpg',40),
    ]
    gBooks = books;
}

function updatebook(bookId, newPrice) {
    for (var i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id === bookId) {
            gBooks[i].price = newPrice;
        }
    }
}




function getBookByid(idx) {
    return gBooks.findIndex(function (book) {
        return book.id = idx;
    })
}




function bookDeatle(bookId) {
    renderModal(bookId)
}


function formatCurrency(num) {
    if (gCurrLang === 'he'){    
    num=num*4;
   return new Intl.NumberFormat('he',{ style: 'currency', currency: 'ILS' }).format(num);
}
return new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(num);
}
