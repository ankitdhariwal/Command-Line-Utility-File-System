const path = require('path');
const fs = require("fs");

// node pbc.js view "path" -t
// node pbc.js view "path" -f

module.exports.view = function(){
    let src = arguments[0];    // arguments array > at function call no of arguments are passed.
    let dest = arguments[1];
     
    if(dest == '-t'){
        viewAsTree(src," ");
        console.log("View as Tree is Implemented");
    }
    else if(dest == '-f'){
        viewAsFlatFile(src);
        console.log("View as File is Implemented");
    }
    else{
        console.log("WRONG ARGUMENT");
    }
}


function viewAsTree(src , psf){

    let isFile = fs.lstatSync(src).isFile();
    
    if(isFile){
        console.log(psf + path.basename(src) + "*");
    }
    else{
        console.log(psf + path.basename(src));
        let content = fs.readdirSync(src);
    
        for(let i=0;i<content.length;i++){
            let child = content[i];
            let cPath = path.join(src , child);
            viewAsTree(cPath,psf+"\t");   // psf is for providing the space between the file.
        }
    }
}

function viewAsFlatFile(src){

    let isFile = fs.lstatSync(src).isFile();
    
    if(isFile){
        console.log(src+ "*");
    }
    else{
        console.log(src);
        let content = fs.readdirSync(src);

        for(let i=0;i<content.length;i++){
            let child = content[i];
            let cPath = path.join(src,child);
            viewAsFlatFile(cPath);
        }
    }
}

