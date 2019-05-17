import ILocalStorage from './ILocalStorage';
import IRemoteStorage from './IRemoteStorage';

export function sync(localStorage: ILocalStorage, remoteStorage: IRemoteStorage): void {
    localStorage.getAllSessions().subscribe(localSessions => {
        localSessions.forEach(localSession => {
            remoteStorage.getSession(localSession.id).subscribe(remoteSession => {
                if (Date.parse(localSession.updatedAt) > Date.parse(remoteSession.updatedAt)) {
                    remoteStorage.updateSession(localSession).subscribe();
                } else if (Date.parse(localSession.updatedAt) < Date.parse(remoteSession.updatedAt)) {
                    localStorage.deleteSession(remoteSession.id).subscribe();
                    localStorage.importSession(remoteSession).subscribe();
                }
            }, _ => {
                remoteStorage.createSession(localSession).subscribe();
            });
        });
    });

    remoteStorage.getAllSessions().subscribe(remoteSessions => {
        remoteSessions.forEach(remoteSession => {
            localStorage.getSession(remoteSession.id).subscribe(_ => {}, _ => {
                localStorage.importSession(remoteSession).subscribe();
            });
        });
    });
}
