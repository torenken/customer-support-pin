import { IValidation } from 'constructs';
import { z } from 'zod';

const accountSchema = z.string()
  .regex(/^\d+$/, { message: 'Amazon account number must be numeric' })
  .length(12, { message: 'Amazon account number be exactly 12 characters long' });

// ==============================================================================
// Stage Cfg

export declare type StageName = Stage.Dev | Stage.Prod

export enum Stage {
  Dev = 'dev',
  Prod = 'prod',
}

const stageCfgSchema = z.object({
  account: accountSchema,
});

export type StageCfg = z.infer<typeof stageCfgSchema>

export const validateStageCfg = (cfg: StageCfg): IValidation => {
  return new class implements IValidation {
    validate(): string[] {
      const messages: string[] = [];
      const result = stageCfgSchema.safeParse(cfg);
      if (!result.success) {
        messages.push(result.error.message);
      }
      return messages;
    }
  };
};

// ==============================================================================
// Pipeline Cfg

const pipelineCfgSchema = z.object({
  account: accountSchema,
  gitHubActionRoleArn: z.string(),
});

export type PipelineCfg = z.infer<typeof pipelineCfgSchema>

export const validatePipelineCfg = (cfg: PipelineCfg): IValidation => {
  return new class implements IValidation {
    validate(): string[] {
      const messages: string[] = [];
      const result = pipelineCfgSchema.safeParse(cfg);
      if (!result.success) {
        messages.push(result.error.message);
      }
      return messages;
    }
  };
};