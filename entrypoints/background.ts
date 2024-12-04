export default defineBackground(() => {
  browser.action.onClicked.addListener(async () => {
    const currentTab = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tabId = currentTab[0].id;
    await browser.debugger.attach({ tabId }, '1.3');
    await browser.debugger.sendCommand({ tabId }, 'Debugger.enable');
    await browser.debugger.sendCommand({ tabId }, 'Network.enable');
    const browserWindow = await browser.windows.create({
      url: `inspector.html?tabId=${tabId}`,
      type: 'panel',
      state: 'fullscreen',
    });
    const mainTab = browserWindow.tabs?.at(0);
  });
});
