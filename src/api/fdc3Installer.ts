import { DesktopAgentInstaller } from '../types/installer/DesktopAgentInstaller';
import { InstallerMetadata } from '../types/installer/InstallerMetadata';
import { InstallerConfigSource } from '../types/installer/InstallerConfigSource';
import { ProviderID } from '../types/provider/ProviderID';
import { ProviderDefinition } from '../types/provider/ProviderDefinition';
import { InstallerConfig } from '../types/installer/InstallerConfig';
import { InstallResolution } from '../types/installer/InstallResolution';
import { fdc3InstallerName, fdc3InstallerVersion } from './infrastructure/installerMetadata';
import { getInstallerConfig } from './infrastructure/getInstallerConfig';
import { getDiscoveryStrategyExecutor } from './executors/discoveryStrategyExecutors';
import { getCreationStrategyExecutor } from './executors/creationStrategyExecutors';
import { getBootstrapStrategyExecutor } from './executors/bootstrapStrategyExecutors';
import { validateAgent } from './infrastructure/validateAgent';

declare global {
  interface Window {
    fdc3: /*DesktopAgent*/any;
  }
}

export const fdc3Installer: DesktopAgentInstaller = {
  getInfo: function(): Promise<InstallerMetadata> {
    const installerMetadata: InstallerMetadata = {
      installerName: fdc3InstallerName,
      installerVersion: fdc3InstallerVersion
    };
    return new Promise((resolve, reject) => {
      resolve(installerMetadata);
    });
  },

  installAgent: async function(configSource: InstallerConfigSource): Promise<InstallResolution> {
    let providerDef: ProviderDefinition;
    let fdc3Agent: /*DesktopAgent*/any;
    if (window.fdc3) {
      fdc3Agent = window.fdc3;
      console.log(`%c**\n** FDC3 is already supported in this environment. Therefore ${fdc3InstallerName} v${fdc3InstallerVersion} will *not* attempt to discover and install an FDC3 Agent using the installer config. **\n**`, 'font-weight:bold;');
    }
    else {
      // Load the installer config for the given config source i.e. either from the application root or from the container root
      const installerConfig: InstallerConfig = await getInstallerConfig(configSource);
      // Determine the FDC3 Agent by using the discovery strategy specified in the installer config
      if (!installerConfig.discoveryStrategy) {
        throw new Error('Missing discoveryStrategy in config');
      }
      const discoveryStrategyExecutor = getDiscoveryStrategyExecutor(installerConfig.discoveryStrategy.type);
      const discoveredProviderId: ProviderID = discoveryStrategyExecutor(installerConfig.discoveryStrategy);
      // Retrieve the provider definition for the given FDC3 Agent by using the installer config's provider directory
      console.log(`${fdc3InstallerName} - Retrieving provider definition for provider '${discoveredProviderId.name}'...`);
      const providerDefs: ProviderDefinition[] = installerConfig.providerDirectory!.filter((pd: ProviderDefinition) => ((pd.providerId.name === discoveredProviderId.name) && ((!discoveredProviderId.version) || (pd.providerId.version === discoveredProviderId.version)) && ((!discoveredProviderId.fdc3Version) || (pd.providerId.fdc3Version === discoveredProviderId.fdc3Version))));
      if (providerDefs.length === 0) {
        throw new Error(`No provider definition '${discoveredProviderId.name}' could be found in provider directory config`);
      }
      else if (providerDefs.length > 1) {
        throw new Error(`Multiple provider definitions for '${discoveredProviderId.name}' found in provider directory config`);
      }
      else {
        providerDef = providerDefs[0];
        // Import the FDC3 Agent module using the module url defined for the provider implementation
        console.log(`${fdc3InstallerName} - Importing FDC3 Agent module using url '${providerDef.providerImplementation.moduleUrl}'...`);
        const fdc3AgentModule = await import(providerDef.providerImplementation.moduleUrl);
        if (!fdc3AgentModule) {
          throw new Error(`Failure obtaining module from FDC3 Agent at url '${providerDef.providerImplementation.moduleUrl}'`);
        }
        // Get the FDC3 Agent module object using the exported name defined for the provider implementation
        const effectiveExportedName = providerDef.providerImplementation.exportedName || "default"
        console.log(`${fdc3InstallerName} - Getting FDC3 Agent module object using name '${effectiveExportedName}'...`);
        const fdc3AgentModuleObject: any = fdc3AgentModule[effectiveExportedName];
        if (!fdc3AgentModuleObject) {
          throw new Error(`Failure obtaining exported object named '${effectiveExportedName}' from FDC3 Agent at url '${providerDef.providerImplementation.moduleUrl}'`);
        }
        // Create the FDC3 Agent by using the creation strategy defined for the provider implementation
        if (!providerDef.providerImplementation.creationStrategy) {
          throw new Error('Missing creationStrategy in config');
        }
        const creationStrategyExecutor = getCreationStrategyExecutor(providerDef.providerImplementation.creationStrategy.type);
        console.log(`${fdc3InstallerName} - Creating provider ${providerDef.providerId.name} v${providerDef.providerId.version}...`);
        fdc3Agent = await creationStrategyExecutor(providerDef.providerImplementation.creationStrategy, fdc3AgentModuleObject);
        // Bootstrap the FDC3 Agent (if required) by using the bootstrap strategy defined for the provider implementation
        if (!providerDef.providerImplementation.bootstrapStrategy) {
          throw new Error('Missing bootstrapStrategy in config');
        }
        const bootstrapStrategyExecutor = getBootstrapStrategyExecutor(providerDef.providerImplementation.bootstrapStrategy.type);
        console.log(`${fdc3InstallerName} - Bootstrapping provider ${providerDef.providerId.name} v${providerDef.providerId.version}...`);
        await bootstrapStrategyExecutor(providerDef.providerImplementation.bootstrapStrategy, fdc3Agent);
        // Validate the FDC3 Agent that has actually been imported/installed against the details in the provider definition (if required)
        if (installerConfig.discoveryStrategy.validateProvider) {
          console.log(`${fdc3InstallerName} - Validating installed provider ${providerDef.providerId.name} v${providerDef.providerId.version}...`);
          const installedImplementation = await fdc3Agent.getInfo();
          validateAgent(providerDef.providerId, installedImplementation);
        }
        console.log(`${fdc3InstallerName} - Completed discovery, import, creation and bootstrap for provider ${providerDef.providerId.name} v${providerDef.providerId.version}`);
        // console.log(fdc3Agent);
        console.log(`${fdc3InstallerName} - All done`);
      }
    }
    return new Promise((resolve, reject) => {
      const installResolution: InstallResolution = {
        providerDefinition: providerDef,
        fdc3: fdc3Agent
      };
      resolve(installResolution);
    });
  }
}
