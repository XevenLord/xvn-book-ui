import {Component, OnInit} from '@angular/core';
import {PageDtoBorrowedBookRsp} from "../../../../services/models/page-dto-borrowed-book-rsp";
import {CommonModule} from "@angular/common";
import {BorrowedBookRsp} from "../../../../services/models/borrowed-book-rsp";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackReq} from "../../../../services/models/feedback-req";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "../../components/rating/rating.component";
import {FeedbacksService} from "../../../../services/services/feedbacks.service";

@Component({
  selector: 'app-borrowed-book-list',
  imports: [CommonModule, FormsModule, RatingComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.css'
})
export class BorrowedBookListComponent implements OnInit {
  borrowedBooks: PageDtoBorrowedBookRsp = {};
  feedbackReq: FeedbackReq = {bookId: 0, comment: ""};
  selectedBook: BorrowedBookRsp | undefined = undefined;
  page = 0;
  size = 5;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbacksService
  ) {}

  returnBorrowedBook(book: BorrowedBookRsp) {
    this.selectedBook = book;
    this.feedbackReq.bookId = book.id as number;
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (rsp) => {
        this.borrowedBooks = rsp;
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    })
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackReq
    }).subscribe({
      next: () => {
      }
    })
  }
}
