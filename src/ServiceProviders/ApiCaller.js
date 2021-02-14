import HelperMethods from "Helpers/Methods";
import Constants from 'Helpers/Constants'

export const apiFuncPost = function(obj,url,skipToken = false) {
  return new Promise(function(resolve, reject) {
    const formData = JSON.stringify({
      ...obj
    });
   
    HelperMethods.makeNetworkCall(
      url || `/v1/auth/payment_details`,
      formData,
      (resp, isError) => {
        if (!isError) {
          resolve(resp);
        } else {
          reject(isError);
        }
      },
      "POST",
      skipToken
    );
  });
};


export const apiFuncGet = function(url,skipToken = true) {
  return new Promise(function(resolve, reject) {
    HelperMethods.makeNetworkCall(
      url || `/v1/auth/payment_details`,
      {},
      (resp, isError) => {
        if (!isError) {
          resolve(resp);
        } else {
          reject(isError);
        }
      },
      "GET",
      skipToken
    );
  });
};

export const uploadFile = function(obj,token){
  let formData = new FormData();
  formData.append("file", {
    name: `photo1.png`,
    type: "image/jpg",
    uri: obj.uri,
    filename: "image1.jpg",
  });

  return new Promise((resolve,reject)=>{
    fetch(Constants.baseUrl+"/api/fileUploading", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
      body:formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson)
      }).catch(err =>{
        reject(err)
      })
  })
}

