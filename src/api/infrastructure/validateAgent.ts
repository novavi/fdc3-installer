import { ProviderID } from '../../types/provider/ProviderID';

const nameof = <T>(name: keyof T) => name;

export const validateAgent = (providerId: ProviderID, installedImplementation: any): void => {
  //TODO - Consider improving this as the naive string-based equality test for version / fdc3Version would actually fail validation for '1.2' against '1.2.0' for example
  let mismatchedPropValues: string[] = [];
  if (installedImplementation.provider !== providerId.name) {
    mismatchedPropValues.push(nameof<ProviderID>('name'));
  }
  if (installedImplementation.providerVersion !== providerId.version) {
    mismatchedPropValues.push(nameof<ProviderID>('version'));
  }
  if (installedImplementation.fdc3Version !== providerId.fdc3Version) {
    mismatchedPropValues.push(nameof<ProviderID>('fdc3Version'));
  }

  if (mismatchedPropValues.length > 0) {
    console.error(`Installed provider implementation does not match providerId specified in provider directory entry (mismatched properties: ${mismatchedPropValues.join(', ')})`);
    console.error('Provider directory entry:');
    console.error(providerId);
    console.error('Installed provider implementation');
    console.error(installedImplementation);
    throw new Error('Invalid agent');
  }
};
