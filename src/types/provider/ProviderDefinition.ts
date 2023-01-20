import { ProviderID } from './ProviderID';
import { ProviderImplementation } from './ProviderImplementation';

export interface ProviderDefinition {
  readonly providerId: ProviderID;
  readonly providerImplementation: ProviderImplementation;
}
