const axios = require('axios');

module.exports = function(sails) {
  return {
    async fetchAuthorsFromOpenLibrary(query) {
      try {
        const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${query}`);
        return response.data.docs.map(author => ({
          key: author.key,
          name: author.name,
          top_subjects: author.top_subjects || [],
          alternate_names: author.alternate_names || []
        }));
      } catch (error) {
        console.error('Error fetching authors from OpenLibrary:', error);
        throw error;
      }
    },

    async saveAuthors(authors) {
      try {
        const savedAuthors = [];
        for (const author of authors) {
          const savedAuthor = await sails.models.author.findOrCreate(
            { key: author.key },
            author
          );
          savedAuthors.push(savedAuthor);
        }
        return savedAuthors;
      } catch (error) {
        console.error('Error saving authors:', error);
        throw error;
      }
    },

    async searchAuthorsByName(name) {
      try {
        const authors = await sails.models.author.find({
          name: {
            contains: name
          }
        }).select(['name', 'top_subjects']);
        
        return authors.map(author => ({
          name: author.name,
          subjects: author.top_subjects
        }));
      } catch (error) {
        console.error('Error searching authors:', error);
        throw error;
      }
    }
  };
}; 