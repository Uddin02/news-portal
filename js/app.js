const loadAllCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category));
}

const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(element => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML =`  
        <a onclick="loadAllCategoriesDetail('${element.category_id}')" class="nav-link px-3 fs-5" href="#">${element.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}

const loadAllCategoriesDetail = (detailsId) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${detailsId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}


const displayDetails = details => {
    // console.log(details)
    
    // no news found message 
    const noDetailFound = document.getElementById('no-detail-found');
    if(details.length === 0){
        noDetailFound.classList.remove('d-none');
    }
    else{
        noDetailFound.classList.add('d-none');
    }
    const newsDetailContainer = document.getElementById('news-detail-container');
    newsDetailContainer.textContent = ``;
    details.forEach(detail => {
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('col');
        detailDiv.innerHTML =`
            <div onclick="newsDetails('${detail._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal" class="card">
                <img src="${detail.image_url}" class="card-img-top" alt="..."> 
                <div class="card-body">
                    <h4 class="card-title fs-5">${detail.title.slice(0,55)+'...'}</h4>
                    <p class="card-text text-muted">${detail.details.slice(0,100)+'...'}</p>      
                    <div class="d-flex fs-6">
                        <div class="d-flex pe-5">
                            <div class="img-fluid ps-0">
                                <img src="${detail.author.img}" style="width: 50px;" alt="" srcset="">
                            </div>
                            <div class="ps-2">
                                <h5>${detail.author.name ? detail.author.name : "Anonymous" }</h5>
                                <h6 class="text-secondary">${detail.author.published_date.slice(0,10)}</h6>
                            </div>
                        </div>
                        <div class="pt-4">
                            <h6 class="text-secondary"><i class="fa-regular fa-eye"><span class="ps-2">${detail.total_view ? detail.total_view : 0}</span></i></h6>
                        </div>
                    
                    </div>
                </div>            
            </div>
        
        `;
        newsDetailContainer.appendChild(detailDiv);
    });

    // stop loader
    toggleSpinner(false);
}

// spinner section
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading === true){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// modal

const newsDetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
   .then(res => res.json())
   .then(data => displayNewsDetailsModal(data.data[0]));
}

const displayNewsDetailsModal = (modal) =>{
    console.log(modal)
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = modal.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <img src="${modal.image_url}" class="card-img-top" alt="...">
        <p class="card-text text-muted pt-1">${modal.details}</p>
        <div class="d-flex justify-content-around">
            <h6 class="card-text text-primary"><span class="text-secondary">Rating:</span> ${modal.rating.number}</h6>
            <h6 class="text-secondary pt-1"><i class="fa-regular fa-eye"><span class="ps-2 text-primary">${modal.total_view ? modal.total_view : 0}</span></i></h6>
        </div>

     `;
}


loadAllCategories();