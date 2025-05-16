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
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };

  static uploadImageToFirebase = async (storageRef, fileRef) => {
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
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };

  static unfollowAnotherUser = async (userId, profileUserId) => {
    return request({
      url: `user/unfollow/${profileUserId}`,
      method: 'post',
      data: { userId },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };

  static checkIfUserIsFollowing = async (userId, profileUserId) => {
    return request({
      url: `user/check_follow/${profileUserId}`,
      method: 'get',
      params: { userId },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` }
    });
  };

  static searchUser = async (query) => {
    return request({
      url: `user/search`,
      method: 'get',
      params: { query },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    });
  };

  static searchUserProfile = async (query, userId) => {
    return request({
      url: `user/search_profile`,
      method: 'get',
      params: { query, userId },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    });
  };

  static getRecommendUsers = async (userId) => {
    return request({
      url: `user/recommend/${userId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    });
  };

  static getContacts = async (userId) => {
    return request({
      url: `user/contacts/${userId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    });
  };

  static updateUserAvatar = async (userId, avatarName) => {
    return request({
      url: `user/update/user_avatar`,
      method: 'patch',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
      data: { userId, avatarName }
    });
  };
}
