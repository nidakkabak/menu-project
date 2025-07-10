
const indexRouter = require("../routes/index");
const data = require("../routes/application/data");


const tag = "";
module.exports = (app) => {
    app.use(tag, indexRouter);
    app.use(tag + "/api/data", data);

};
