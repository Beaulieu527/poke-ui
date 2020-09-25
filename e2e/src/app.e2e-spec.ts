import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Poke-UI', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message above search bar', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Search Your Pokedex');
  });

  it('should display a list of 10 pokemon', () => {
    page.navigateTo();
    expect(page.getPokemonList().count()).toBe(10);
  });

  it('should show a second page of list and show selected pokemon', () => {
    page.navigateTo();
    page.getNewPage(3);
    page.getPokemonFromList(6);
    expect(page.getPokemonName().getText()).toBe('#027Sandshrew');
  });

  it('should view selected pokemon', () => {
    page.navigateTo();
    page.getPokemonFromList(5);
    expect(page.getPokemonName().getText()).toBe('#006Charizard');
  });

  it('should open and navigate between pokemon using arrow buttons', () => {
    page.navigateTo();
    page.getPokemonFromList(0);
    page.clickLeftArrow();
    expect(page.getPokemonName().getText()).toBe('#807Zeraora');
    page.clickRightArrow();
    page.clickRightArrow();
    expect(page.getPokemonName().getText()).toBe('#002Ivysaur');
  });

  it('should search pokemon by ID and open page', () => {
    page.navigateTo();
    page.searchID(400);
    expect(page.getPokemonName().getText()).toBe('#400Bibarel');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    );
  });
});
