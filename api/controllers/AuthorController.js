const AuthorServiceFactory = require('../services/AuthorService');

module.exports = {
  async fetchAndStore(req, res) {
    try {
      const AuthorService = AuthorServiceFactory(req._sails);
      const query = req.query.q || 'twain';
      const authors = await AuthorService.fetchAuthorsFromOpenLibrary(query);
      const savedAuthors = await AuthorService.saveAuthors(authors);
      return res.ok(savedAuthors);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async search(req, res) {
    try {
      const AuthorService = AuthorServiceFactory(req._sails);
      const name = req.query.name;
      if (!name) {
        return res.badRequest('Name parameter is required');
      }
      const authors = await AuthorService.searchAuthorsByName(name);
      return res.ok(authors);
    } catch (error) {
      return res.serverError(error);
    }
  }
}; 