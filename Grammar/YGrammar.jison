%lex

%%
\s+                   /* skip whitespace */
\n                    return ';'
";"                   return ';';
"="                   return '=';
"+"                   return '+';
"-"                   return '-';
"*"                   return '*';
"/"                   return '/';
">"                   return '>';
"("                   return '(';
")"                   return ')';
","                   return ',';
"if"                  return 'IF';
"return"              return 'RETURN';
"?"                   return 'THEN';
":"                   return 'ELSE';
"function"            return 'FUNCTION';
"graph"               return 'GRAPH';
"vertex"              return 'VERTEX';
"edge"                return 'EDGE';
"print"               return 'PRINT';
"{"                   return '{';
"}"                   return '}';
"if"                  return 'if';
"["                   return '[';
"]"                   return ']';
[A-Za-z0-9]+\b        return 'ID';
<<EOF>>               return 'EOF';

/lex

%start program

%% /* language grammar */

program
    : expressions EOF
        {return y.program($1);}
    ;

expressions
    : ' '
        {$$ = ''}
    | function_definition ';' expressions
        {$$ = $1 + $3;}
    ;

function_definition
    : FUNCTION function_name '(' parameters_definition ')' '{' functionBody '}'
        {$$ = y.functionDefinition({name: $2, defParameters: $4, functionBody: $7})}
    ;

function_name
    : ID
        {$$ = $1}
    ;

parameters_definition
    : ' '
        {$$ = ''}
    | ID
        {$$ = y.parameters($1)}
    | ID ',' parameters_definition
        {$$ = y.parameters($1, $3)}
    ;

functionBody
    : ' '
        {$$ = ''}
    | expression ';' functionBody
        {$$ = y.expression($1) + $3;}
    ;

expression
    : variable_definition
        {$$ = $1;}
    | function_call
        {$$ = $1;}
    ;

variable_definition
    : graph_definition
        {$$ = $1}
    | vertex_definition
        {$$ = $1}
    | edge_definition
        {$$ = $1}
    ;

graph_definition
    : GRAPH variable_name
        {$$ = y.declareGraphVar($2);}
    | GRAPH variable_name '=' assign_expression
              {$$ = y.declareGraphVar($2, $4)}
    ;

vertex_definition
    : VERTEX variable_name
        {$$ = y.declareVertexVar($2);}
    | VERTEX variable_name '=' assign_expression
              {$$ = y.declareVertexVar($2, $4)}
    ;

edge_definition
    : EDGE variable_name
        {$$ = y.declareEdgeVar($2);}
    | EDGE variable_name '=' assign_expression
              {$$ = y.declareEdgeVar($2, $4)}
    ;

variable_name
    : ID
        {$$ = $1}
    ;

assign_expression
    : variable_name
        {$$ = $1}
    ;




return_expression
    : variable_name
        {$$ = $1}
    | function_call
        {$$ = $1}
    | graph
        {$$ = $1}
    ;

variable_definition
    : graph variable_name '=' return_expression
        {$$ = y.assign({variable: $2, value: $4})}
    | vertex variable_name '=' return_return_expression
    ;

graph
    : '[' list_of_elements ']'
        {$$ = t.graph($2);}
    ;

list_of_elements
    : ' '
        {$$ = ''}
    | element ';' list_of_elements
        {$$ = t.expression($1) + $3;}
    ;

element 
    : node
        {$$ = t.node($1)}
    | arc
        {$$ = $1}
    ;

vertex
    : ID
        {$$ = $1}
    ;

edge
    : node '->' node
        {$$ = t.arc({name: $3, source: $1, target: $5});}
    ;

parameters
    : ' '
        {$$ = ''}
    | parameter
        {$$ = t.parameters($1)}
    | parameter ',' parameters
        {$$ = t.parameters($1, $3)}
    ;

parameter
    : return_expression
        {$$ = $1}
    ;

condition
    : IF '(' return_expression ')' '{' THEN expressions ELSE expressions '}'
        {$$ = t.condition({if: $3, then: $7, else: $9})}
    ;

iterator
    : iterator_name '(' parameters ')' ':' iterable '{' expressions '}'
        {$$ = t.iterator({name: $1, parameters: $3, iterable: $6, body: $8})}
    ;

iterable
    : ID
        {$$ = $1}
    ;

iterator_name
    : RELATED
        {$$ = $1}
    | NODES
        {$$ = $1}
    ;

operator
    : operator_name '(' parameters ')'
        {$$ = t.operator({name: $1, parameters: $3})}
    ;

operator_name
    : GOMEOMORPHIC
        {$$ = $1}
    | PRINT
        {$$ = $1}
    ;

function_definition
    : '(' parameters_definition ')' '{' expressions RETURN return_expression '}'
        {$$ = t.functionDefinition({parameters: $2, body: $5, return: $7})}
    ;

parameters_definition
    : ' '
        {$$ = ''}
    | ID
        {$$ = t.parameters($1)}
    | ID ',' parameters_definition
        {$$ = t.parameters($1, $3)}
    ;
