import { Ang2tabsPage } from './app.po';

describe('ang2tabs App', function() {
  let page: Ang2tabsPage;

  beforeEach(() => {
    page = new Ang2tabsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
