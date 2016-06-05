var y = {
    program: function(expressions) {
        var result = "var namespace = {functionsMap: {}, globalVariables: {}, logicErrors: {error: false, message: \"\"}};" +
            expressions +
            " return namespace;";
        console.log(result);
        return result;
        //return "var functionsMap = {}; var logicErrors = {}; " + expressions + "; return functionsMap;";
    },
    function_definition: function(functionMap) {
        var result = "namespace.functionsMap."+ functionMap.name + " = function(" + functionMap.defParameters + "){";
        result += "" + functionMap.functionBody + "};";
        return result;
    },
    parameters: function() {
        var parametersString = "";
        for(var i = 0; i < arguments.length; i++)
            parametersString += arguments[i] + ", ";
        parametersString = parametersString.slice(0, parametersString.length - 2);
        return parametersString;
    },
    expression: function(expression) {
        return expression + ";";
    },
    declareGraphVar: function(varName){
        return "var " + varName;
    }
};

var errorMessages = {
    badAssign: "You are trying to assign a value to a variable of another type\n"
};