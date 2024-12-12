export default defineBackground(() => {
  browser.action.onClicked.addListener(async () => {
    const currentTab = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    const tabsIds = currentTab.map((tab) => tab.id);

    await Promise.all(
      tabsIds.map(async (tabId) => {
        await attachEverything(tabId!);
      })
    );

    async function attachEverything(tabId: number) {
      try {
        await browser.debugger.attach({ tabId }, '1.3');
        await browser.debugger.sendCommand({ tabId }, 'Debugger.enable');
        await browser.debugger.sendCommand({ tabId }, 'Network.enable');
      } catch (e) {
        console.error(e);
      }
    }

    browser.tabs.onCreated.addListener(async (tab) => {
      await attachEverything(tab.id!);
    });

    browser.tabs.onRemoved.addListener(async (tabId) => {
      await browser.debugger.detach({ tabId });
    });

    const browserWindow = await browser.windows.create({
      url: `inspector.html`,
      type: 'panel',
      state: 'fullscreen',
    });
    const spypsyTab = browserWindow.tabs?.at(0);
  });
});
