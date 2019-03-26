import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() maxPage: number;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  elementCount = 3;
  elementCounts = Array(this.elementCount)
    .fill(0)
    .map((x, y) => x + y);

  onPreviousPageClick(): void {
    if (this.currentPage > 1) {
      this.currentPage = --this.currentPage;
      this.pageChange.emit(this.currentPage);
    }
  }

  onPageClick(elementCount: number): void {
    const pageNumber = this.getPageNumber(elementCount);
    if (this.currentPage !== pageNumber) {
      this.currentPage = pageNumber;
      this.pageChange.emit(this.currentPage);
    }
  }

  onNextPageClick(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage = ++this.currentPage;
      this.pageChange.emit(this.currentPage);
    }
  }

  isPageNumberActive(elementCount: number): boolean {
    return this.getPageNumber(elementCount) === this.currentPage;
  }

  getPageNumber(elementCount: number): number {
    const minElementCount = this.maxPage - this.elementCount + 1;
    const pageNumber = elementCount + this.currentPage;
    return minElementCount > this.currentPage ? pageNumber : minElementCount + elementCount;
  }
}
