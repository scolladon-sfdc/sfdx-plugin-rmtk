sfdx-plugin-psa
===============

sfdx plugin for PSA project

[![Version](https://img.shields.io/npm/v/sfdx-plugin-psa.svg)](https://npmjs.org/package/sfdx-plugin-psa)
[![CircleCI](https://circleci.com/gh/scolladon/sfdx-plugin-psa/tree/master.svg?style=shield)](https://circleci.com/gh/scolladon/sfdx-plugin-psa/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/scolladon/sfdx-plugin-psa?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-plugin-psa/branch/master)
[![Codecov](https://codecov.io/gh/scolladon/sfdx-plugin-psa/branch/master/graph/badge.svg)](https://codecov.io/gh/scolladon/sfdx-plugin-psa)
[![Greenkeeper](https://badges.greenkeeper.io/scolladon/sfdx-plugin-psa.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/scolladon/sfdx-plugin-psa/badge.svg)](https://snyk.io/test/github/scolladon/sfdx-plugin-psa)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-plugin-psa.svg)](https://npmjs.org/package/sfdx-plugin-psa)
[![License](https://img.shields.io/npm/l/sfdx-plugin-psa.svg)](https://github.com/scolladon/sfdx-plugin-psa/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-plugin-psa
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-plugin-psa/0.0.2 darwin-x64 node-v10.16.3
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx package:lint [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-packagelint---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx psa:branch:cleanup -m <directory> [-v <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-psabranchcleanup--m-directory--v-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx psa:package:filter [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-psapackagefilter---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx psa:package:prettify [-p <array>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-psapackageprettify--p-array---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx psa:package:validate [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-psapackagevalidate---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx package:lint [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

reorder element and fix indentation in package.xml and destructiveChanges.xml files

```
USAGE
  $ sfdx package:lint [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/package/lint.js](https://github.com/scolladon-sfdc/sfdx-plugin-psa/blob/v0.0.2/lib/commands/package/lint.js)_

## `sfdx psa:branch:cleanup -m <directory> [-v <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Delete profiles, empty pre-deploy folder, empty post-deploy-folder, reset package.xml and destructiveChanges.xml

```
USAGE
  $ sfdx psa:branch:cleanup -m <directory> [-v <number>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -m, --manifestfolder=manifestfolder                                               (required) Manifests folder path

  -v, --version=version                                                             [default: 48] API version in
                                                                                    package.xml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/psa/branch/cleanup.js](https://github.com/scolladon-sfdc/sfdx-plugin-psa/blob/v0.0.2/lib/commands/psa/branch/cleanup.js)_

## `sfdx psa:package:filter [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

remove every component not listed in the package

```
USAGE
  $ sfdx psa:package:filter [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/psa/package/filter.js](https://github.com/scolladon-sfdc/sfdx-plugin-psa/blob/v0.0.2/lib/commands/psa/package/filter.js)_

## `sfdx psa:package:prettify [-p <array>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Prettify and sort package.xml

```
USAGE
  $ sfdx psa:package:prettify [-p <array>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --packages=packages                                                           list of packages (package and
                                                                                    destructive) file path

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/psa/package/prettify.js](https://github.com/scolladon-sfdc/sfdx-plugin-psa/blob/v0.0.2/lib/commands/psa/package/prettify.js)_

## `sfdx psa:package:validate [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

validate package.xml element are in the sources

```
USAGE
  $ sfdx psa:package:validate [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/psa/package/validate.js](https://github.com/scolladon-sfdc/sfdx-plugin-psa/blob/v0.0.2/lib/commands/psa/package/validate.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
