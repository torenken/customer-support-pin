## PinService CDK Project 🌟

This is the AWS CDK project creating the infrastructure needed for PinService.

### Getting Started 🏁

#### Prerequisites
- [AWS CDK bootstrapping](doc/bootstrap.md): To preparing your AWS environment.
- [Node.js 22.x](https://nodejs.org/en/download/) & [PnPm - Package Manager](https://pnpm.io/): Essential for managing and running JavaScript packages.

#### Installing dependencies & building the target
The used build management tool is PnPm, all commands are executed in the `/deploy/cdk` folder.

```shell
pnpm install
pnpm build
```

#### Changing CDK configurations
The change of CDK configurations is possible in the Projen files, e.g.: *.projenrc.ts*.
After that, rebuild the project with:
```shell
pnpm build
```

#### Quality Assurance and Tests 🧐
Execute the tests separately:
```bash
pnpm test
```

#### Audit of dependencies
Execute an dependency audit:
```shell
pnpm audit:check
```