export default defineBackground(() => {
  browser.action.onClicked.addListener(async () => {
    const tabs = await browser.tabs.query({ title: 'Google Maps Scraper' });

    if (tabs.length > 0) {
      browser.tabs.update(tabs[0].id!, { active: true });
    } else {
      browser.tabs.create({ url: 'inspector.html', pinned: true });
    }
  });
});
