import { CreationStrategyType } from './CreationStrategyType';

export type CreationStrategy =
  CreationClassInstanceStrategy
  | CreationClassStrategy
  | CreationFactoryFunctionStrategy
  | CreationFactoryClassInstanceStrategy
  | CreationFactoryClassStrategy
  | CreationStaticFactoryClassStrategy;


export interface CreationClassInstanceStrategy {
  readonly type: CreationStrategyType.ClassInstance;
}


export interface CreationClassStrategy {
  readonly type: CreationStrategyType.Class;
  readonly constructorArgs: any[];
}


export interface CreationFactoryFunctionStrategy {
  readonly type: CreationStrategyType.FactoryFunction;
  readonly functionArgs: any[];
}


export interface CreationFactoryClassInstanceStrategy {
  readonly type: CreationStrategyType.FactoryClassInstance;
  readonly methodName: string;
  readonly methodArgs: any[];
}


export interface CreationFactoryClassStrategy {
  readonly type: CreationStrategyType.FactoryClass;
  readonly constructorArgs: any[];
  readonly methodName: string;
  readonly methodArgs: any[];
}


export interface CreationStaticFactoryClassStrategy {
  readonly type: CreationStrategyType.StaticFactoryClass;
  readonly methodName: string;
  readonly methodArgs: any[];
}
