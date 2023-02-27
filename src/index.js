import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SearchImagesApi from "./js/searchImagesApi";
import renderImage from './js/renderImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const input = document.querySelector('[name="searchQuery"]');
const form = document.querySelector('#search-form');
const loadMoreBtn =document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

const  searchImagesClass = new  SearchImagesApi();

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

form.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", showMore);

function onFormSubmit(event) {
    event.preventDefault();

    let inputValue = input.value;

    searchImagesClass.changeSearchWord(inputValue);
    searchImagesClass.resetPage ();
    gallery.innerHTML = "";


    searchImagesClass.searchImages() 
    .then(images => {
        Notify.success(`Hooray! We found ${images.totalHits} images.`)
        let hits = images.hits
        hits.map(image => {
            renderImage(image)
        })
        lightbox.refresh();
        loadMoreBtnShow();
    })
    .catch(error => {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    })

}

function loadMoreBtnHide ()  {
    loadMoreBtn.style.display = "none";
}

function loadMoreBtnShow ()  {
    loadMoreBtn.style.display = "block";
    
}
function showMore() {
    searchImagesClass.searchImages() 
    .then(images => {
        let hits = images.hits
        hits.map(image => {
            renderImage(image)
        })
        lightbox.refresh();

        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2 ,
    behavior: "smooth",
});
    })
    .catch(error => {
        Notify.info("We're sorry, but you've reached the end of search results.");
        loadMoreBtnHide()
    })
}
