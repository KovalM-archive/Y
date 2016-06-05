function run(source) {
    var parsObject = new Function(parser.parse(source))();

    if ("main" in parsObject.functionsMap) {
        parsObject.functionsMap.main();
        if (parsObject.logicErrors.error) {
            console.log("Errors: " + parsObject.logicErrors.messages);
        }
    } else {
        console.log("Main function not found");
    }
}