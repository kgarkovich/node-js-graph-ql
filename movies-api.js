
const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.themoviedb.org/3/';
    }

    async getMovies(endpoint) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response.results;
    }

    async getPartMovies(endpoint, first = 10) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response.results.slice(0, first);
    }

    async getMovie(endpoint) {
        const response = await this.get(endpoint, { api_key: 'c45754301ba30d5d51ca0f4ff494594b' });

        return response;
    }
}

module.exports = MoviesAPI;