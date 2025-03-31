import { Stack, StackProps } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { AwsCredentials, GitHubWorkflow } from 'cdk-pipelines-github';
import { Construct } from 'constructs';
import { PipelineCfg, Stage, StageCfg, StageName } from '../pin-service-cfg';
import { PinServiceStage } from '../pin-service-stage';

export interface PinServicePipelineProps extends StackProps {
  readonly pipelineCfg: PipelineCfg;
  readonly stageCfg: { [key in StageName]: StageCfg };
}

export class PinServicePipeline extends Stack {
  constructor(scope: Construct, id: string, props: PinServicePipelineProps) {
    super(scope, id, props);

    const pipeline = new GitHubWorkflow(this, 'Pipeline', {
      workflowName: 'CDK Business Apps Deploy',
      workflowPath: '../../.github/workflows/deploy.yml',
      publishAssetsAuthRegion: 'eu-central-1',
      preBuildSteps: [{
        uses: 'pnpm/action-setup@v4',
        with: {
          version: '10',
        },
      },
      {
        uses: 'actions/setup-go@v5',
        with: {
          'go-version': '1.24.1',
        },
      }],
      synth: new ShellStep('Build', {
        commands: [
          'cd deploy/cdk',
          'pnpm install --frozen-lockfile',
          'pnpm cdk synth',
          'mv cdk.out ../../cdk.out/',
        ],
      }),
      awsCreds: AwsCredentials.fromOpenIdConnect({
        gitHubActionRoleArn: props.pipelineCfg.gitHubActionRoleArn,
      }),
    });

    // --- development
    const devStageCfg = props.stageCfg[Stage.Dev];
    const devStage = new PinServiceStage(this, 'Dev', {
      stageCfg: devStageCfg,
      env: {
        account: devStageCfg.account,
        region: 'eu-central-1',
      },
    });
    pipeline.addStage(devStage);

    // --- productive
    const prodStageCfg = props.stageCfg[Stage.Prod];
    const prodStage = new PinServiceStage(this, 'Prod', {
      stageCfg: prodStageCfg,
      env: {
        account: prodStageCfg.account,
        region: 'eu-central-1',
      },
    });
    pipeline.addStageWithGitHubOptions(prodStage, {
      gitHubEnvironment: {
        name: 'production',
      },
    });

    pipeline.buildPipeline();
  }
}
