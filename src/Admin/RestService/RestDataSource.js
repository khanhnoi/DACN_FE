import Axios from "axios";

export class RestDataSource {
  constructor(base_url, errorCallback) {
    this.BASE_URL = base_url;
    this.handleError = errorCallback;
  }

  GetData(callback) {
    this.SendRequest("get", this.BASE_URL, callback, {}, {}, true);
  }

  async GetDataEachPage(callback, params) {
    this.SendRequest("get", this.BASE_URL, callback, {}, params, true);
  }

  async GetDataSearch(callback, params, property, text){
    this.SendRequestWithKey(this.BASE_URL, property, params, text, callback, true);
  }

  GetDataWithId(callback, id) {
    this.SendRequest(
      "get",
      `${this.BASE_URL}?id=${id}`,
      callback,
      {},
      {},
      true
    );
  }

  async UpdateWithToken(data, callback) {
    this.SendRequest("put", this.BASE_URL, callback, data, {}, true);
  }

  async Store(data, callback) {
    this.SendRequest("post", this.BASE_URL, callback, {}, data);
  }

  async Update(data, callback) {
    this.SendRequest(
      "put",
      `${this.BASE_URL}?id=${data.id}`,
      callback,
      {},
      data
    );
  }

  async Delete(data, callback) {
    this.SendRequest(
      "delete",
      `${this.BASE_URL}?id=${data.id}`,
      callback,
      data,
      {},
      true
    );
  }

  async Login(data, callback) {
    this.SendRequest("post", this.BASE_URL, callback, {}, data);
  }

  async Logout(callback) {
    this.SendRequest("post", this.BASE_URL, callback, {}, {}, true);
  }

  async SendRequest(method, url, callback, data, params, headers) {
    try {
      callback(
        (
          await Axios.request({
            method: method,
            url: url,
            data: data,
            params: params,
            headers: headers
              ? {
                  Authorization:
                    "Bearer " + sessionStorage.getItem("token_jwt_easybuy"),
                }
              : {},
            // {'Authorization': 'Bearer '+ localStorage.getItem("token_jwt_easybuy") }
          })
        ).data
      );
    } catch (err) {
      if (!headers) {
        this.handleError("Đăng nhập thất bại, xin thử lại");
      } else {
        this.handleError("Có lỗi xảy ra!");
      }
    }
  }

  async SendRequestWithKey(url, property, params, text, callback, headers) {
    try {
      console.log("property + params: " + property + ",,," + params);
      Axios.get(url, {
        headers: headers
          ? {
              Authorization:
                "Bearer " + sessionStorage.getItem("token_jwt_easybuy"),
            }
          : {},
        params: {
          ...params,
          [property]: text
        }
      }).then(response => callback(response.data));
    } catch (err) {
      this.handleError(err);
    }
  }
  
  getUnduplicatedData(arr){
    let result = [];
    arr.forEach(a => {
      if(!result.includes(a)){
        result.push(a);
      }
    });
    return result;
  }
}
