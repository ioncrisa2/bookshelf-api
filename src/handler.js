import { nanoid } from "nanoid";
import books from "./books.js";
/*
    * Add book handler
*/
export const addBookHandler = (request, h) => {
	const { name,year,author,summary,publisher,pageCount,readPage,reading } = request.payload; //get payload from request
	const id = nanoid(8); //generate id
	let finished = false; //set finished to false
	const createdAt = new Date().toISOString(); //get current date
	const updatedAt = createdAt; //set updated at to current date

	//handle if name is undefined
	if(name === undefined){
		const response =  h.response({
			"status":"fail",
			"message":"Gagal menambahkan buku. Mohon isi nama buku"
		});
		//set response code to 400
		response.code(400);
		return response;
	}

	//handle if readPage is greater than pageCount
	if(readPage > pageCount){
		const response =  h.response({
			"status":"fail",
			"message":"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
		});

		//set response code to 400
		response.code(400);
		return response;
	}

	//set finished to true if readPage is equal to pageCount
	if(readPage === pageCount){
		finished = true;
	}

	//push new book to books array
	const newBookshelf = {
		id, name, year, author, summary, publisher, pageCount, readPage,finished ,reading, createdAt, updatedAt
	};

	//push new book to books array
	books.push(newBookshelf);

	//check if book is added
	const success = books.filter((book) => book.id === id).length > 0;

	//handle if book is added
	if(success){
		const response = h.response({
			status:"success",
			message: "Buku berhasil ditambahkan",
			data:{
				"bookId": id
			}
		});

		//set response code to 201
		response.code(201);
		return response;
	}

	//handle if book is not added
	const response = h.response({
		status:"error",
		message: "Buku gagal ditambahkan"
	});

	//set response code to 500
	response.code(500);
	return response;
};

export const getAllBooksHandler = () => ({
	status:'success',
	data: {
		books: books.map(({id,name,publisher}) => ({
			id,name,publisher
		}))
	}
});

export const getBookByIdHandler = (request, h) => {
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

export const updateBookByIdHandler = (request, h) => {
	const { id } = request.params;
	const { name,year,author,summary,publisher,pageCount,readPage,reading } = request.payload;
	const updatedAt = new Date().toISOString();
	let finished = false;

	const index = books.findIndex((book) => book.id === id);

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

		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt
		};

		return {
			status: "success",
			message: "Buku berhasil diperbaharui"
		};
	}

	const response = h.response({
		status:"fail",
		message:"Gagal memperbarui buku. Id tidak ditemukan"
	});
	response.code(404);
	return response;
};

export const deleteBookByIdHandler = (request, h) => {
	const { id } = request.params;
	const index = books.findIndex((book) => book.id === id);

	if(index !== -1){
		books.splice(index,1);
		return {
			status:"success",
			message:"Buku berhasil dihapus"
		};
	}

	const response = h.response({
		status:"fail",
		message:"Buku gagal dihapus. Id tidak ditemukan"
	});
	response.code(404);
	return response;
};