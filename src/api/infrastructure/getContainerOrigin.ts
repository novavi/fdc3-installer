export const getContainerOrigin = (): string => {
  let containerOrigin: string;
  if ((window.parent) && (window.parent !== window)) {
    // Application is running in an iframe inside a micro-frontend container
    if ((window.location.ancestorOrigins) && (window.location.ancestorOrigins.length > 0)) {
      // Use the origin of ultimate ancestor browsing context.  This handles both the (common) iframe and (uncommon) nested-iframe scenarios.
      // Note that this assumes the micro-frontend container itself is *not* hosted in an iframe (which would arguably be an odd thing to do)
      containerOrigin = new URL(window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]).origin;
    }
    else {
      throw new Error(`ancestorOrigins for application at url '${window.location.href}' could not be found in window.location`);
    }
  }
  else if (window.opener) {
    // Application is running in an external window spawned from a micro-frontend container.
    // Note that this assumes the application was spawned *directly* by the micro-frontend container.  This might be a reasonable assumption in
    // the case where the container and application use an FDC3 Agent which relies on local native browser event APIs for FDC3 messaging, because
    // such an FDC3 Agent will likely require an 'FDC3 messaging router' of sorts in the container, and so the FDC3 Agent's fdc3.open() method can
    // delegate the actual window.open() invocation to the container - meaning that  document.referrer  will in fact reference the container as expected.
    // However, there will be some scenarios where this would not work in the case of a FDC3 Agent which relies on WebSockets for cloud-based FDC3 messaging, because
    // in that scenario the lack of an 'FDC3 messaging router' in the container (because there would be no requirement for a container at all) would mean that application
    // windows would be spawned from each other (rather than from a container) and therefore  document.referrer  *could* reference another application, rather than a container.
    // In practice, it's fair to say that a container-based discovery strategy is neither appropriate (or supported by this library) for the case of applications
    // using cloud-based FDC3 Agent implementations.  Those applications can however by supported by this library by simply using an application-based discovery strategy.
    containerOrigin = new URL(document.referrer).origin;
  }
  else {
    throw new Error(`Failed to determine container origin because application at url '${window.location.href}' does not appear to be running inside a micro-frontend container`);
  }
  return containerOrigin;
};
