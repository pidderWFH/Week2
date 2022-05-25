const headers = require("../service/headers");


const HttpControllers = require("../controllers/http");
const PostsControllers = require("../controllers/posts");

const routes = async (req, res) => {

    const { url, method } = req;
    console.log(method, url);
    let body = "";
    req.on("data", chunk=>{
        body+=chunk;
    })

    if(url=="/posts" && method == "GET"){
        PostsControllers.getAllPosts(req, res);
    }else if(url=="/posts" && method == "POST"){
        req.on('end', ()=>{
            PostsControllers.createdPosts({ body, req, res });
        })
    }else if (url == "/posts" && method == "DELETE"){
        PostsControllers.deleteAllPosts(req, res);
    }else if(url.startsWith("/posts/") && method=="DELETE"){
        PostsControllers.deleteOnePosts(req, res);
    }else if (url.startsWith("/posts/") && method == "PATCH"){
        req.on("end", ()=>{
            PostsControllers.patchPosts({ body, req, res});
            
        })
         
    }else if(req.method == "OPTIONS"){
        HttpControllers.cors(req, res);
    }else{
        HttpControllers.notFound(req, res);
    }
}


module.exports = routes;