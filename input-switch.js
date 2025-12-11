(async () => {
  // Feature Detection
  // If the browser prototype has the 'switch' property, we trust native support.
  if ('switch' in HTMLInputElement.prototype) {
    return;
  }

  const sheet = await import('./input-switch.css', { with: { type: 'css' } });
  document.adoptedStyleSheets = [sheet.default];

  // Helper to upgrade a single checkbox
  function upgradeSwitch(input) {
    // Avoid double-processing
    if (input.classList.contains('switch')) return;

    // Apply the class that triggers our CSS
    input.classList.add('switch');

    // Handle accent-color support
    // We read the computed accent-color (inherited or set explicitly)
    // and assign it to the CSS variable --switch-accent
    const style = getComputedStyle(input);
    const accent = style.accentColor;

    if (accent && accent !== 'auto') {
      input.style.setProperty('--switch-accent', accent);
    }
  }

  // Initial Run
  function init() {
    const switches = document.querySelectorAll(
      'input[type="checkbox"][switch]'
    );
    switches.forEach(upgradeSwitch);
  }

  // Observer for dynamic content (SPAs, HTMX, etc.)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            // Check the node itself
            if (
              node.matches &&
              node.matches('input[type="checkbox"][switch]')
            ) {
              upgradeSwitch(node);
            }
            // Check descendants
            const nestedSwitches = node.querySelectorAll
              ? node.querySelectorAll('input[type="checkbox"][switch]')
              : [];
            nestedSwitches.forEach(upgradeSwitch);
          }
        });
      }
    });
  });

  // Start logic
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
