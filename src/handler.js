const { nanoid } = require("nanoid");
const books = require("./books.js");

const addBookHandler = (request, h) => {
	const { name,year,author,summary,publisher,pageCount,readPage,reading } = request.payload;
	const id = nanoid(8);
	let finished = false;
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;

	if(name === undefined){
		const response =  h.response({
			"status":"fail",
			"message":"Gagal menambahkan buku. Mohon isi nama buku"
		});

		response.code(400);
		return response;
	}

	if(readPage > pageCount){
		const response =  h.response({
			"status":"fail",
			"message":"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
		});

		response.code(400);
		return response;
	}

	if(readPage === pageCount){
		finished = true;
	}
    
	const newBookshelf = {
		id, name, year, author, summary, publisher, pageCount, readPage,finished ,reading, createdAt, updatedAt
	};

	// console.log(newBookshelf);

	books.push(newBookshelf);

	const success = books.filter((book) => book.id === id).length > 0;

	// console.log(success);

	if(success){
		const response = h.response({
			status:"success",
			message: "Buku berhasil ditambahkan",
			data:{
				"bookID": id
			}
		});

		response.code(201);
		return response;
	}

	const response = h.response({
		status:"error",
		message: "Buku gagal ditambahkan"
	});

	response.code(500);
	return response;
};

const getAllBooksHandler = () => ({
	status:"success",
	data: {
		books: books.map(({id,name,publisher}) => ({ id,name,publisher }))
	}
});

const getBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const book = books.filter((n) => n.id === id);

	if(book !== undefined){
		return {
			status: "success",
			data:{
				"book": book.map(({id,name,year,author,summary,publisher,pageCount,readPage,finished,reading,createdAt,updatedAt}) => ({
					"id"        :id,
					"name"      :name,
					"year"      :year,
					"author"    : author,
					"summary"   : summary,
					"publisher" : publisher,
					"pageCount" : pageCount,
					"readPage"  : readPage,
					"finished"  : finished,
					"reading"   : reading,
					"insertedAt": createdAt, 
					"updatedAt" : updatedAt
				}))
			}
		};
	}

	const response = h.response({
		status:"fail",
		message:"Buku tidak ditemukan"
	});

	response.code(404);
	return response;
};

const updateBookByIdHandler = (request, h) => {
	const { id } = request.params;
	const { name,year,author,summary,publisher,pageCount,readPage,reading } = request.payload;
	const updatedAt = new Date().toISOString();
    let finished = false;

	//find id from books array
	const index = books.findIndex((book) => book.id === id);

	//handle if id is found
	if(index !== -1){
		//handle if name is undefined
		if(name === undefined){
			const response = h.response({
				status:"fail",
				message:"Gagal memperbarui buku. Mohon isi nama buku"
			});
			response.code(400);
			return response;
		}
		//handle if readPage is greater than pageCount
		if(readPage > pageCount){
			const response = h.response({
				status:"fail",
				message:"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
			});
			response.code(400);
			return response;
		}

        if(readPage === pageCount){
            finished = true;
        }

		//handle if index is found
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt
		};

		const response = h.response({
			status:"success",
			message:"Buku berhasil diperbarui"
		});
		response.code(200);
		return response;
	}

	//handle if id is not found
	const response = h.response({
		status:"fail",
		message:"Gagal memperbarui buku. Id tidak ditemukan"
	});
	response.code(404);
	return response;
};

const deleteBookByIdHandler = (request, h) => {

};


module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	updateBookByIdHandler,
	deleteBookByIdHandler
};