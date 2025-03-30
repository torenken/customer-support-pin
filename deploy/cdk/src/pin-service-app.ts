import { App, Tags } from 'aws-cdk-lib';
import { PipelineCfg, validatePipelineCfg, StageCfg, StageName } from './pin-service-cfg';
import { PinServicePipeline } from './pipeline/pin-service-pipeline';

const app = new App();

Tags.of(app).add('owner', 'customer-support-team');

const stageCfg = app.node.tryGetContext('stageConfig') as { [key in StageName]: StageCfg };
const pipelineCfg = app.node.tryGetContext('pipelineCfg') as PipelineCfg;

new PinServicePipeline(app, 'PinServicePipeline', {
  pipelineCfg,
  stageCfg,
  env: {
    account: pipelineCfg.account,
    region: 'eu-central-1',
  },
});

app.synth();

app.node.addValidation(validatePipelineCfg(pipelineCfg));
