import { ProviderDefinition } from "../provider/ProviderDefinition";

export interface InstallResolution {
  readonly providerDefinition: ProviderDefinition;
  readonly fdc3: /*DesktopAgent*/any;
}
