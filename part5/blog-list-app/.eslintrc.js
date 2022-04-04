module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'jest/globals': true,
        'cypress/globals': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react', 'jest', 'cypress'
    ],
    'rules': {
        'react/react-in-jsx-scope': 0,
        'react/prop-types': 0,
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error'
    }
}
