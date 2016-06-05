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
    },
    assign: function(firstVar, secondVar){
        var result = "if (" + firstVar + ".varType == "+ secondVar + ".varType){" +
            + firstVar + "=" + secondVar + ";}else{" +errorMessages.ERROR_ADDITIONAL + errorMessages.BAD_ASSIGN +";}";
        return result;
    },
    createEdge: function(start, finish){
        var result = yUtils.checkForType(start, "vertex") +
            yUtils.checkForType(finish, "vertex") +
            yUtils.createEdge(start, finish);
        return result;
    }
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
            errorMessages.ERROR_ADDITIONAL + errorMessages.BAD_ASSIGN + ";}";
        }
        return result;
    },
    checkForType: function(varName, type) {
        var result = "if (!(" + varName + ".varType == " + type + ")){" +
            errorMessages.ERROR_ADDITIONAL + "\"" + type +"\": " + errorMessages.INVALID_TYPE + ";}";

        return result;
    },
    createEdge: function(start, finish){}

};

var errorMessages = {
    BAD_ASSIGN: '\"You are trying to assign a value to a variable of another type&\"',
    ERROR_ADDITIONAL: 'namespace.logicErrors.error=true; namespace.logicErrors.messages+=',
    INVALID_TYPE: '\"not valid operation for this type\"'
};

var yConstants = {
    EMPTY_GRAPH: "{varType: 'graph', vertexes: [], edges: [], numberVertexes: 0, numberEdges: 0}",
    EMPTY_VERTEX: "{varType: 'vertex', inVertexNeighbors: [], outVertexNeighbors: [], inEdgeNeighbors: [], outEdgeNeighbors: [], value: 0}",
    EMPTY_EDGE: "{varType: 'edge', startVertex: null, finishVertex: null, value: 1}"
};
