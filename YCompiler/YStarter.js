function run(source){
    var parsObject = new Function(parser.parse(source))();
    if (parsObject.logicErrors.error){
        console.log(parsObject.logicErrors.message)
    } else{
        if ("main" in parsObject.functionsMap){
            parsObject.functionsMap.main();
        } else{
            console.log("Main function not found");
        }
    }
}