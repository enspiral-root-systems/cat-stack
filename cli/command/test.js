const nest = require('depnest')

const DEFAULT_PATTERNS = '**/*.test.js'
const DEFAULT_IGNORE = [
  'coverage/**',
  'node_modules/**',
  'vendor/**'
]

module.exports = {
  gives: nest('cli.command'),
  needs: nest('config.all', 'first'),
  create: (api) => nest('cli.command', () => ({
    name: 'test',
    options: [{}],
    command: (args) => {
      const deglob = require('deglob')
      const test = require('pull-test/cli')
      const { cwd } = api.config.all()
      const paths = args._
      if (paths.length === 0) {
        deglob(DEFAULT_PATTERNS, {
          cwd,
          ignore: DEFAULT_IGNORE
        }, (err, paths) => {
          if (err) throw err
          test({ cwd, paths })
        })
      } else {
        test({ cwd, paths })
      }
    }
  }))
}
