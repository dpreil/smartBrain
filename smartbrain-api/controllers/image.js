const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey:'37ee56e7f2144e0d873763d314893fa5'});

const imageProcessor = (req, res) =>{
	app.models.predict("a403429f2ddf4b49b307e318f00e528b",req.body.imgURL)
	    .then((response) => {
			res.json({'res':response});
	    	}
		).catch(err => res.status(400).json('Unable to process image'))
	}

const imageHandler = (req,res, db) => {
		const {email} = req.body;
		db('users').where('email','=',email)
		.increment('entries',1)
		.returning('entries')
		.then(entries => res.json('entry processed'))
		.catch(err => res.status(400).json('unable to process entry'))}

module.exports = {
	imageHandler:imageHandler,
	imageProcessor:imageProcessor
}