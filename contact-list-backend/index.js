const express = require('express');
const app = express();
const config = require('config');
const port = process.env.PORT || '3000';


const helmet = require('helmet');
const cors = require('cors');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
const url = config.get('DB.mongoDB.url');
// console.log(url);
mongoose.connect(url, { useNewUrlParser: true, connectTimeoutMS: 10000, socketTimeoutMS: 45000 });
mongoose.Promise = global.Promise;
const mongodb = mongoose.connection;
mongodb.once('open', function callback () { console.log("mongo connection established") });
mongodb.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, user_id, is_colending_user',
		);
	next();
});
	
app.use(require('./middleware/response.middleware'));
app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
