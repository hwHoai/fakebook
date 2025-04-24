export const UserInfoReducer = (state, action) => {
  const { userAvatar, userName, userEmail, phoneNumber, userAvatarUrl } = action.payload;
  switch (action.type) {
    case 'SET_USER_AVATAR':
      return { ...state, userAvatar: userAvatar };
    case 'SET_USER_NAME':
      return { ...state, userName: userName };
    case 'SET_USER_EMAIL':
      return { ...state, userEmail: userEmail };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: phoneNumber };
    case 'SET_USER_AVATAR_URL':
      return { ...state, userAvatarUrl: userAvatarUrl };
    case 'SET_USER_INFO':
      return {
        ...state,
        userName: userName,
        userEmail: userEmail,
        phoneNumber: phoneNumber,
        userAvatar: userAvatar,
      };
    default:
      return state;
  }
};
