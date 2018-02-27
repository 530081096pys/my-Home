var crypto = require("crypto");
function md5(str){
    const hash = crypto.createHash("sha256");
    hash.update("abcd");
    return hash.digest("hex");
};
module.exports=md5;

