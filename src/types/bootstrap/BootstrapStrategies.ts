import { BootstrapStrategyType } from './BootstrapStrategyType';

export type BootstrapStrategy = BootstrapImplicitStrategy | BootstrapExplicitStrategy;


export interface BootstrapImplicitStrategy {
  readonly type: BootstrapStrategyType.Implicit;
}


export interface BootstrapExplicitStrategy {
  readonly type: BootstrapStrategyType.Explicit;
  readonly methodName: string;
  readonly methodArgs: any[];
}
