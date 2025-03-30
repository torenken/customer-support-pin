## PinService 🌟

[![Cookiecutter Project CI](https://github.com/torenken/customer-support-pin/actions/workflows/ci.yml/badge.svg)](https://github.com/torenken/customer-support-pin/actions/workflows/ci.yml)
[![Built with Cookiecutter](https://img.shields.io/badge/built%20with-Cookiecutter-ff69b4.svg?logo=cookiecutter)](https://github.com/torenken/customer-support-pin/)
![GitHub](https://img.shields.io/badge/license-MIT-blue)

### Purpose
> What problem does the project solve and why does the project exist? Short description in a few sentences.

### Features ✨

- ...

## Project structure
The project contains of source code and files for a serverless application that can be deployed via AWS CDK.
See [deploy/cdk/README.md](deploy/cdk/README.md) for build of the AWS CDK project.

| Folder                                         | Description                                                     |
|------------------------------------------------|:----------------------------------------------------------------|
| customer-support-pin                  | Root folder for building, testing, etc.                         |
| customer-support-pin/**api/services** | Contains the handlers for the implemented serverless functions. |
| customer-support-pin/**deploy**       | Contains the AWS CDK stack and needed scripts for deployment.   |
| customer-support-pin/**doc**          | Contains the specification and documentation.                   |

### Getting Started 🏁

#### Prerequisites

- **Node.js LTS & PnPm**: Essential for managing and running JavaScript packages.
- **Golang 1.24**: Essential for managing and running Golang business logic.

#### Installing dependencies & building the target
The used build management tool is Make, all Make commands are executed in the root folder.

##### Installing build tools (initial)
Before build, some go tools must be installed.
```shell
$ make dev-gotooling
```

##### Building the target
Complete Build of Golang project via Makefile
```shell
$ make
```

### Test execution
#### Unit tests, vulnerabilities, fast linters runner
Execute the unit tests
```shell
$ make test-all
```
