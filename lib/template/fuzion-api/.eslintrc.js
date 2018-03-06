module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "rules": {
		//indentation
		"no-tabs": [0],
		"no-mixed-spaces-and-tabs": 2,
		"indent": [ 2, "tab", { 
			"SwitchCase": 1, 
			"MemberExpression": 1,
			"FunctionDeclaration": {"body": 1},
			"FunctionExpression": {"body": 1}
		}],
		
		//line-breaks
		"linebreak-style": [0, "unix"],

		//spacing
		"function-paren-newline": 0,
        "space-in-parens": [ 0, "always" ],
        "template-curly-spacing": [ 0, "always" ],
        "array-bracket-spacing": [ 0, "always" ],
        "object-curly-spacing": [ 0, "always" ],
        "computed-property-spacing": [ 0, "always" ],
		"no-multiple-empty-lines": [ 1, { "max": 1, "maxEOF": 0, "maxBOF": 0 } ],
		"no-trailing-spaces": 1,

		"one-var": 1,
		"eol-last": 1,
		"no-shadow": 1,
		"object-shorthand": 0,
		"object-curly-newline": 1,
		"global-require": 0,
		"no-case-declarations": 0,
		"no-confusing-arrow": 0,
		"no-restricted-globals": 0,
		"no-unused-vars": 1,
		"class-methods-use-this": 0,
		"arrow-parens": 0,
		"arrow-body-style": 1,
		"no-useless-constructor": 1,
		"import/no-mutable-exports": 1,
		"import/first": 0,

		//dangling commas
		"comma-dangle": 0,
		
		//comments
		"spaced-comment": 0,

        //strings
        "quotes": [ 2, "double", "avoid-escape" ],

        //code arrangement matter
        "no-use-before-define": [ 2, { "functions": false } ],
        
        //const vs let
        "prefer-const": 0,
        
        //keep it simple
        "complexity": [ 1, 5 ],
    }
};