const routes = require("next-routes");

module.exports = routes()
    .add({name: "index", pattern: "/", page: "index"})
    .add({name: "publications", pattern: "/publications", page: "publications"})
    .add({name: "blog", pattern: "/writing-behind-the-scenes", page: "blog"})
    .add({name: "archive", pattern: "/writing-behind-the-scenes/archive", page: "archive"})
    .add({name: "post", pattern: "/writing-behind-the-scenes/:slug", page: "post"});
//.add("notfound", "/*");
