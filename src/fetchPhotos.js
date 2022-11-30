import axios from "axios";

class ApiWorkKlass {
    constructor() {
        this.formValue = "",
        this.page = 1,
        this.totalHits = 0,
        this.paginationacount = 40;  
        
    }
    async fetchPhotos() {
    const API_KEY = '31626093-8a46cab1aceea7faa191d0f95'; 
    const BASE_URL = 'https://pixabay.com/api/';
     
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.formValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.paginationacount}`);
    this.totalHits = response.data.totalHits       
        return response.data.hits;
    }
    get value() {
        return this.formValue
    }
    set value(newValue) {
        return this.formValue = newValue
    }
    incrementPage() {
        this.page +=1
    }
    resetPage() {
        this.page = 1
    }
    canLoadMore() {
        return this.page< Math.ceil(this.totalHits/this.paginationacount)
    }
}
export { ApiWorkKlass }

