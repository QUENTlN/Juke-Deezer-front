import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPlaylistFormComponent } from './add-to-playlist-form.component';

describe('AddToPlaylistFormComponent', () => {
  let component: AddToPlaylistFormComponent;
  let fixture: ComponentFixture<AddToPlaylistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToPlaylistFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToPlaylistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
