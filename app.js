let {view} = require("./Command/view");
let {treefy} = require("./Command/treefy");
let {untreefy} = require("./Command/untreefy");
let {help} = require("./Command/help");

let cmd = process.argv[2];
// Linux based Utility
switch(cmd){

    case "view":
        view(process.argv[3],process.argv[4]);
        break;
    
    case "treefy":
        treefy(process.argv[3],process.argv[4]);
        break;
        
    case "untreefy":
        untreefy(process.argv[3],process.argv[4]);
        break;
    
    case "help":
        help(process.argv[3],process.argv[4]);
        break;

    default:
        console.log("Wrong Command");
        break;
}