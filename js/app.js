// get error message id
const errorDiv = document.getElementById('error-message');
const noResult = document.getElementById('no-result');
// total result id
const totalDiv = document.getElementById('total-result');
// toggle spinner
const toggleSpinner = displayStyle =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = displayStyle;
    spinner.style.color = 'white';
}
// hide spinner
toggleSpinner('none');
// search book
const searchBook = () =>{
    const searchField = document.getElementById('search-text');
    const searchText = searchField.value;
    
    // show spinner
    toggleSpinner('block');

    //show error message
    if(searchText===''){
        errorDiv.innerText= "Search field cannot be empty.";
        errorDiv.style.color='wheat';
        errorDiv.style.textAlign='center';
        // hide spinner
        toggleSpinner('none');
    }
    
    else{
        // clear error message
        errorDiv.innerText ='';
        //clear search bar
        searchField.value = '';
       // totalDiv.innerHTML =`<h5>Total number of result found: <span>${data.numFound}</span></h5>`;
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => getBook(data));   
    }
    
}
const getBook = books =>{
    if(books.numFound===0){
       noResult.innerText= "No result found.";
       noResult.style.color='wheat';
       noResult.style.textAlign='center';
    }
    else{
        // clear no result message
        noResult.innerText ='';
        const searchBook = document.getElementById('search-book');
        //clear searched item
        searchBook.textContent ='';
        //show total number of result
        const h3 = document.createElement('h3');
        h3.innerHTML =`The total number of result found: <span style="color:#FF9623;">${books.numFound}</span>`;
        h3.style.color='wheat';
        h3.style.textAlign='center';
        totalDiv.appendChild(h3);
        //show searched books
        // const searchBook = document.getElementById('search-book');
        // //clear searched item
        // searchBook.textContent ='';
        const bookList = books.docs; 
        // creating searched book div
        //optional checking
        bookList?.forEach(book=>{
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML =`
            <div class="card border-secondary bg-light mt-5 mx-4 mb-3 rounded h-100" > 
                <img height="200px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title"><span class="text-secondary fw-semibold fs-5">Book Title: </span>${book.title}</h5>
                <h6 class="card-text"><span class="text-secondary fw-semibold fs-5">Author: </span>${book.author_name}</h6>
                <h6 class="card-text"><span class="text-secondary fw-semibold fs-5">Publisher: </span>${book.publisher}</h6>
                <h6 class="card-text"><span class="text-secondary fw-semibold fs-5">Year: </span>${book.first_publish_year}</h6>
                </div>  
            </div>
            `;
            searchBook.appendChild(div);
        });
    
    }
    // hide spinner
    
     toggleSpinner('none');
}