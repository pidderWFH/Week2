const serviceHandle = require("../service/handle");
const Post = require("../model/Posts");
const posts = {
    async getAllPosts(req, res) {
        const post = await Post.find();
        serviceHandle.handleSucess(res, post);
    },
    async createdPosts({ body, req, res }){
        try{
            const data = JSON.parse(body);
            if(data.content !== undefined){
                const newPost = await Post.create(
                    {
                        name: data.name,
                        content: data.content,
                        tags: data.tags,
                        type: data.type
                    }
                );
                serviceHandle.handleSucess(res, newPost)
                
            }else{
                serviceHandle.handleError(res);
            }
        }catch( err ){
            serviceHandle.handleError(res, err);
        }
    },
    async deleteAllPosts( req, res) {
        const post = await Post.deleteMany({});
        serviceHandle.handleSucess(res, post);
    },
    async deleteOnePosts( req, res ){
        const id = req.url.split('/').pop();
        await Post.findByIdAndDelete(id);

        serviceHandle.handleSucess(res);
    },
    async patchPosts ({ body, req, res }){
        try {
            const id = req.url.split("/").pop();
            const data = JSON.parse(body);
            if(data.content !== " "){
                let { content } = data;
                const post = await Post.findByIdAndUpdate(id, { $set: {content}, });
                // console.log(post);
                serviceHandle.handleSucess(res, post);
            }else {
                serviceHandle.handleError(res, err);
            }
        } catch (err) {
            serviceHandle.handleError(res, err);
        }
    }
}

module.exports = posts;