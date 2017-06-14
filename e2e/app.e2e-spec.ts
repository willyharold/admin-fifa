import { PartnerSchoolAdminPage } from './app.po';

describe('partner-school-admin App', () => {
  let page: PartnerSchoolAdminPage;

  beforeEach(() => {
    page = new PartnerSchoolAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
