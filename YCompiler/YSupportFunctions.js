var y = {
    program: function(expressions) {
        return "var functionsMap = {}; var logicErrors = {}; " + expressions + "; return functionsMap;";
        console.log("var functionsMap = {}; var logicErrors = {}; " + expressions + "; return functionsMap;");
    },
    function_definition: function(functionMap) {
        var result = "functionsMap."+ functionMap.name + " = function(" + functionMap.defParameters + "){";
        result += "" + functionMap.functionBody;
        result += "return 0;};";
        console.log(result);
        return result;
    },
    parameters: function() {
        var parametersString = "";
        for(var i = 0; i < arguments.length; i++)
            parametersString += arguments[i] + ", ";
        parametersString = parametersString.slice(0, parametersString.length - 2);
        console.log(parametersString);
        return parametersString;
    },
    expression: function(expression) {
        console.log(expression + ";");
        return expression + ";";
    },
    declareGraphVar: function(varName){
        console.log("var " + varName + ";");
        return "var " + varName + ";";
    },


    variable: function(name) {
        return "variables." + name;
    },
    assign: function(options) {
        return options.variable + " = " + options.value;
    },
    condition: function(options) {
        return "if (" + options.if +") {" + options.then + "} else {" + options.else + "}";
    },
    graph: function(definition) {
        return "(function() {var _tmp = {nodes:{}, arcs:{}}; " + definition + "; return _tmp;})()";
    },
    node: function(name) {
        return "_variables." + name + " = {name: '" + name + "'}; _tmp.nodes." + name + " = _variables." + name + ";";
    },
    arc: function(options) {
        var arc = "";
        arc += t.node(options.source);
        arc += t.node(options.target);
        arc += "_variables." + options.name + " = {source: _variables." + options.source + ", target: _variables." + options.target + ", name: '" + options.name + "'}; _tmp.arcs." + options.name + " = _variables." + options.name;
        return arc;
    },
    operator: function(options) {
        return "Operators." + options.name + "(" + options.parameters + ")";
    },
    iterator: function(options) {
        return "Iterators." + options.name + "(" + options.parameters + ", function(" + options.iterable + ") {var _variables = {}; _variables." + options.iterable + " = " + options.iterable + "; " + options.body + "})";
    },
    function: function(options) {
        return options.name + "(" + options.parameters + ")";
    },
    //TODO remove a hack
    functionDefinition: function(options) {
        var splitted = options.parameters.split(",");
        var definition = "var _variables = {}; ";
        if (splitted[0] != "") {
            for(var i = 0; i < splitted.length; i++)
                definition += "_variables." + splitted[i] + " = " + splitted[i] + "; ";
        }
        return "(function(" + options.parameters + ") {" + definition + options.body + "; return " + options.return + "})";
    }

}