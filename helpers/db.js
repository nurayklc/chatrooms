const mongoose = require('mongoose');
/*const mongoURI="mongodb://localhost:27017/appDB";
mongoose
    .connect(mongoURI,{useNewUrlParser:true})
    .then(()=>console.log("MongoDB Connected."))
    .catch((err)=>console.log(err))
*/
module.exports = () => {
	mongoose.connect("mongodb://localhost:27017/chatrooms");

	mongoose.connection.on('open', () => {
	 console.log('MongoDB: Connected');
	});
	mongoose.connection.on('error', (err) => {
		console.log('MongoDB: Error', err);
	});

	mongoose.Promise = global.Promise;
};