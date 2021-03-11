module.exports.home = function(req, res){
    //return res.end('<h1>Express is up for Hostel Website</h1>')
    return  res.render('home',{
        title: "HOME"
    });
} 