class DomainChecker {
  constructor() {
    browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (changeInfo.status === "complete") this.checkDomain(tabId);
    });

    browser.tabs.onActivated.addListener(({ tabId }) => this.checkDomain(tabId));

    browser.webNavigation.onCommitted.addListener(details => {
      this.checkDomain(details.tabId);
    }, { url: [{ schemes: ["http", "https"] }] });
  }

  async checkDomain(tabId) {
    const { isMonitoringEnabled } = await browser.storage.local.get("isMonitoringEnabled");
    if (!isMonitoringEnabled) return;

    const tab = await browser.tabs.get(tabId);
    if (!tab || !tab.url) return;

    const url = new URL(tab.url);
    const domain = url.hostname;

    const { domains } = await browser.storage.local.get("domains") || { domains: [] };

    const isWatchedDomain = domains.some(entry => {
      if (entry.startsWith("*.")) {
        const baseDomain = entry.slice(2); // Wildcard match for subdomains
        return domain.endsWith(`.${baseDomain}`);
      }
      return entry === domain || entry === domain.replace(/^www\./, '') || `www.${entry}` === domain;
    });

    const iconPath = isWatchedDomain ? "icons/red.png" : "icons/green.png";
    browser.browserAction.setIcon({ path: iconPath, tabId });
  }
}

new DomainChecker();
