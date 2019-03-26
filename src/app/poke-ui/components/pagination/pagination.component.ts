import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonsQueryParams } from '../../pokemons/pokemon.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() maxPage: number;
  @Input() queryParams: PokemonsQueryParams;
  @Output() queryParamsChange = new EventEmitter<PokemonsQueryParams>();

  indexesLength = 3;
  indexes = Array(this.indexesLength)
    .fill(0)
    .map((x, y) => x + y);

  onPreviousPageClick(): void {
    if (this.getCurrentPointer() >= 1) {
      this.queryParamsChange.emit({
        offset: this.queryParams.offset - this.queryParams.limit,
        limit: this.queryParams.limit,
      });
    }
  }

  onPageClick(index: number): void {
    const pointer = this.getPointerByMaxPage(index);
    if (this.getCurrentPointer() !== pointer) {
      this.queryParamsChange.emit({
        offset: pointer * this.queryParams.limit,
        limit: this.queryParams.limit,
      });
    }
  }

  onNextPageClick(): void {
    if (this.getCurrentPointer() < this.maxPage - 1) {
      this.queryParamsChange.emit({
        offset: this.queryParams.offset + this.queryParams.limit,
        limit: this.queryParams.limit,
      });
    }
  }

  isPageNumberActive(index: number): boolean {
    return this.getPointerByMaxPage(index) === this.getCurrentPointer();
  }

  getPointerByMaxPage(index: number): number {
    const minPageNumber = this.maxPage - this.indexesLength;
    const currentPage = this.getCurrentPointer();
    return minPageNumber >= currentPage ? index + currentPage : minPageNumber + index;
  }

  getQueryParams(index: number): PokemonsQueryParams {
    return {
      offset: this.getPointerByMaxPage(index) * this.queryParams.limit,
      limit: this.queryParams.limit,
    };
  }

  getPreviousQueryParams(): PokemonsQueryParams {
    return {
      offset: (this.getCurrentPointer() - 1) * this.queryParams.limit,
      limit: this.queryParams.limit,
    };
  }

  getNextQueryParams(): PokemonsQueryParams {
    return {
      offset: (this.getCurrentPointer() + 1) * this.queryParams.limit,
      limit: this.queryParams.limit,
    };
  }

  isPreviousPointer(): boolean {
    return this.getCurrentPointer() >= 1;
  }

  isNextPointer(): boolean {
    return this.getCurrentPointer() + 1 <= this.maxPage - 1;
  }

  private getCurrentPointer(): number {
    return this.queryParams.offset / this.queryParams.limit;
  }
}
