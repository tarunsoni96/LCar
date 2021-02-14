import HelperMethods from "Helpers/Methods";


export const mutateGraph = function(apolloClient,vars,scheme) {
  return new Promise(function(resolve, reject) {
    apolloClient
        .mutate({
          mutation: scheme,
          variables: vars,
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        });
  });
};


export const queryGraph = function(apolloClient,vars,scheme) {
  return new Promise(function(resolve, reject) {
    apolloClient
        .query({
          query: scheme,
          variables: vars,
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        });
  });
};


