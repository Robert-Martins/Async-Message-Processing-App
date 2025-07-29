import { TestBed } from '@angular/core/testing';

import { NotificacaoWsService } from './notificacao-ws.service';

describe('NotificacaoWsService', () => {
  let service: NotificacaoWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacaoWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
