const { addBookHandler, getAllBooksHandler  } = require("./handler.js");

const routes = [
	{
		method:"POST",
		path:"/books",
		handler: addBookHandler
	},
	{
		method:"GET",
		path:"/books",
		handler: getAllBooksHandler
	}
];

module.exports = routes;