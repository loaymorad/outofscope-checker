class PopupController {
  constructor() {
    this.saveButton = document.getElementById("saveButton");
    this.toggleButton = document.getElementById("toggleButton");
    
    this.saveButton.addEventListener("click", () => this.saveDomains());
    this.toggleButton.addEventListener("click", () => this.toggleMonitoring());
    
    // Initialize the popup's state
    document.addEventListener("DOMContentLoaded", () => this.initializeState());
  }
  
  async saveDomains() {
    const domainList = document.getElementById("domainList").value;
    const domains = domainList.split("\n").map(domain => domain.trim()).filter(Boolean);
    
    // Save domains to storage
    await browser.storage.local.set({ domains });
    
    const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (activeTab && activeTab.id) {
      await browser.runtime.sendMessage({ type: "checkDomain", tabId: activeTab.id });
    }
  }
  
  async toggleMonitoring() {
    const { isMonitoringEnabled } = await browser.storage.local.get("isMonitoringEnabled");
    const newState = !isMonitoringEnabled;

    await browser.storage.local.set({ isMonitoringEnabled: newState });
    
    this.toggleButton.textContent = newState ? "Disable Domain Check" : "Enable Domain Check";

    if (!newState) {
      await browser.storage.local.remove("domains"); // delete saved domains if disabling
    } else {
      const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (activeTab && activeTab.id) {
        await browser.runtime.sendMessage({ type: "checkDomain", tabId: activeTab.id });
      }
    }
  }

  async initializeState() {
    const { isMonitoringEnabled } = await browser.storage.local.get("isMonitoringEnabled");
    this.toggleButton.textContent = isMonitoringEnabled ? "Disable Domain Check" : "Enable Domain Check";
  }
}

new PopupController();
