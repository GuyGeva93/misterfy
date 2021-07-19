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
  try {
    const msgs = await storageService.query(CHAT_KEY)
    return msgs.filter(msg => msg.stationId === stationId)
  } catch (err) {
    console.log('Error on chat service =>', err)
  }
}
async function add(newMsg) {
  newMsg.sentAt = Date.now()
  try {
    storageService.post(CHAT_KEY, newMsg)
  } catch (err) {
    console.log('Error on chat service =>', err)
  }
}

function botReply(newMsg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reply = {
        stationId: newMsg.stationId,
        sentAt: Date.now(),
        txt: botService.sendMsg(newMsg),
        from: {
          name: 'Botify',
          _id: '',
        }
      };
      storageService.post(CHAT_KEY, reply)
      resolve(reply)
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

(async () => {

  // Dev Helper: Listens to when localStorage changes in OTHER browser

  // Here we are listening to changes for the station (comming from other browsers)
  window.addEventListener('storage', async () => {
    // if (!gWatchedStation) return;
    const freshMsgs = await storageService.query(CHAT_KEY)
    socketService.emit('new msg', freshMsgs)
    // const watchedStation = freshStations.find(station => station._id === gWatchedStation._id)
    // if (!watchedStation) return;
    // if (gWatchedUser.score !== watchedStation.score) {
    //     console.log('Watched user score changed - localStorage updated from another browser')
    //     socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedStation)
    // }
    // gWatchedUser = watchedStation
  })
})()