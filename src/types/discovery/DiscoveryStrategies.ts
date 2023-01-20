import { ProviderID } from '../provider/ProviderID';
import { DiscoveryStrategyType } from './DiscoveryStrategyType';

export type DiscoveryStrategy =
  DiscoveryContainerExplicitStrategy
  | DiscoveryContainerOriginStrategy
  | DiscoveryAppExplicitStrategy
  | DiscoveryAppOriginStrategy
  | DiscoveryAppQuerystringStrategy
  | DiscoveryAppWindowNameStrategy
  | DiscoveryAppSessionStorageStrategy;


export interface DiscoveryContainerExplicitStrategy {
  readonly type: DiscoveryStrategyType.ContainerExplicit;
  readonly providerId: ProviderID;
  readonly validateProvider: boolean;
}


export interface DiscoveryContainerOriginStrategy {
  readonly type: DiscoveryStrategyType.ContainerOrigin;
  readonly originProviderIdMappings: OriginProviderIdMapping[];
  readonly validateProvider: boolean;
}


export interface DiscoveryAppExplicitStrategy {
  readonly type: DiscoveryStrategyType.AppExplicit;
  readonly providerId: ProviderID;
  readonly validateProvider: boolean;
}


export interface DiscoveryAppOriginStrategy {
  readonly type: DiscoveryStrategyType.AppOrigin;
  readonly originProviderIdMappings: OriginProviderIdMapping[];
  readonly validateProvider: boolean;
}


export interface DiscoveryAppQuerystringStrategy {
  readonly type: DiscoveryStrategyType.AppQuerystring;
  readonly paramName: string;
  readonly paramValueProviderIdMappings: ParamValueProviderIdMapping[];
  readonly validateProvider: boolean;
}


export interface DiscoveryAppWindowNameStrategy {
  readonly type: DiscoveryStrategyType.AppWindowName;
  readonly valueDelimiter: string;
  readonly providerNameOrdinal: number;
  readonly providerVersionOrdinal: number;
  readonly providerFdc3VersionOrdinal: number;
  readonly validateProvider: boolean;
}


export interface DiscoveryAppSessionStorageStrategy {
  readonly type: DiscoveryStrategyType.AppSessionStorage;
  readonly keyName: string;
  readonly providerNameValuePath: string;
  readonly providerVersionValuePath: string;
  readonly providerFdc3VersionValuePath: string;
  readonly validateProvider: boolean;
}


export interface OriginProviderIdMapping {
  readonly origin: string;
  readonly providerId: ProviderID;
}


export interface ParamValueProviderIdMapping {
  readonly paramValue: string;
  readonly providerId: ProviderID;
}
