import axios from 'axios';

const instance = axios.create({
  baseURL:
    `https://firestore.googleapis.com/v1/projects/${process.env.VUE_APP_FIREBASE}/databases/(default)/documents`
});
// axiosの初期登録をさせて他のページで使えるようにしている。
export default instance;
