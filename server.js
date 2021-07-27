import express from "express";                                            //Import express, path, and morgan into server.js
import path from "path";
import morgan from "morgan";


//Create at least 3 “GET” routes and use res.sendFile() to send 3 different html pages to the client, depending on the route requested

const app = express();

app.use(morgan("short"))
app.use(express.static (path.join(process.cwd(), "public")));

app.get("/", (request,response, next) =>                                                //first get rout
{
    try{
        response.sendFile(path.join(process.cwd(), "/public/index.html"));             //if success 200response
    } catch(erro) {                                                                     //if error
        next(error)
    }
});

app.get("/about", (request,response, next) =>                                           //second get rout
{
    try{
        response.sendFile(path.join(process.cwd(), "/public/about.html"));
    } catch(erro) {
        next(error)
    }
});

app.get("/moreinfo", (request,response, next) =>                                        //third get rout
{
    try{
        response.sendFile(path.join(process.cwd(),"/public/moreinfo.html"));
    } catch(erro) {
        next(error)
    }
});

//-Account for server errors with a custom error handler
app.use((error, request, response, next) =>
{
    response.status(error.status || 500).json ({ 
        ...error, 
        serverMsg: "There was an error on this server.",
    request: {path: request.path, method: request.method},
    });
});

app.listen(3000, () => console.log ("Server is funning on port 3000 . ."));
