import fetch from "node-fetch";
import isNil from "lodash/isNil"; 

const cleanNullishParams  = (params) => {
  const object = {...params}; 
  if(object){
    Object.keys(params).map((key) => {
      isNil(params[key]) && delete params[key];
    })
  }
  return object;
}

const fetchJson = ({
  endPoint,
  method = "GET",
  body,
  headers : moreHeaders,
  cookie,
}) => {
  let headers = {
    accept: "application/json",
  };
  if(method !== "GET"){
    headers["Content-type"] = "application/json";
  };
  if(cookie) {
    headers.cookie = cookie;
  };
  if(disableCache){
    headers["Cache-Control"] = "no-cache, no-store";
  }
  if(moreHeaders){
    Object.assign(headers, moreHeaders);
  }

  return fetch(
    process.env.origin+`${endPoint}`,
    {
      method,
      headers,
      body: body && JSON.stringify(body),
    }
  ).then(response => response.json());
};

const getJson = ({
  endPoint,
  params,
  headers,
  cookie,
}) => {
  return fetchJson({
    endPoint:`${endPoint}?${new URLSearchParams(cleanNullishParams(params))}`,
    headers,
    cookie,
  });
}

const postJson = (params) => {
  return fetchJson({
    method: "POST",
    ...params,
  })
};

const deleteJson = (params) => {
  return fetchJson({
    method: "DELETE",
    ...params,
  })
}

const putJson = (params) => {
  return fetchJson({
    method: "PUT",
    ...params,
  })
}

const api = {
  getJson,
  fetchJson,
  postJson,
  putJson,
  deleteJson,
}

export default api;