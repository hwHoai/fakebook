import { DEFAULT_AVATAR_FILENAME } from "../../../constant/general";
import { UserInforService } from "../../user/userInforService";

export class UserClientService {
  static setUserAvatarUrlToUserInfoProvider = (userId, userAvatarName, dispatch) => {
    if (userAvatarName === DEFAULT_AVATAR_FILENAME) {
      UserInforService.getFileFormFirebase(userAvatarName).then((url) => {
        dispatch({
          type: 'SET_USER_AVATAR_URL',
          payload: {
            userAvatarUrl: url
          }
        });
      });
    } else {
      UserInforService.getFileFormFirebase(`images/${userId}/avatar/${userAvatarName}`).then((url) => {
        dispatch({
          type: 'SET_USER_AVATAR_URL',
          payload: {
            userAvatarUrl: url
          }
        });
      });
    }
  };
}