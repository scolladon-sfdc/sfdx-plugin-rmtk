sfdx-plugin-rmtk
===============

Release Management Toolkit sfdx plugin

[![Version](https://img.shields.io/npm/v/sfdx-plugin-rmtk.svg)](https://npmjs.org/package/sfdx-plugin-rmtk)
[![CircleCI](https://circleci.com/gh/scolladon/sfdx-plugin-rmtk/tree/master.svg?style=shield)](https://circleci.com/gh/scolladon/sfdx-plugin-rmtk/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/scolladon/sfdx-plugin-rmtk?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-plugin-rmtk/branch/master)
[![Codecov](https://codecov.io/gh/scolladon/sfdx-plugin-rmtk/branch/master/graph/badge.svg)](https://codecov.io/gh/scolladon/sfdx-plugin-rmtk)
[![Greenkeeper](https://badges.greenkeeper.io/scolladon/sfdx-plugin-rmtk.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/scolladon/sfdx-plugin-rmtk/badge.svg)](https://snyk.io/test/github/scolladon/sfdx-plugin-rmtk)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-plugin-rmtk.svg)](https://npmjs.org/package/sfdx-plugin-rmtk)
[![License](https://img.shields.io/npm/l/sfdx-plugin-rmtk.svg)](https://github.com/scolladon/sfdx-plugin-rmtk/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-plugin-rmtk
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-plugin-rmtk/0.1.1 darwin-x64 node-v14.3.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx rmtk:branch:cleanup -m <directory> [-v <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-rmtkbranchcleanup--m-directory--v-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx rmtk:package:filter -p <filepath> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-rmtkpackagefilter--p-filepath---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx rmtk:package:prettify [-p <array>] [-f <array>] [-s <array>] [-l <filepath>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-rmtkpackageprettify--p-array--f-array--s-array--l-filepath---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx rmtk:package:validate -p <filepath> -m <filepath> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-rmtkpackagevalidate--p-filepath--m-filepath---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx rmtk:branch:cleanup -m <directory> [-v <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Delete profiles, empty pre-deploy folder, empty post-deploy-folder, reset package.xml and destructiveChanges.xml

```
USAGE
  $ sfdx rmtk:branch:cleanup -m <directory> [-v <number>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -m, --manifestfolder=manifestfolder                                               (required) Manifests folder path

  -v, --version=version                                                             [default: 48] API version in
                                                                                    package.xml

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/rmtk/branch/cleanup.js](https://github.com/scolladon-sfdc/sfdx-plugin-rmtk/blob/v0.1.1/lib/commands/rmtk/branch/cleanup.js)_

## `sfdx rmtk:package:filter -p <filepath> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

filter sources from a package.xml file for convert or deploy

```
USAGE
  $ sfdx rmtk:package:filter -p <filepath> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --package=package                                                             (required) package.xml file path to
                                                                                    filter source with

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/rmtk/package/filter.js](https://github.com/scolladon-sfdc/sfdx-plugin-rmtk/blob/v0.1.1/lib/commands/rmtk/package/filter.js)_

## `sfdx rmtk:package:prettify [-p <array>] [-f <array>] [-s <array>] [-l <filepath>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

reorder element and fix indentation in package.xml and destructiveChanges.xml files

```
USAGE
  $ sfdx rmtk:package:prettify [-p <array>] [-f <array>] [-s <array>] [-l <filepath>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -f, --profiles=profiles                                                           list of profiles file path separated
                                                                                    by ':'

  -l, --labels=labels                                                               Custom Labels filepath

  -p, --packages=packages                                                           list of packages (package and
                                                                                    destructive) file path separated by
                                                                                    ':'

  -s, --permission-sets=permission-sets                                             list of permission sets file path
                                                                                    separated by ':'

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/rmtk/package/prettify.js](https://github.com/scolladon-sfdc/sfdx-plugin-rmtk/blob/v0.1.1/lib/commands/rmtk/package/prettify.js)_

## `sfdx rmtk:package:validate -p <filepath> -m <filepath> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

validate package.xml element are in the sources

```
USAGE
  $ sfdx rmtk:package:validate -p <filepath> -m <filepath> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -m, --metadata-describe=metadata-describe                                         (required) metadata-describe.json
                                                                                    file path to validate package with

  -p, --package=package                                                             (required) package.xml file path to
                                                                                    validate package with

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/rmtk/package/validate.js](https://github.com/scolladon-sfdc/sfdx-plugin-rmtk/blob/v0.1.1/lib/commands/rmtk/package/validate.js)_
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
