var y = {
    program: function(expressions) {
        var result = "var namespace = {functionsMap: {}, globalVariables: {}, logicErrors: {error: false, messages: \"\"}};" +
            expressions +
            " return namespace;";
        console.log(result);
        return result;
        //return "var functionsMap = {}; var logicErrors = {}; " + expressions + "; return functionsMap;";
    },
    functionDefinition: function(functionMap) {
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
    declareGraphVar: function(varName, assignVar){
        return yUtils.assignVariables(varName, assignVar, "\'graph\'", yConstants.EMPTY_GRAPH);
    },
    declareVertexVar: function(varName, assignVar){
        return yUtils.assignVariables(varName, assignVar, "\'vertex\'", yConstants.EMPTY_VERTEX);
    },
    declareEdgeVar: function(varName, assignVar){
        return yUtils.assignVariables(varName, assignVar, "\'edge\'", yConstants.EMPTY_EDGE);
    }
};

var errorMessages = {
    badAssign: '\"You are trying to assign a value to a variable of another type&\"'
};

var yUtils = {
    assignVariables: function(varName, assignVar, type, emptyEntity){
        var result;
        result = "var " + varName + ";";
        if (assignVar == null){
            result += varName + "=" + emptyEntity;
        } else {
            result += "if (" + assignVar+".varType == " + type + "){" +
            varName+"=" + assignVar +";" +
            "} else {" + varName + "=" + emptyEntity + ";" +
            "namespace.logicErrors.error=true; namespace.logicErrors.messages+=" + errorMessages.badAssign + "}";
        }
        return result;
    }
};

var yConstants = {
    EMPTY_GRAPH: "{varType: 'graph', vertexes: [], edges: [], numberVertexes: 0, numberEdges: 0}",
    EMPTY_VERTEX: "{varType: 'vertex', inVertexNeighbors: [], outVertexNeighbors: [], inEdgeNeighbors: [], outEdgeNeighbors: [], value: 0}",
    EMPTY_EDGE: "{varType: 'edge', startVertex: null, finishVertex: null, value: 1}"
};
