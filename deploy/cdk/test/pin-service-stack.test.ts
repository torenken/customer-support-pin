import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PinServiceStack } from '../src/pin-service-stack';

test('PinServiceStackSnapshot', () => {
  const app = new App({
    context: {
      'aws:cdk:bundling-stacks': ['NoStack'], //disable bundling lambda (asset), by using dummy stack-name (=> reduce the unit-test-time. jest-booster)
      '@aws-cdk/core:newStyleStackSynthesis': 'true',
    },
  });

  const stack = new PinServiceStack(app, 'PinServiceStack', {
    stageCfg: {
      account: '123456123456',
    },
  });

  const template = Template.fromStack(stack);

  //snapshot
  expect(template.toJSON()).toMatchSnapshot();
});
