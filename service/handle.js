const headers = require("./headers.js");

const handle ={
    handleError (res, err) {
        res.writeHead(400, headers);
        let message = "";
        if (err) {
            message = err.message;
        }else {
            message = "欄位未填寫正確或無此id"
        }
        res.write(JSON.stringify({
            "status": "false",
            message
        }))
        res.end();
    },
    handleSucess (res, data){
        res.writeHead(200,headers);
        res.write(JSON.stringify({
            "status": "success",
            "data": data
        }))
        res.end();
    }
}

module.exports = handle;