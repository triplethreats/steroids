import ILocalStorage from './ILocalStorage';
import IRemoteStorage from './IRemoteStorage';

export function sync(localStorage: ILocalStorage, remoteStorage: IRemoteStorage): void {
    localStorage.getAllSessions().subscribe(localSessions => {
        localSessions.forEach(localSession => {
            remoteStorage.getSession(localSession.id).subscribe(remoteSession => {
                if (localSession.updatedAt > remoteSession.updatedAt) {
                    remoteStorage.updateSession(localSession).subscribe();
                } else if (remoteSession.updatedAt > localSession.updatedAt) {
                    localStorage.updateSession(remoteSession.id, remoteSession.name).subscribe();
                }
            }, _ => {
                remoteStorage.createSession(localSession).subscribe();
            });
        });
    });

    remoteStorage.getAllSessions().subscribe(remoteSessions => {
        remoteSessions.forEach(remoteSession => {
            console.log(remoteSession.id);
            localStorage.getSession(remoteSession.id).subscribe(_ => {}, _ => {
                localStorage.importSession(remoteSession).subscribe();
            });
        });
    });
}
