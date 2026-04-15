import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDeletePage } from './edit-delete.page';

describe('EditDeletePage', () => {
  let component: EditDeletePage;
  let fixture: ComponentFixture<EditDeletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
