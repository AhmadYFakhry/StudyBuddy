const express = require('express');
const PORT = process.env.PORT || 8000;
const userRouter = require("./routes/User");
const taskRouter = require('./routes/Task');
const listRouter = require('./routes/List')
require("./utils/DbSetup");

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, DELETE, POST');
    res.header('Access-Control-Allow-Methods', 'DELETE, POST');
    next();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(listRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
