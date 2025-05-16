export const UserInfoReducer = (state, action) => {
  const {userId, userAvatar, userName, userEmail, phoneNumber, userAvatarUrl } = action.payload;
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: userId };
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
        userId: userId,
        userAvatar: userAvatar,
        userName: userName,
        userEmail: userEmail,
        phoneNumber: phoneNumber,
        userAvatarUrl: userAvatarUrl
      };
    default:
      return state;
  }
};
