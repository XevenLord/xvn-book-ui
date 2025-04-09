import {Component, OnInit} from '@angular/core';
import {PageDtoBookRsp} from "../../../../services/models/page-dto-book-rsp";
import {BookService} from "../../../../services/services/book.service";
import {Router, RouterModule} from "@angular/router";
import {BookRsp} from "../../../../services/models/book-rsp";
import {CommonModule} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-my-books',
  imports: [CommonModule, BookCardComponent, RouterModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css'
})
export class MyBooksComponent implements OnInit {
  bookRsp: PageDtoBookRsp = {content: []};
  page = 0;
  size = 4;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        console.log("checking books response :: ", books);
        this.bookRsp = books;
        if (!this.bookRsp.content) {
          this.bookRsp.content = [];
        }
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.bookRsp.content = [];
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

  archiveBook(book: BookRsp) {
    this.bookService.updArchivedSts({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    })
  }

  shareBook(book: BookRsp) {
    this.bookService.updShareableSts({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    })
  }

  editBook(book: BookRsp) {
    this.router.navigate(['books', 'manage', book.id])
  }
}
