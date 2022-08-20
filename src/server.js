const Hapi = require("@hapi/hapi");
const {routes} = require("./routes.js");

const init = async() => {
	const server = Hapi.server({
		port: 8000,
		host: "localhost",
		routes:{
			cors:{
				origin:["*"]
			}
		}
	});

	await server.start(routes);

	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();