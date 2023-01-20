import { CreationStrategy } from '../creation/CreationStrategies';
import { BootstrapStrategy } from '../bootstrap/BootstrapStrategies';

export interface ProviderImplementation {
  readonly moduleUrl: string;
  readonly exportedName?: string;
  readonly creationStrategy: CreationStrategy;
  readonly bootstrapStrategy: BootstrapStrategy
}
