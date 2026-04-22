import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: false
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Input() searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  onSearch() {
    this.search.emit();
  }

  onClear() {
    this.searchTerm = '';
    this.searchTermChange.emit('');
    this.clear.emit();
  }
}
