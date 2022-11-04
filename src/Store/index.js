import { atom } from "recoil"

export const reorder = atom({
  key: "reorder",
  default: {
    isReorder: false,
    menu: "",
    style: "",
    place: "",
  },
});

export const authInfo = atom({
  key: "authInfo",
  default: {
    isAuthLoading: true,
    isLogin: false,
    uid: '',
  }
})