
const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.themoviedb.org/3/';
    }

    async filterMovies(endpoint, { region, genre, year }) {
        let queryString = `${endpoint}`;

        if (region) {
            queryString += `&region=${region}`;
        }
        if (genre) {
            queryString += `&with_genres=${genre}`;
        }
        if (year) {
            queryString += `&year=${year}`;
        }

        const response = await this.get(queryString, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response;
    }
    
    async getMovies(endpoint) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response;
    }

    async getPartMovies(endpoint, first = 10) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response.results.slice(0, first);
    }

    async getMovie(endpoint) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response;
    }

    async getGenres(endpoint) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response.genres;
    }

    async getCountries(endpoint) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response;
    }
}

module.exports = MoviesAPI;