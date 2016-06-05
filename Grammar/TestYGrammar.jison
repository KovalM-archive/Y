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
        {$$ = y.function_definition({name: $2, defParameters: $4, functionBody: $7})}
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
    ;

variable_definition
    : graph_definition
        {$$ = $1}
    ;

graph_definition
    : GRAPH variable_name
        {$$ = y.declareGraphVar($2);}
    | GRAPH variable_name '='
    ;

variable_name
    : ID
        {$$ = $1}
    ;