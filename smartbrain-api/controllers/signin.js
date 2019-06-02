const signinHandler = (req,res, db, bCrypt) => {
	const {email,password} = req.body;
	db.select('email','hash').from('logins').where({email:email})
	.then(data => {
		if(data.length){
			bCrypt.compare(password,data[0].hash,(err,hashRes)=>{
					if (hashRes){
					//	var userData = {"name":"","entries":"0"};
						db.select('name','entries').from('users').where({email:email})
						.then(data =>{
							res.json({
							"match":"match",
							"name":data[0].name,
							"entries":data[0].entries,
						})});
						}})
					} else {
						res.json("please reenter your email and password")
						console.log('password doesn\'t match');
					}})
	}

module.exports = {
	signinHandler:signinHandler
}