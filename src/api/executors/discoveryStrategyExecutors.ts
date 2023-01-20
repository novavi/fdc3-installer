import { DiscoveryAppExplicitStrategy, DiscoveryAppOriginStrategy, DiscoveryAppQuerystringStrategy, DiscoveryAppSessionStorageStrategy, DiscoveryAppWindowNameStrategy, DiscoveryContainerExplicitStrategy, DiscoveryContainerOriginStrategy, OriginProviderIdMapping, ParamValueProviderIdMapping } from '../../types/discovery/DiscoveryStrategies';
import { DiscoveryStrategyType } from '../../types/discovery/DiscoveryStrategyType';
import { ProviderID } from '../../types/provider/ProviderID';
import { getContainerOrigin } from '../infrastructure/getContainerOrigin';
import { fdc3InstallerName } from '../infrastructure/installerMetadata';

type DiscoveryStrategyExecutor = (discoveryStrategy: any) => ProviderID;


const discoveryContainerExplicitStrategyExecutor: DiscoveryStrategyExecutor = (discoveryStrategy: DiscoveryContainerExplicitStrategy): ProviderID => {
  if (!discoveryStrategy.providerId) {
    throw new Error(`providerId could not be found in discoveryStrategy`);
  }
  return discoveryStrategy.providerId;
}


const discoveryContainerOriginStrategyExecutor: DiscoveryStrategyExecutor = (discoveryStrategy: DiscoveryContainerOriginStrategy): ProviderID => {
  let originProviderIdMapping: OriginProviderIdMapping;
  const containerOrigin = getContainerOrigin();
  const originProviderIdMappings: OriginProviderIdMapping[] = discoveryStrategy.originProviderIdMappings.filter(opm => opm.origin === containerOrigin);
  if (originProviderIdMappings.length === 0) {
    throw new Error(`originProviderIdMapping for origin '${containerOrigin}' could not be found in discoveryStrategy`);
  }
  else if (originProviderIdMappings.length > 1) {
    throw new Error(`Multiple originProviderIdMapping items with origin '${containerOrigin}' found in discoveryStrategy`);
  }
  else {
    originProviderIdMapping = originProviderIdMappings[0];
  }
  return originProviderIdMapping.providerId;
}


const discoveryAppExplicitStrategyExecutor: DiscoveryStrategyExecutor = (discoveryStrategy: DiscoveryAppExplicitStrategy): ProviderID => {
  if (!discoveryStrategy.providerId) {
    throw new Error(`providerId could not be found in discoveryStrategy`);
  }
  return discoveryStrategy.providerId;
}


const discoveryAppOriginStrategyExecutor: DiscoveryStrategyExecutor = (discoveryStrategy: DiscoveryAppOriginStrategy): ProviderID => {
  let originProviderIdMapping: OriginProviderIdMapping;
  const originProviderIdMappings: OriginProviderIdMapping[] = discoveryStrategy.originProviderIdMappings.filter(opm => opm.origin === window.location.origin);
  if (originProviderIdMappings.length === 0) {
    throw new Error(`originProviderIdMapping for origin '${window.location.origin}' could not be found in discoveryStrategy`);
  }
  else if (originProviderIdMappings.length > 1) {
    throw new Error(`Multiple originProviderIdMapping items with origin '${window.location.origin}' found in discoveryStrategy`);
  }
  else {
    originProviderIdMapping = originProviderIdMappings[0];
  }
  return originProviderIdMapping.providerId;
}


const discoveryAppQuerystringStrategyExecutor: DiscoveryStrategyExecutor = (discoveryStrategy: DiscoveryAppQuerystringStrategy): ProviderID => {
  let paramValueProviderIdMapping: ParamValueProviderIdMapping;
  if (!discoveryStrategy.paramName) {
    throw new Error(`paramName could not be found in discoveryStrategy`);
  }
  const runtimeAppParams = new URL(window.location.href).searchParams;
  const runtimeAppParamValue = runtimeAppParams.get(discoveryStrategy.paramName);
  if (!runtimeAppParamValue) {
    throw new Error(`param '${discoveryStrategy.paramName}' could not be found in application url`);
  }
  const paramValueProviderIdMappings: ParamValueProviderIdMapping[] = discoveryStrategy.paramValueProviderIdMappings.filter(pvpm => pvpm.paramValue === runtimeAppParamValue);
  if (paramValueProviderIdMappings.length === 0) {
    throw new Error(`paramValueProviderIdMapping for paramValue '${runtimeAppParamValue}' could not be found in discoveryStrategy`);
  }
  else if (paramValueProviderIdMappings.length > 1) {
    throw new Error(`Multiple paramValueProviderIdMapping items with paramValue '${runtimeAppParamValue}' found in discoveryStrategy`);
  }
  else {
    paramValueProviderIdMapping = paramValueProviderIdMappings[0];
  }
  return paramValueProviderIdMapping.providerId;
}


const discoveryAppWindowNameStrategyExecutor: DiscoveryStrategyExecutor = (discoveryStrategy: DiscoveryAppWindowNameStrategy): ProviderID => {
  throw new Error('Not implemented');
  // Use:
  //  discoveryStrategy.valueDelimiter
  //  discoveryStrategy.providerNameOrdinal
  //  discoveryStrategy.providerVersionOrdinal
  //  discoveryStrategy.providerFdc3VersionOrdinal
  // For example:
  //  * use window.name to get the string containing the values that have been projected through to the app window from the micro-frontend container that spawned it
  //  * Create and return a ProviderID object
}


const discoveryAppSessionStorageStrategyExecutor: DiscoveryStrategyExecutor = (discoveryStrategy: DiscoveryAppSessionStorageStrategy): ProviderID => {
  throw new Error('Not implemented');
  // Use:
  //  discoveryStrategy.keyName
  //  discoveryStrategy.providerNameValuePath
  //  discoveryStrategy.providerVersionValuePath
  //  discoveryStrategy.providerFdc3VersionValuePath
  // For example:
  //  * use something like this to get the item value:  sessionStorage.getItem(discoveryStrategy.keyName)
  //  * parse the stringified item value into an object, and use Lodash get() method or similar to get the values specified by the xxxValuePath properties from the object
  //  * Create and return a ProviderID object
  // Further thoughts:
  //  * Could consider supporting a stringified ProviderID object (still using keyName to retrieve) but using implicit xxxValuePath properties unless they are explicitly supplied
  //  * Additionally, could also potentially support three separate item key names for the three properties (instead of having a single item value and parsing it into an object)
}


const discoveryStrategyExecutors = new Map<DiscoveryStrategyType, DiscoveryStrategyExecutor>();
discoveryStrategyExecutors.set(DiscoveryStrategyType.ContainerExplicit, discoveryContainerExplicitStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.ContainerOrigin, discoveryContainerOriginStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppExplicit, discoveryAppExplicitStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppOrigin, discoveryAppOriginStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppQuerystring, discoveryAppQuerystringStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppWindowName, discoveryAppWindowNameStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppSessionStorage, discoveryAppSessionStorageStrategyExecutor);


export const getDiscoveryStrategyExecutor = (discoveryStrategyType: DiscoveryStrategyType): DiscoveryStrategyExecutor => {
  console.log(`${fdc3InstallerName} - Getting discovery strategy executor for type '${discoveryStrategyType}'...`);
  const discoveryStrategyExecutor = discoveryStrategyExecutors.get(discoveryStrategyType);
  if (!discoveryStrategyExecutor) {
    throw new Error(`Implementation for discoveryStrategy type '${discoveryStrategyType}' could not be found`);
  }
  return discoveryStrategyExecutor;
};
