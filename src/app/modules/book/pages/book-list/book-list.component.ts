import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageDtoBookRsp} from "../../../../services/models/page-dto-book-rsp";
import {CommonModule} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {BookRsp} from "../../../../services/models/book-rsp";

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  bookRsp: PageDtoBookRsp = {};
  page = 0;
  size = 4;
  message: string = '';
  level: string = 'success';

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookRsp = books;
      }
    });

  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookRsp.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookRsp.totalPages as number - 1;
  }

  borrowBook(book: BookRsp) {
    this.message = ''
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully borrowed, added to My books';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.err;
      }
    })
  }
}
