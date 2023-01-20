import { BootstrapExplicitStrategy, BootstrapImplicitStrategy } from '../../types/bootstrap/BootstrapStrategies';
import { BootstrapStrategyType } from '../../types/bootstrap/BootstrapStrategyType';
import { fdc3InstallerName } from '../infrastructure/installerMetadata';

type BootstrapStrategyExecutor = (bootstrapStrategy: any, fdc3Agent: any) => Promise<void>;


const bootstrapImplicitStrategyExecutor: BootstrapStrategyExecutor = async (bootstrapStrategy: BootstrapImplicitStrategy, fdc3Agent: any): Promise<void> => {
  // FDC3 Agent was bootstrapped implicitly when it was imported / created, so there is no work to do here
  return new Promise((resolve, reject) => {
    resolve();
  });
}


const bootstrapExplicitStrategyExecutor: BootstrapStrategyExecutor = async (bootstrapStrategy: BootstrapExplicitStrategy, fdc3Agent: any): Promise<void> => {
  if (!bootstrapStrategy.methodName) {
    throw new Error('Missing bootstrapStrategy.methodName in config');
  }
  const fdc3AgentBootstrapMethod: Function = fdc3Agent[bootstrapStrategy.methodName];
  if (!fdc3AgentBootstrapMethod) {
    throw new Error(`Bootstrap method named '${bootstrapStrategy.methodName}' could not be found on FDC3 Agent`);
  }
  if (typeof fdc3AgentBootstrapMethod !== 'function') {
    throw new Error(`Expected bootstrap method named '${bootstrapStrategy.methodName}' to be a method, but it is of type '${typeof fdc3AgentBootstrapMethod}'`);
  }
  if ((!!bootstrapStrategy.methodArgs) && (!Array.isArray(bootstrapStrategy.methodArgs))) {
    throw new Error('bootstrapStrategy.methodArgs in config needs to be an array');
  }
  await fdc3AgentBootstrapMethod.apply(fdc3Agent, bootstrapStrategy.methodArgs);
}


const bootstrapStrategyExecutors = new Map<BootstrapStrategyType, BootstrapStrategyExecutor>();
bootstrapStrategyExecutors.set(BootstrapStrategyType.Implicit, bootstrapImplicitStrategyExecutor);
bootstrapStrategyExecutors.set(BootstrapStrategyType.Explicit, bootstrapExplicitStrategyExecutor);

export const getBootstrapStrategyExecutor = (bootstrapStrategyType: BootstrapStrategyType): BootstrapStrategyExecutor => {
  console.log(`${fdc3InstallerName} - Getting bootstrap strategy executor for type '${bootstrapStrategyType}'...`);
  const bootstrapStrategyExecutor = bootstrapStrategyExecutors.get(bootstrapStrategyType);
  if (!bootstrapStrategyExecutor) {
    throw new Error(`Implementation for bootstrapStrategyType '${bootstrapStrategyType}' could not be found`);
  }
  return bootstrapStrategyExecutor;
};
