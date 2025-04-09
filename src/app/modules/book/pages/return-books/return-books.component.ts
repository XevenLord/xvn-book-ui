import {Component, OnInit} from '@angular/core';
import {PageDtoBorrowedBookRsp} from "../../../../services/models/page-dto-borrowed-book-rsp";
import {FeedbackReq} from "../../../../services/models/feedback-req";
import {BorrowedBookRsp} from "../../../../services/models/borrowed-book-rsp";
import {BookService} from "../../../../services/services/book.service";
import {FeedbacksService} from "../../../../services/services/feedbacks.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-return-books',
  imports: [CommonModule],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.css'
})
export class ReturnBooksComponent implements OnInit{
  returnedBooks: PageDtoBorrowedBookRsp = {};
  page = 0;
  size = 5;
  message: string = '';
  level: string = 'success';

  constructor(
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (rsp) => {
        this.returnedBooks = rsp;
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.returnedBooks.totalPages as number - 1;
  }

  approveBookReturn(book: BorrowedBookRsp) {
    if (!book.returned) {
      this.level = 'error';
      this.message = 'Book is not returned yet';
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved successfully';
        this.findAllReturnedBooks()
      }
    })
  }
}
