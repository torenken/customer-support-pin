import * as path from 'path';
import { GoFunction } from '@aws-cdk/aws-lambda-go-alpha';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface PinServiceHandlerProps{
  readonly serviceName: string;
  readonly environment: Record<string, string>;
}

export class PinServiceHandler extends GoFunction {
  constructor(scope: Construct, id: string, props: PinServiceHandlerProps) {
    super(scope, id, {
      entry: path.join(__dirname, `../../../api/services/${props.serviceName}`),
      functionName: `pin-service-${props.serviceName}`,

      memorySize: 1024,
      architecture: Architecture.ARM_64,
      runtime: Runtime.PROVIDED_AL2023,

      bundling: {
        goBuildFlags: ['-ldflags "-s -w"'],
        cgoEnabled: false,
      },
      environment: {
        ...props.environment,
      },
    });
  }
}
