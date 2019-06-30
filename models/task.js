const db = require('./db');

module.exports.getTasks = function(cb){
    var text = "SELECT * FROM tasks";
    var params = [];

    db.query(text, params, (err, res) =>{

        if (err){
            console.log(err);
        } else {
            return res;
        }
    });
}