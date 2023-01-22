const fdc3Version = '1.2';
const fdc3AgentProviderName = 'Acme FDC3 Desktop Agent';
const fdc3AgentProviderVersion = '4.0.0';
const simulatedBootstrapDelayMs = 0;

const bootstrapFdc3Agent = async () => {
  console.log(`Started bootstrapping ${fdc3AgentProviderName} v${fdc3AgentProviderVersion} in ${window.location.origin}...`);
  //
  // Blah blah... FDC3 Desktop Agent bootstrap process
  //
  return new Promise((resolve, reject) => {
    if (simulatedBootstrapDelayMs > 0) {
      // Simulate delay in bootstrapping process
      setTimeout(() => {
        console.log(`Completed bootstrapping ${fdc3AgentProviderName} v${fdc3AgentProviderVersion} in ${window.location.origin}`);
        resolve();
      }, simulatedBootstrapDelayMs);
    }
    else {
      // Boostrap without simulated delay
      console.log(`Completed bootstrapping ${fdc3AgentProviderName} v${fdc3AgentProviderVersion} in ${window.location.origin}`);
      resolve();
    }
  });
};


// Create the FDC3 Desktop Agent
const fdc3 = {
  getInfo: () => {
    return {
      fdc3Version,
      provider: fdc3AgentProviderName,
      providerVersion: fdc3AgentProviderVersion
    };
  }

  //
  // Blah blah... rest of FDC3 Desktop Agent implementation
  //
};


if (window.fdc3) {
  console.log(`%c**\n** FDC3 is already supported in this environment. Therefore ${fdc3AgentProviderName} v${fdc3AgentProviderVersion} will *not* be installed. **\n**`, 'font-weight:bold;');
}
else {
  // Freeze the fdc3 object to prevent extensions and make its properties non-writable and non-configurable.
  // This is a shallow freeze, so it only applies to the immediate properties of the fdc3 object itself.
  // However, since all the immediate properties are functions (rather than objects) then they will be frozen.
  // The reason for doing this is to prevent the fdc3 object's methods from being deleted or reassigned by external code at runtime.
  Object.freeze(fdc3);

  // Note that the FDC3 spec states "The global window.fdc3 should only be available after the API is ready to use" and therefore the
  // @finos/fdc3 fdc3Ready async wrapper function has been implemented in such a way that it resolves immediately if window.fdc3 is truthy,
  // even if no 'fdc3Ready' event has been raised yet via window.dispatchEvent().  This means it is *vital* we ensure that the bootstrapping process is
  // complete (below) prior to setting window.fdc3 (further below).
  // Failure to consider this fact could result in a "`fdc3Ready` event fired, but `window.fdc3` not set to DesktopAgent." error at runtime.
  await bootstrapFdc3Agent();

  // Set the window.fdc3 property, but do so using Object.defineProperty() rather than using a simple 'window.fdc3 = ...' assignment.
  // The reason for doing it this way is to prevent window.fdc3 being deleted or reassigned by external code at runtime.
  // Clearly we cannot (and would not want to) freeze the window object itself, but we can at least ensure that the window.fdc3 property is non-configurable / non-writable.
  // Note that setting 'const fdc3 = ...' in the global namespace would theoretically achieve a similar result, but in practice it would not be straightforward to
  // do that since (a) non-exported consts inside a JavaScript module do not affect scope outside that module; and (b) even if this library was packaged as an
  // old-style JavaScript include (rather than as a module) then one would have to explicitly ensure the 'const fdc3 = ...' remained in the global namespace rather
  // than inadvertently being wrapped up with all the other code by a script bundling process in the revealing module pattern to avoid polluting the global namespace.
  Object.defineProperty(window, 'fdc3', {
    value: fdc3,
    configurable: false,
    writable: false
  });
  console.log(`%c**\n** ${fdc3AgentProviderName} v${fdc3AgentProviderVersion} has been installed in ${window.location.origin} **\n**`, 'font-weight:bold;');

  // Raise the 'fdc3Ready' event to notify the consuming app that the FDC3 Desktop Agent is now ready for use.
  // The consuming app should wait for this event before it attempts invocation of any method on the window.fdc3 object.
  window.dispatchEvent(new Event('fdc3Ready'));
}


// Export as default
export default fdc3;

/*
class Fdc3 {
  constructor(aaa, bbb) {
    console.log('aaa');
    console.log(aaa);
    console.log('bbb');
    console.log(bbb);
    // window.fdc3 = this;
  }

  getInfo() {
    return {
      fdc3Version,
      provider: fdc3AgentProviderName,
      providerVersion: fdc3AgentProviderVersion
    };
  }
}
class Fdc3Factory {
  create = 'ergesrgsg';

  zzcreate(ccc, ddd) {
    console.log('ccc');
    console.log(ccc);
    console.log('ddd');
    console.log(ddd);
    return new Fdc3(ccc, ddd)
  }
}
// export default Fdc3;
export default new Fdc3Factory();
*/
