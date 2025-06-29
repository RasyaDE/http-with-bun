import {
  getData,
  storeData,
  getDataById,
  deleteById,
  updateData,
} from "./controller/controller";

const serve = Bun.serve({
  port: 3000,
  routes: {
    "/": () => {
      return Response.json({
        message: "success",
        status: 200,
      });
    },
    "/api": {
      GET: getData,
      POST: storeData,
    },
    "/api/:id": {
      GET: getDataById,
      DELETE: deleteById,
      PUT: updateData,
    },
  },
  fetch(req) {
    return new Response("failed", { status: 400 });
  },
  error(error){
    console.error(error)
    return new Response('Internal server: Something went wrong')
  }
});

console.log(`listening on http://localhost:${serve.port}`);
