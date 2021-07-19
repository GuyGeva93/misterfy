import { utilService } from '@/services/util-service';
import { userService } from '@/services/user-service';

export const userStore = {
  strict: true,
  state: {
    currUserId: '',
  },
  getters: {
    currUserId(state) {
      return state.currUserId;
    }
  },
  mutations: {
    setUserId(state) {
      let currUserId = userService.getUserId();
      if (!currUserId) {
        currUserId = utilService.makeNumericId();
        userService.saveUserId(currUserId);
      }
      state.currUserId = currUserId;
    }
  }
};