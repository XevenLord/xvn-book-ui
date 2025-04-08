import {Component, OnInit} from '@angular/core';
import {PageDtoBookRsp} from "../../../../services/models/page-dto-book-rsp";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {BookRsp} from "../../../../services/models/book-rsp";
import {CommonModule} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-my-books',
  imports: [CommonModule, BookCardComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css'
})
export class MyBooksComponent implements OnInit {
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
        this.message = 'Book successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.err;
      }
    })
  }
}
