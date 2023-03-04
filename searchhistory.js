const searchHist = JSON.parse(localStorage.getItem("searchHistory") || "[]")

let histElem = document.getElementById("history")
let searchres = document.getElementById("searchresults")
let delBtn = document.getElementById("delhist")

const histList = searchHist.map(record =>

    `
        <li class="hist-item">
            <a href="" class="query-link"> ${record.query} </a>
            <div> ${new Date(record.datentime).toLocaleString()} </div>
        </li>
    `
).join('')

histElem.innerHTML = histList;

let queryLinks = document.querySelectorAll(".query-link")
console.log(queryLinks);

queryLinks.forEach((link) =>
{
    link.addEventListener("click", (e) =>
    {
        e.preventDefault();

        searchresults.innerHTML = ``

        console.log(link.textContent);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${link.textContent}`)
        .then((response) => response.json())
        .then((data) =>
        {
            let booksdata = data.items;
            console.log(booksdata);

            booksdata.map((book) =>
            {
                console.log(book);
                searchres.innerHTML +=
                `
                <div class="item">
                    <div class="img-cont">
                        <img src="${book.volumeInfo.imageLinks.thumbnail}">
                    </div>
                    <div> Title: ${book.volumeInfo.title} </div>
                    <div> Author: ${book.volumeInfo.authors} </div>
                    <div> Page Count: ${book.volumeInfo.pageCount} </div>
                    <div> Publisher: ${book.volumeInfo.publisher} </div>
                    <section class="buynow"> <a href="${book.volumeInfo.infoLink}" target="_blank"> Buy Now </a> </section>
                </div> 
                `
            })
        })
    })
})

if(localStorage.getItem('searchHistory') === null)
{
    histElem.innerHTML = 'Your Search History is Empty!';
    delBtn.disabled = "true"
}

delBtn.addEventListener('click', () =>
{
    // Clear the search history in localStorage
    localStorage.removeItem('searchHistory');
    searchres.innerHTML = '';
    histElem.innerHTML = 'Your Search History is Empty!';
    delBtn.disabled = "true"
});