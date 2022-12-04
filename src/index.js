 import { formToJSON } from 'axios';
import { ApiWorkKlass } from './fetchPhotos';
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const refs = {
    form: document.querySelector('.search-form'), 
    cardsContainer: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
}

const apiWork = new ApiWorkKlass();
let lightbox = new SimpleLightbox('.gallery a')

refs.form.addEventListener('submit', onFormSearch)
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick)


async function onFormSearch(event) {
    event.preventDefault() 
    const { elements: { searchQuery },
    } = event.currentTarget;
    const value = searchQuery.value.trim();
    if (!value) {
        return;
    }
    refs.loadMoreButton.classList.add("is-hidden");
    apiWork.resetPage();
    refs.cardsContainer.innerHTML = '';
    apiWork.formValue = value;
    try {
        const data = await apiWork.fetchPhotos()
        if (!data.length) { Notify.failure("Sorry, there are no images matching your search query. Please try again.") }
        else {Notify.info(`Hooray! We found ${apiWork.totalHits} images.`)
            renderMarkup(data);
        }
         
        const canLoadMore = apiWork.canLoadMore()
        if (canLoadMore) {
            refs.loadMoreButton.classList.remove("is-hidden")
             
        }        
    } catch (error) {
        console.log(error);
    }
}
function renderMarkup(data) {
    console.log(data);
     
    let markup = data.map((item) => {
        return `<div class="photo-card"><a class="gallery-item" href="${item.largeImageURL}">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy " width='350px' height='250px' /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <b>${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <b>${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <b>${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <b>${item.downloads}</b>
    </p>
  </div>
</div>`
    }).join('');
    refs.cardsContainer.insertAdjacentHTML('beforeend', markup)
    new SimpleLightbox('.gallery a')
}      


async function onLoadMoreButtonClick(event) {
    apiWork.incrementPage();
    const canLoadMore = apiWork.canLoadMore()
        if (!canLoadMore) {
            refs.loadMoreButton.classList.add("is-hidden")
            
            Notify.failure("We're sorry, but you've reached the end of search results.")
    }
    
    try {
        const data = await apiWork.fetchPhotos();
        renderMarkup(data);
        lightbox.refresh();
    } catch (error) {
        throw new Error
    }
 }  
   




 


 