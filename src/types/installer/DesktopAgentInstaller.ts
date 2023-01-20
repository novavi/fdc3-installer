import { InstallerMetadata } from './InstallerMetadata';
import { InstallerConfigSource } from './InstallerConfigSource';
import { InstallResolution } from './InstallResolution';

export interface DesktopAgentInstaller {
  getInfo(): Promise<InstallerMetadata>;
  installAgent(source: InstallerConfigSource): Promise<InstallResolution>;
}
