import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoFormComponent } from './notificacao-form.component';

describe('NotificacaoFormComponent', () => {
  let component: NotificacaoFormComponent;
  let fixture: ComponentFixture<NotificacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacaoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
