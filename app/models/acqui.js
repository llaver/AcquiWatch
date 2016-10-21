var mongoose = require('mongoose');  
var acquiSchema = new mongoose.Schema({
	id: Number,
	buyer: {
		name: String,
		country: String,
	},
	seller: {
		name: String,
		img: String,
		country: String,
		field: String,
		desc: String,
	},
	value: Number,
	info: String,
	date: String
});
module.exports = mongoose.model('Acqui', acquiSchema);

/* TEMPLATE FOR DB INSERT
db.tester.insert(
   {
   	  "id" : 1,	
      "buyer" : {
         "name" : "Yahoo",
         "country" : "USA"
      },
      "seller" : {
         "name" : "Netflix",
         "img" : "ImageName",
         "country" : "USA",
         "field" : "Technology",
         "desc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus nunc ligula, eget vehicula neque pellentesque quis. Donec euismod est vel nulla auctor, nec tempus nulla fringilla.",
      },
      "value" : "4800000000",
      "info" : "http://www.hioushbfouh.com/sfdugisdubhgiousfdgiou",
      "date" : "2016/08/18"
   }
) */
//Date format: YYYY-MM-DD