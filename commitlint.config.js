const scopes = ['example', 'core', 'vue3', 'react', 'docs', 'other']

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scopes],
    'scope-case': [2, 'always', 'lower-case'],

    'body-leading-blank': [1, 'always'],

    'footer-leading-blank': [1, 'always'],

    'header-max-length': [2, 'always', 72],

    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],

    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // fix a bug
        'docs', // docs change
        'style', // formatting, missing semi-colons, etc
        'refactor', // refactor code
        'perf', // performance improvements
        'test', // test cases, unit tests
        'build', // build system changes
        'ci', // CI changes
        'revert', // revert commit
        'chore', // miscellaneous changes
        'release' // release changes
      ]
    ]
  },
  prompt: {
    defaultScope: 'core',
    customScopesAlign: 'bottom',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false
  }
}
