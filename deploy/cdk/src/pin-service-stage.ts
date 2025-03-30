import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StageCfg, validateStageCfg } from './pin-service-cfg';
import { PinServiceStack } from './pin-service-stack';

export interface PinServiceStageProps extends StageProps {
  readonly stageCfg: StageCfg;
}

export class PinServiceStage extends Stage {
  constructor(scope: Construct, id: string, props: PinServiceStageProps) {
    super(scope, id, props);

    new PinServiceStack(this, 'PinService', {
      stageCfg: props.stageCfg,
    });

    this.node.addValidation(validateStageCfg(props.stageCfg));
  }
}
