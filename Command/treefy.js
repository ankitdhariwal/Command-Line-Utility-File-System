const fs = require("fs");
const path = require("path");

module.exports.treefy = function(){
    let src = arguments[0];   // file / directory will be read.
    let dest = arguments[1];  // dest where ty
    let metaPath = path.join(src,"metadata.json");
    let root     = JSON.parse(fs.readFileSync(metaPath));
    treefyUtil(src,dest,root);
    console.log("Treefy is Implemented");
}

function treefyUtil(src,dest,node){

    if(node.isFile){
       let srcFilePath  = path.join(src,node.newname);
       let destFilePath = path.join(dest,node.originalname);
       fs.copyFileSync(srcFilePath, destFilePath);
       console.log(`file copied from ${srcFilePath} to ${destFilePath}`);
    } 
    else{
        let dirName = node.name;
        let currDirPath = path.join(dest,dirName);
        if (!fs.existsSync(currDirPath) ){
            fs.mkdirSync(currDirPath);
            console.log(`Directory created at ${currDirPath}`);
        } 
        for(let i=0;i<node.children.length;i++){
            let child = node.children[i];
            // Now for all children of the node.
            treefyUtil(src , currDirPath , child);
        }
    }
}
