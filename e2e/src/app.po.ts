import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getPokemonList() {
    return element.all(by.css('.pokemon-list__element'));
  }

  getPokemonFromList(index) {
    return element
      .all(by.css('.pokemon-list__content'))
      .get(index)
      .click();
  }

  searchID(id) {
    return (
      element(by.css('#search')).click(),
      element(by.css('#search')).sendKeys(id),
      element(by.css('.form__button')).click()
    );
  }

  getPokemonName() {
    return element(by.css('#name'));
  }

  clickRightArrow() {
    return element(by.css('.arrow__right')).click();
  }

  clickLeftArrow() {
    return element(by.css('.arrow__left')).click();
  }

  getNewPage(index) {
    return element
      .all(by.css('.pagination__content'))
      .get(index)
      .click();
  }
}
