import { InstallerConfigSource } from '../../types/installer/InstallerConfigSource';
import { InstallerConfig } from '../../types/installer/InstallerConfig';
import { fdc3InstallerName } from './installerMetadata';
import { getContainerOrigin } from './getContainerOrigin';

export const getInstallerConfig = async (configSource: InstallerConfigSource): Promise<InstallerConfig> => {
  console.log(`${fdc3InstallerName} - Loading installer config for source '${configSource}'...`);
  let installerConfig: InstallerConfig;
  // Attempt to load installer config
  const fdc3InstallerConfigFileName = 'fdc3-installer-config.json';
  const fdc3InstallerConfigUrl = (configSource === InstallerConfigSource.Container) ? `${getContainerOrigin()}/${fdc3InstallerConfigFileName}` : fdc3InstallerConfigFileName;
  const icResponse = await fetch(fdc3InstallerConfigUrl);
  if (!icResponse.ok) {
    throw new Error(`Installer config at url '${fdc3InstallerConfigUrl}' for configSource '${configSource}' could not be located`);
  }
  try {
    installerConfig = await icResponse.json();
  }
  catch (e) {
    throw new Error(`Installer config at url '${fdc3InstallerConfigUrl}' for configSource '${configSource}' could not be parsed`);
  }

  // Inline providerDirectory (defined within the installer config) always take precedence over an externally-defined equivalent.
  // Therefore check whether providerDirectory exists in installer config, and if not then attempt to load externally using providerDirectoryUrl.
  if ((!installerConfig.providerDirectory) || (installerConfig.providerDirectory.length === 0)) {
    if (!installerConfig.providerDirectoryUrl) {
      throw new Error(`No providerDirectory or providerDirectoryUrl could be found in config`);
    }
    else {
      const pdResponse = await fetch(installerConfig.providerDirectoryUrl);
      if (!pdResponse.ok) {
        throw new Error(`Provider directory at url '${installerConfig.providerDirectoryUrl}' could not be located`);
      }
      try {
        installerConfig.providerDirectory = await pdResponse.json();
      }
      catch (e) {
        throw new Error(`Provider directory at url '${installerConfig.providerDirectoryUrl}' could not be parsed`);
      }
      if ((!installerConfig.providerDirectory) || (installerConfig.providerDirectory.length === 0)) {
        throw new Error(`Provider directory at url '${installerConfig.providerDirectoryUrl}' is empty`);
      }
    }
  }

  return new Promise((resolve, reject) => {
    resolve(installerConfig);
  });
};
