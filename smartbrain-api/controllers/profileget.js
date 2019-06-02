const profileget = (req,res) => {
	const {id} = req.params;
	db('users').select('*')
	.where({id})
	.then(user => {
		if(user.length){
		res.json(user[0]);
		} else { throw error}
		})
		.catch (err => res.status(400).json('user not found'))
	}

module.exports = {
	profileget:profileget
}