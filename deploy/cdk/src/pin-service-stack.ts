import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StageCfg } from './pin-service-cfg';
import { PinServiceHandler } from './pin-service-handler';

export interface PinServiceStackProps extends StackProps {
  readonly stageCfg: StageCfg;
}

export class PinServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: PinServiceStackProps ) {
    super(scope, id, props);

    // define resources here...

    new PinServiceHandler(this, 'AddMoreHere', {
      serviceName: 'add-more-here',
      environment: {},
    });
  }
}
