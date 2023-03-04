let searchform = document.getElementById("searchform")
let searchip = document.getElementById("search")
let searchresults = document.getElementById("searchresults")

searchform.addEventListener("submit", (e) =>
{
    e.preventDefault();
    
    let searchquery = searchip.value;

    const searchHist = JSON.parse(localStorage.getItem("searchHistory") || "[]")

    if(searchip.value === "")
    {
        console.log("No searches to be added");
    }
    else
    {
        const searchrecord =
        {
            query: searchquery,
            datentime: new Date().toISOString()
        }

        searchHist.unshift(searchrecord)
        localStorage.setItem("searchHistory", JSON.stringify(searchHist))
    }
    

    searchresults.innerHTML = ``

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchquery}`)
    .then((response) => response.json())
    .then((data) =>
    {
        // console.log(data);
        let booksdata = data.items;
        
        console.log(booksdata);
        if(searchip.value === "")
        {
            console.log("empty");
            searchresults.innerHTML = "<h2> Search Field is EMPTY! </h2>"
        }
        else if(data.totalItems === 0)
        {
            searchresults.innerHTML = "<h2> OOPS! Your search returned no results. </h2>"
        }
        else
        {
            booksdata.map((book) =>
            {
                console.log(book);
                searchresults.innerHTML +=
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
        } 
    })
})