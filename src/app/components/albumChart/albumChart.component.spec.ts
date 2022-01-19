import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumChartComponent } from './albumChart.component';

describe('albumChartComponent', () => {
  let component: AlbumChartComponent;
  let fixture: ComponentFixture<AlbumChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
