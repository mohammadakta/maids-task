import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination;
  @Input() offset;
  @Output() paginate = new EventEmitter();
  pages = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  isCurrentPage(page) {
    return this.pagination.page === page;
  }


  changePage(page) {
    if (page === 0 || page > this.pagination.total_pages) {
      return;
    }
    if (page > this.pagination.total_pages) {
      page = this.pagination.total_pages;
    }
    this.pagination.page = page;
    this.paginate.emit(page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pagination = changes.pagination.currentValue !== undefined ? changes.pagination.currentValue : {};
    console.log(this.pagination)
    if (this.pagination) {
      let from = this.pagination.page - Math.floor(this.offset / 2);
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset - 1;
      if (to > this.pagination.total_pages) {
        to = this.pagination.total_pages;
      }
      while (from <= to) {
        this.pages.push(from);
        from++;
      }
    }
  }

}
