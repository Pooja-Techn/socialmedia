import express from 'express';
import { connectToMongooose } from './config/mongooseConfig.js';
import AuthenticationRouter from './src/features/authentication/authentication.routes.js';
import { jwtAuth } from './middlewares/jwt.middleware.js';
import PostRouter from './src/features/posts/post.routes.js';
import CommentsRouter from './src/features/comments/comments.routes.js';
import cookieParser from 'cookie-parser';
import likeRouter from './src/features/like/like.routes.js';
import OTPRouter from './src/features/otp/otp.routes.js';
import FriendRouter from './src/features/friends/friends.routes.js';
//create server
const server = express();

server.use(express.json()); // Parse JSON bodies
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

server.use(cookieParser());

//default request handler
server.get("/", (req, res)=>{ res.send("Welcome To Social media platform API.")})

server.use("/api/users", AuthenticationRouter)
server.use("/api/posts",jwtAuth, PostRouter)
server.use("/api/comments", jwtAuth,CommentsRouter )
server.use("/api/likes",jwtAuth,  likeRouter)
server.use("/api/otp",jwtAuth,  OTPRouter)
server.use("/api/friends", jwtAuth, FriendRouter)


server.listen(4600,()=>{
    console.log("Server is listening at port", 4600);
    connectToMongooose();
});
