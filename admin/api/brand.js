const BrandApi = {
  create: (axios, payload) => {
    return axios.$post("/api/brand/", payload);
  },
  list : (axios, payload = null) => {
    let payload_arr = [];
    if (payload) {
      for (let key in payload) {
        payload_arr.push(key + "=" + payload[key]);
      }
    }
    // console.log(payload_arr);return false;
    return axios.$get("api/brand?" + payload_arr.join("&"));
  },
  getAll: (axios) => {
    return axios.$get("/api/brand?all=1");
  },
  delete: (axios, id) => {
    return axios.$delete("/api/brand/" + id);
  },
  show: (axios, id) => {
    return axios.$get("/api/brand/" + id);
  },
  update(axios, payload, id) {
    return axios.$put("/api/brand/" + id, payload);
  },
};
export { BrandApi };
