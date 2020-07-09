const fs = require("fs");
const uniqid = require('uniqid');
const path = require("path");

module.exports.untreefy = function(){
    let src = arguments[0];
    let dest = arguments[1];
    let root = {};
    untreefyUtil(src,dest,root);
    fs.writeFileSync(`${dest}/metadata.json`, JSON.stringify(root));
    // metadata.json Will contain the structure of the file tree.
    // untreefy is like compression.
    // node pbc untreefy "path" "store all files at any depth in src with filename will be rechange".
    // f1.txt = data is copied to ./dest/newFileName.
    // f2.txt = data is copied to ./dest/newFileName.
    // f3.txt = data is copied to ./dest/newFileName.
    console.log("untreefy is Implemented");
}

function untreefyUtil(src,dest,node){

    let isFile = fs.lstatSync(src).isFile();
    
    if(isFile){

        let newFileName = uniqid();
        let destPath  =  path.join(dest,newFileName);
        fs.copyFileSync(src , destPath);
        console.log("File is copied "+ src +" to "+ destPath);
        node.isFile = true;
        node.originalname = path.basename(src);
        node.newname = newFileName;
        //console.log(src+"*");
    }
    else{
        //console.log(src);
        let content = fs.readdirSync(src);
        node.isFile = false;
        node.name = path.basename(src);
        node.children = [];

        for(let i=0;i<content.length;i++){
            let child = content[i];
            let cPath = path.join(src,child);
            let chObj = {};
            untreefyUtil(cPath,dest,chObj);
            node.children.push(chObj);
        }
    }
}