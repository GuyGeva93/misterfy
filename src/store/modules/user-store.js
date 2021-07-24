import { utilService } from '@/services/util-service';
import { userService } from '@/services/user-service';

export const userStore = {
  strict: true,
  state: {
    currUserId: '',
    loggedinUser: userService.getLoggedinUser(),
    users: [],
  },
  getters: {
    //Guest Mode
    currUserId({ currUserId }) { return currUserId },
    loggedinUser({ loggedinUser }) { return loggedinUser },
    users({ users }) { return users },
  },
  mutations: {
    setUserId(state) {
      let currUserId = userService.getUserId();
      if (!currUserId) {
        currUserId = utilService.makeNumericId();
        userService.saveUserId(currUserId);
      }
      state.currUserId = currUserId;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    setLoggedinUser(state, { user }) {
      state.loggedinUser = user
    },
    updateUser(state, { user }) {
      state.loggedinUser = user
    }
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: 'setLoggedinUser', user })
        return user;
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        // userCred.likedSongs = []
        userCred.likedStations = []
        const user = await userService.signup(userCred)
        commit({ type: 'setLoggedinUser', user })
        return user;
      } catch (err) {
        console.log('userStore: Error in signup', err)
        throw err
      }

    },
    async logout({ commit }) {
      try {
        await userService.logout()
        commit({ type: 'setLoggedinUser', user: null })
      } catch (err) {
        console.log('userStore: Error in logout', err)
        throw err
      }
    },
    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers();
        commit({ type: 'setUsers', users })
      } catch (err) {
        console.log('userStore: Error in loadUsers', err)
        throw err
      }
    },
    // async likedSong({ commit }, { song }) {
    //   try {
    //     const currUser = this.getters.loggedinUser
    //     if (!currUser) return
    //     if (!currUser.likedSongs || !currUser.likedSongs.length) {
    //       currUser.likedSongs = stationService.getEmptyStation()
    //       currUser.likedSongs.name = 'Songs I liked'
    //       currUser.likedSongs.description = 'My favorites!'
    //       currUser.likedSongs.imgUrl = '@/src/assets/img/heart.png'
    //       currUser.likedSongs.tags.push('favorites')
    //       currUser.likedSongs.createdAt = Date.now()
    //       currUser.likedSongs.createdBy = currUser.fullname
    //       currUser.likedSongs.songs.push(song)
    //     } else {
    //       const idx = currUser.likedSongs.findIndex(s => s.id === song.id)
    //       if (idx < 0) currUser.likedSongs.push(song)
    //       else currUser.likedSongs.splice(idx, 1)
    //     }
    //     commit({ type: 'setLoggedinUser', user: currUser })
    //     const updatedUser = await userService.update(currUser)
    //     console.log('updatedUser', updatedUser)
    //   } catch (err) {
    //     console.log('Error on likedSong')
    //     throw err
    //   }
    // },
    async likedStation({ commit }, { station }) {
      try {
        const currUser = this.getters.loggedinUser
        if (!currUser) return
        const idx = currUser.likedStations.findIndex(s => s._id === station._id)
        if (idx < 0) {
          currUser.likedStations.push(station)
          station.likedByUsers += 1
        }
        else {
          currUser.likedStations.splice(idx, 1)
          station.likedByUsers -= 1
        }
        this.dispatch({ type: 'saveStation', station })
        commit({ type: 'setLoggedinUser', user: currUser })
        const updatedUser = await userService.update(currUser)
        console.log('updatedUser', updatedUser)
      } catch (err) {
        console.log('Error on likedStation')
        throw err
      }
    }
  }

};