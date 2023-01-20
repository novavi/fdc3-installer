import { DiscoveryStrategy } from '../discovery/DiscoveryStrategies';
import { ProviderDefinition } from '../provider/ProviderDefinition';

export interface InstallerConfig {
  readonly discoveryStrategy: DiscoveryStrategy;
  readonly providerDirectoryUrl?: string;
  providerDirectory?: ProviderDefinition[];
}
