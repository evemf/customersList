//json-server import
const jsonServer = require('json-server');

// Server instance created
const server = jsonServer.create();

// Router that will use db.json
const router = jsonServer.router('db.json');

// Middlewares for CORS
const middlewares = jsonServer.defaults();
server.use(middlewares);

// We use router to manage the petitions
server.use(router);

// Port config
const port = process.env.PORT || 5000;

// Init server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
