import { storageService } from './async-storage-service.js'
import { socketService } from './socket-service.js';
import { botService } from './bot-service.js';
const CHAT_KEY = "chatMsgs";

// let gWatchedStation;

export const chatService = {
    query,
    add,
    botReply,
    getEmptyMsg
}

async function query(stationId) {
    const msgs = await storageService.query(CHAT_KEY);
    return msgs.filter(msg => msg.stationId === stationId);
}
async function add(newMsg) {
    newMsg.sentAt = Date.now();

    const msgs = await storageService.query(CHAT_KEY);
    //Is this his first msg?
    const existMsgSender = msgs.find(msg => !!msg.from._id)
    newMsg.from._id = (existMsgSender) ? existMsgSender.from._id : _getId();
    storageService.post(CHAT_KEY, newMsg);


}

function botReply(newMsg) {
    return new Promise((resolve) => {

        setTimeout(() => {
            const reply = {
                stationId: newMsg.stationId,
                sentAt: Date.now(),
                txt: botService.sendMsg(newMsg),
                from: {
                    name: 'Guest',
                    _id: _getId(),
                }
            };
            storageService.post(CHAT_KEY, reply);
            resolve(reply);
        }, 1500);
    })
}

function getEmptyMsg() {
    return {
        from: {
            name: 'guest',
        },
        txt: ""
    }
}

(async() => {

    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the station (comming from other browsers)
    window.addEventListener('storage', async() => {
        // if (!gWatchedStation) return;
        const freshMsgs = await storageService.query(CHAT_KEY);
        socketService.emit('new msg', freshMsgs);
        // const watchedStation = freshStations.find(station => station._id === gWatchedStation._id)
        // if (!watchedStation) return;
        // if (gWatchedUser.score !== watchedStation.score) {
        //     console.log('Watched user score changed - localStorage updated from another browser')
        //     socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedStation)
        // }
        // gWatchedUser = watchedStation
    })
})();

function _getId() {
    return Date.now() % 1000;
}