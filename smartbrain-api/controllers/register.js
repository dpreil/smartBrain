const registerUser = (req,res, db, bCrypt) => {
	const {name, email, password} = req.body;
	bCrypt.hash(password, 10).then(hash => {
		db.transaction(trx => {
			trx.insert({email:email, hash:hash})
			.into("logins")
			.then(()=>{
				console.log("login entered")
				return trx.insert({
					name:name,
					email:email,
					entries:0,
					date_joined:new Date()
				})
				.into('users')
			})
			.then(()=>{
				trx.commit();
				res.json("registration successful")})
			.catch(trx.rollback)
		}).catch(err => res.status(400).json("Registration failed."))
	})
}

module.exports = {
	registerUser: registerUser
}