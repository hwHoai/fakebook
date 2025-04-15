export const UserInforReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, userAvatar: action.payload.userAvatar, userName: action.payload.userName };

    case 'SET_USER_AVATAR':
      return { ...state, userAvatar: action.payload.userAvatar };
    default:
      return state;
  }
}