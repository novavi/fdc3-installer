import { CreationClassInstanceStrategy, CreationClassStrategy, CreationFactoryClassInstanceStrategy, CreationFactoryClassStrategy, CreationFactoryFunctionStrategy, CreationStaticFactoryClassStrategy } from '../../types/creation/CreationStrategies';
import { CreationStrategyType } from '../../types/creation/CreationStrategyType';
import { fdc3InstallerName } from '../infrastructure/installerMetadata';

type CreationStrategyExecutor = (creationStrategy: any, fdc3AgentModuleObject: any) => Promise</*DesktopAgent*/any>;


const creationClassInstanceStrategyExecutor: CreationStrategyExecutor = (creationStrategy: CreationClassInstanceStrategy, fdc3AgentModuleObject: any): Promise</*DesktopAgent*/any> => {
  if (typeof fdc3AgentModuleObject !== 'object') {
    throw new Error(`Expected fdc3AgentModuleObject to be a class instance, but it is of type '${typeof fdc3AgentModuleObject}'`);
  }
  return new Promise((resolve, reject) => {
    resolve(fdc3AgentModuleObject);
  });
}


const creationClassStrategyExecutor: CreationStrategyExecutor = (creationStrategy: CreationClassStrategy, fdc3AgentModuleObject: any): Promise</*DesktopAgent*/any> => {
  if ((typeof fdc3AgentModuleObject !== 'function') || (typeof fdc3AgentModuleObject.constructor !== 'function')) {
    throw new Error(`Expected fdc3AgentModuleObject to be a class, but it is of type '${typeof fdc3AgentModuleObject}'`);
  }
  if ((!!creationStrategy.constructorArgs) && (!Array.isArray(creationStrategy.constructorArgs))) {
    throw new Error('creationStrategy.functionArgs in config needs to be an array');
  }
  return new Promise((resolve, reject) => {
    const fdc3Agent: /*DesktopAgent*/any = new (Function.prototype.bind.call(fdc3AgentModuleObject, undefined, ...creationStrategy.constructorArgs))();
    resolve(fdc3Agent);
  });
}


const creationFactoryFunctionStrategyExecutor: CreationStrategyExecutor = async (creationStrategy: CreationFactoryFunctionStrategy, fdc3AgentModuleObject: Function): Promise</*DesktopAgent*/any> => {
  if (typeof fdc3AgentModuleObject !== 'function') {
    throw new Error(`Expected fdc3AgentModuleObject to be a factory function, but it is of type '${typeof fdc3AgentModuleObject}'`);
  }
  if ((!!creationStrategy.functionArgs) && (!Array.isArray(creationStrategy.functionArgs))) {
    throw new Error('creationStrategy.functionArgs in config needs to be an array');
  }
  return await fdc3AgentModuleObject.apply(undefined, creationStrategy.functionArgs);
}


const creationFactoryClassInstanceStrategyExecutor: CreationStrategyExecutor = async (creationStrategy: CreationFactoryClassInstanceStrategy, fdc3AgentModuleObject: any): Promise</*DesktopAgent*/any> => {
  if (typeof fdc3AgentModuleObject !== 'object') {
    throw new Error(`Expected fdc3AgentModuleObject to be a factory class instance, but it is of type '${typeof fdc3AgentModuleObject}'`);
  }
  if (!creationStrategy.methodName) {
    throw new Error('Missing creationStrategy.methodName in config');
  }
  const factoryMethod: Function = fdc3AgentModuleObject[creationStrategy.methodName];
  if (!factoryMethod) {
    throw new Error(`Factory method named '${creationStrategy.methodName}' could not be found on factory class instance`);
  }
  if (typeof factoryMethod !== 'function') {
    throw new Error(`Expected factory method named '${creationStrategy.methodName}' to be a method, but it is of type '${typeof factoryMethod}'`);
  }
  if ((!!creationStrategy.methodArgs) && (!Array.isArray(creationStrategy.methodArgs))) {
    throw new Error('creationStrategy.methodArgs in config needs to be an array');
  }
  return await factoryMethod.apply(fdc3AgentModuleObject, creationStrategy.methodArgs);
}


const creationFactoryClassStrategyExecutor: CreationStrategyExecutor = (creationStrategy: CreationFactoryClassStrategy, fdc3AgentModuleObject: any): Promise</*DesktopAgent*/any> => {
  throw new Error('Not implemented');
  // Use:
  //  creationStrategy.constructorArgs
  //  creationStrategy.methodName
  //  creationStrategy.methodArgs
}


const creationStaticFactoryClassStrategyExecutor: CreationStrategyExecutor = (creationStrategy: CreationStaticFactoryClassStrategy, fdc3AgentModuleObject: any): Promise</*DesktopAgent*/any> => {
  throw new Error('Not implemented');
  // Use:
  //  creationStrategy.methodName
  //  creationStrategy.methodArgs
}


const creationStrategyExecutors = new Map<CreationStrategyType, CreationStrategyExecutor>();
creationStrategyExecutors.set(CreationStrategyType.ClassInstance, creationClassInstanceStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.Class, creationClassStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.FactoryFunction, creationFactoryFunctionStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.FactoryClassInstance, creationFactoryClassInstanceStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.FactoryClass, creationFactoryClassStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.StaticFactoryClass, creationStaticFactoryClassStrategyExecutor);

export const getCreationStrategyExecutor = (creationStrategyType: CreationStrategyType): CreationStrategyExecutor => {
  console.log(`${fdc3InstallerName} - Getting creation strategy executor for type '${creationStrategyType}'...`);
  const creationStrategyExecutor = creationStrategyExecutors.get(creationStrategyType);
  if (!creationStrategyExecutor) {
    throw new Error(`Implementation for creationStrategyType '${creationStrategyType}' could not be found`);
  }
  return creationStrategyExecutor;
};
