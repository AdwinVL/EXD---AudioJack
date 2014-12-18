module.exports = function(app){

	app.get("/", function(req, res){
		res.render("index", {title: "Audio Jack"});
	});

	app.get("/robotsim", function(req, res){
		res.render("robotsim", {title: "Robotsim", bodyClass: "robotsim"});
	});
};
