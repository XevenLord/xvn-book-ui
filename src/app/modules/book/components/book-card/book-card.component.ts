import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookRsp} from "../../../../services/models/book-rsp";
import {CommonModule} from "@angular/common";
import {RatingComponent} from "../rating/rating.component";

@Component({
  selector: 'app-book-card',
  imports: [CommonModule, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  private _book: BookRsp = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined;

  get book(): BookRsp {
    return this._book;
  }

  @Input()
  set book(value: BookRsp) {
    this._book = value;
  }

  get manage() {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64, ' + this._book.cover;
    }
    return 'https://picsum.photos/1900/800';
  }

  @Output() private share: EventEmitter<BookRsp> = new EventEmitter<BookRsp>();
  @Output() private archive: EventEmitter<BookRsp> = new EventEmitter<BookRsp>();
  @Output() private addToWaitingList: EventEmitter<BookRsp> = new EventEmitter<BookRsp>();
  @Output() private borrow: EventEmitter<BookRsp> = new EventEmitter<BookRsp>();
  @Output() private edit: EventEmitter<BookRsp> = new EventEmitter<BookRsp>();
  @Output() private details: EventEmitter<BookRsp> = new EventEmitter<BookRsp>();

  onShowDetails() {
    this.details.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }
}
