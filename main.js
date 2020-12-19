let xmlContent = '';
let divCards = document.getElementById('cardsBody');
let moreIcon = '<a href="javascript:script(0)" title = \'Click to know more\'><i class="fas fa-external-link-alt"></i></a>';
// let bookIcon = '<i class="fas fa-book-open"></i>';
let bookIcon = "<img src='open-book.svg'/>";

fetch('data.xml').then((response) => {
    response.text().then((xml) => {
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let rows = xmlDOM.querySelectorAll('row');

        rows.forEach(rowNode => {
            let rowDiv = document.createElement('div');
            let rowId = rowNode.id;
            rowDiv.id = rowId;
            let books = rowNode.querySelectorAll('book');

            books.forEach(bookNode => {
                let card = document.createElement('div');
                let titleDiv = document.createElement('div');
                let descDiv = document.createElement('div');
                let div = document.createElement('div');
                let h2 = document.createElement('h2');
                let span = document.createElement('span');

                // Adding Title
                span.innerHTML = bookIcon;
                    titleDiv.appendChild(span);
                h2.innerText = bookNode.children[1].innerHTML; // TAG: title
                    titleDiv.appendChild(h2);
                span = document.createElement('span');
                span.innerHTML = moreIcon;
                    titleDiv.appendChild(span);
                titleDiv.classList.add('cardTitle');
                card.appendChild(titleDiv);

                // Adding Description
                authorDiv = document.createElement('div');
                    span = document.createElement('span');
                    span.classList.add('authorTxt');
                    span.innerText = "Author: " 
                        authorDiv.appendChild(span);
                    span = document.createElement('span');
                    span.innerText = bookNode.children[0].innerHTML; //TAG: author
                        authorDiv.appendChild(span);
                descDiv.appendChild(authorDiv);

                div = document.createElement('div'); 
                div.innerText = "About the Book: " + bookNode.children[5].innerHTML; //TAG: description
                    descDiv.appendChild(div);
                div = document.createElement('div');
                div.innerText = "Genre: " + bookNode.children[2].innerHTML; //TAG: genre
                    descDiv.appendChild(div);
                descDiv.classList.add('cardDesc');
                card.appendChild(descDiv);

                // Date of publication and price
                div = document.createElement('div'); 
                div.innerText = "Publication Date: " + bookNode.children[4].innerHTML;
                    descDiv.appendChild(div);
                div = document.createElement('div');
                div.innerText = "Price: " + bookNode.children[3].innerHTML;
                    descDiv.appendChild(div);
                card.appendChild(descDiv);
                
                rowDiv.appendChild(card);
                card.classList.add('card');

            });

            rowDiv.classList.add('row-container');
            divCards.appendChild(rowDiv);
        });
    });
});
