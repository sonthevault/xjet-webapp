import axios from "axios";

import LogInterceptor from "./interceptors/log";
import AccessTokenInterceptor from "./interceptors/accessToken";
import UnauthorizeInterceptor from "./interceptors/unauthorize";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getInstance = env => {
  console.log("BASE_URL", BASE_URL);
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    validateStatus: function(status) {
      return status >= 200 && status <= 503;
    }
  });

  instance.interceptors.response.use(
    UnauthorizeInterceptor.onFullfilled,
    UnauthorizeInterceptor.onRejected
  );

  instance.interceptors.request.use(
    LogInterceptor.requestLog,
    LogInterceptor.requestError
  );

  instance.interceptors.response.use(
    LogInterceptor.responseLog,
    LogInterceptor.responseError
  );

  instance.interceptors.request.use(
    AccessTokenInterceptor.addAccessToken,
    AccessTokenInterceptor.onRejected
  );
  return instance;
};

const API = { instance: getInstance() };

API.login = body => {
  return API.instance.post("auth/login", body);
};

API.register = body => {
  return API.instance.post("auth/register", body);
};

API.createOrder = body => {
  return API.instance.post("orders", body);
};

API.getOrder = () => {
  return API.instance.get("orders");
};

API.updateOrder = (body) => {
  return API.instance.put("orders", body);
};


API.confirmEmail = token => {
  return API.instance.get(`/auth/confirmation/${token}`);
};

API.forgotPassword = (body) => {
  return API.instance.post(`/auth/forgot-password/`, body)
}

API.resetPassword = (body) => {
  return API.instance.post(`/auth/reset-password/`, body)
}

API.getReferrals = (query) => {
  return API.instance.get("referrals", {params: query})
}

API.upload = body => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    validateStatus: function(status) {
      return status >= 200 && status <= 503;
    },
    headers: { "content-Type": "application/multipart/form-data" },
  });
  return instance.post("media", body);
};

export default API;
