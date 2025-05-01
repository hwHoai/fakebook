import request from '../../util/request';
import { CookieService } from '../../util/cookieService';
import { firebaseStorage } from '../../config/firebaseStorage';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';

const token = CookieService.getCookie('accessToken');
export class UserInforService {
  static getPublicUserInfo = (userId) => {
    return request({
      url: `user/info/${userId}`,
      method: 'get',
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };

  static uploadImgaeToFirebase = async (storageRef, fileRef) => {
    try {
      if (fileRef.startsWith('blob:')) {
        const firebaseRef = ref(firebaseStorage, storageRef);
        const image = await fetch(fileRef).then((res) => res.blob());

        uploadBytes(firebaseRef, image).then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
          return snapshot;
        });
      }
      if (fileRef.startsWith('data:')) {
        const firebaseRef = ref(firebaseStorage, `${storageRef}.jpg`);
        uploadString(firebaseRef, fileRef).then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
          return snapshot;
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  static getFileFormFirebase = (fileRef) => {
    try {
      const firebaseRef = ref(firebaseStorage, fileRef);
      return getDownloadURL(firebaseRef).then((url) => {
        console.log('File url: ', url);
        return url;
      });
    } catch (error) {
      console.log('Fetch img err', error);
      return error;
    }
  };

  static followAnotherUser = async (userId, profileUserId) => {
    return request({
      url: `user/follow/${profileUserId}`,
      method: 'post',
      data: { userId },
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };

  static unfollowAnotherUser = async (userId, profileUserId) => {
    return request({
      url: `user/unfollow/${profileUserId}`,
      method: 'post',
      data: { userId },
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };

  static checkIfUserIsFollowing = async (userId, profileUserId) => {
    return request({
      url: `user/check_follow/${profileUserId}`,
      method: 'get',
      params: { userId },
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };
}
