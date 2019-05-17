import { TestBed } from '@angular/core/testing';

import { PersistanceService } from './persistance.service';
import Exercice from 'src/model/Exercice';

describe('PersistanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    const service: PersistanceService = TestBed.get(PersistanceService);
    service.dropLocalDatabase();
  });

  it('should be created', () => {
    const service: PersistanceService = TestBed.get(PersistanceService);
    expect(service).toBeTruthy();
  });

  it('should enable to create sessions', done => {
    const service: PersistanceService = TestBed.get(PersistanceService);
    service.createSession('test').subscribe(session => {
      service.getAllSessions().subscribe(sessions => {
        expect(session).not.toBeUndefined();
        expect(sessions.length).toEqual(1);
        expect(sessions[0]).toEqual(session);
        done();
      });
    });
  });

  it('should enable to delete sessions', done => {
    const service: PersistanceService = TestBed.get(PersistanceService);
    service.createSession('test').subscribe(session => {
      service.deleteSession(session.id);
      service.getAllSessions().subscribe(sessions => {
        expect(sessions.length).toEqual(0);
        done();
      });
    });
  });

  it ('should enable to add exercices to a session', done => {
    const service: PersistanceService = TestBed.get(PersistanceService);
    service.createSession('testSession').subscribe(session => {
      service.addExercice(session.id, 'testExercice', '').subscribe(exercice => {
        service.getSession(session.id).subscribe(sessionWithExercice => {
          expect(sessionWithExercice.exercices.length).toEqual(1);
          expect(sessionWithExercice.exercices[0]).toEqual(exercice);
          done();
        });
      });
    });
  });

  it ('should enable to remove exercices from a session', done => {
    const service: PersistanceService = TestBed.get(PersistanceService);
    service.createSession('testSession').subscribe(session => {
      service.addExercice(session.id, 'testExercice', '').subscribe(exercice => {
        service.deleteExercice(exercice.id);
        service.getSession(session.id).subscribe(sessionWithExercice => {
          expect(sessionWithExercice.exercices.length).toEqual(0);
          done();
        });
      });
    });
  });
});
