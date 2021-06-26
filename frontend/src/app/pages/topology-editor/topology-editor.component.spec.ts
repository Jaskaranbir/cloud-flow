import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologyEditorComponent } from './topology-editor.component';

describe('TopologyEditorComponent', () => {
  let component: TopologyEditorComponent;
  let fixture: ComponentFixture<TopologyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopologyEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
