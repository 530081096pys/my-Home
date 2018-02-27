var crypto=require("crypto");
module.exports=function (pass) {
    return function (req,res,reslove) {
        res.cookies=[];
        res.cookie=function(key,val){
            var Cipher=crypto.createCipher("aes192",pass);
            Cipher.update(val,"utf8","hex");
            var str=Cipher.final("hex");;
            res.cookies.push(key+"="+str);
            res.setHeader("set-cookie",res.cookies);
        };

        var cookies=req.headers.cookie;
        req.cookies = {};
        if(cookies) {
            var arr = cookies.split("; ");
            console.log(arr);
            for (var i = 0; i < arr.length; i++) {
                var arr1 = arr[i].split("=");
                var Decipher = crypto.createDecipher("aes192", pass);
                Decipher.update(arr1[1], "hex", "utf8");
                var str = Decipher.final("utf8");
                req.cookies[arr1[0]] = str;
            }
        }
        reslove();
    }
}