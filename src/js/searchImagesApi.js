import axios from "axios";

export default class SearchImagesApi {
    constructor() {
        this.baseUrl = "https://pixabay.com/api/";
        this.apiKey = "33736384-d824c34936f956644527773fb";
        this.searchWord = "";
        this.imageType = "photo";
        this.orientation = "horizontal";
        this.safesearch = true;
        this.page = 1;
        this.perPage = 40;
    }

    async searchImages() {
        const requestUrl = `${this.baseUrl}?key=${this.apiKey}&q=${this.searchWord}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`;
        return await axios.get(requestUrl)
        .then(response  => {
            if (response.status !== 200 || response.data.hits.length === 0) {
                throw new Error(response.status)  
            }
            this.nextPage();
            return response.data
        })
    }
    
    nextPage () {
        this.page += 1;
    }

    resetPage () {
        this.page = 1;
    }

    changeSearchWord (value) {
        this.searchWord = value;
    }
}


