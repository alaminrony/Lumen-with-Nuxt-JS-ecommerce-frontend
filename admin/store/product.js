import { ProductApi } from "../api/product";

export const state = () => ({
  product: {
    title: "",
    description: "",
    price: "",
    amount: "",
    discount: "",
    discount_start_date: "",
    discount_end_date: "",
    category_id: "",
    product_code: "",
    brand_id: "",
    featured: 0,
  },
  files: [],
  files_preview: [],
  features: [],
  product_list: {},
  page: 1,
  filterData: {
    id: "",
    title: "",
    category_id: "",
    from_price: "",
    to_price: "",
    amount: "",
    product_code: "",
    brand_id: "",
  },
  gallery: [],
});

export const mutations = {
  setProduct(state, payload) {
    if (payload.key === "price") {
      payload.value = parseFloat(payload.value);
    } else if (payload.key === "amount" || payload.key === "discount") {
      payload.value = parseInt(payload.value);

      if (
        payload.key === "discount" &&
        (payload.value > 100 || payload.value < 0)
      ) {
        payload.value = 0;
      }
    }

    state.product[payload.key] = payload.value;
  },
  setFiles(state, files) {
    let files_array = [];

    for (let i = 0; i < files.length; i++) {
      files_array.push(files[i]);
    }
    state.files = files_array;
  },
  appendFilesPreview(state, base64) {
    state.files_preview.push(base64);
  },
  clearFilesPreview(state) {
    state.files_preview = [];
  },
  appendToFeatures(state, data) {
    state.features.push(data);
  },
  resetFeatures(state) {
    state.features = [];
  },
  updateFeatureValue(state, data) {
    state.features.map((feature) => {
      if (feature.field_id === data.id) {
        feature.field_value = data.value;
      }
    });
  },
  resetProduct(state) {
    for (let key in state.product) {
      state.product[key] = "";
    }

    state.files = [];
    state.files_preview = [];
    state.features = [];
    state.gallery = [];
  },
  setGallery(state, data) {
    state.gallery = data;
  },
  setProductList(state, products) {
    state.product_list = products;
  },
  setPage(state, page) {
    state.page = page;
  },
  setFilterData(state, value) {
    state.filterData[value.key] = value.val;
  },
};

export const actions = {
  create({ commit, state, dispatch }, payload) {
    commit("shared/resetStatusMessagesParameters", null, { root: true });
    commit(
      "shared/setStatusMessageParameter",
      { key: "showLoading", val: true },
      { root: true }
    );

    const dataToSend = {};
    dataToSend.product = state.product;
    dataToSend.features = state.features;
    dataToSend.files = state.files;

    ProductApi.create(this.$axios, dataToSend)
      .then((response) => {
        commit(
          "shared/setStatusMessageParameter",
          { key: "showLoading", val: false },
          { root: true }
        );
        if (response.success) {
          commit(
            "shared/setStatusMessageParameter",
            { key: "success_message", val: response.message },
            { root: true }
          );
        }

        setTimeout(() => {
          commit("resetProduct");
          payload.router.push("/product");
        }, 2000);
      })
      .catch((err) => {
        dispatch("showValidationErrors", err);
      })
      .finally(() => {
        setTimeout(() => {
          commit("shared/resetStatusMessagesParameters", null, { root: true });
          // commit('resetProduct');
        }, 10000);
      });
  },

  listProducts({ commit }, payload = null) {
    ProductApi.list(this.$axios, payload).then((response) => {
      commit("setProductList", response.products);
    });
  },

  delete({ commit, state }, id) {
    commit("shared/resetStatusMessagesParameters", null, { root: true });
    commit(
      "shared/setStatusMessageParameter",
      { key: "showLoading", val: true },
      { root: true }
    );

    ProductApi.delete(this.$axios, id)
      .then((response) => {
        commit(
          "shared/setStatusMessageParameter",
          { key: "showLoading", val: false },
          { root: true }
        );
        if (response.success) {
          let productList = { ...state.product_list };
          productList.data = productList.data.filter((item) => item.id !== id);

          commit("setProductList", productList);
          commit(
            "shared/setStatusMessageParameter",
            { key: "success_message", val: response.message },
            { root: true }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          commit("shared/resetStatusMessagesParameters", null, { root: true });
        }, 5000);
      });
  },

  show({ commit, state, dispatch, rootState }, id) {},
  update({ commit, dispatch, state }, payload) {},
  removeImage({ commit, state }, id) {},
  showValidationErrors({ commit }, err) {
    commit(
      "shared/setStatusMessageParameter",
      { key: "showLoading", val: false },
      { root: true }
    );
    if (err.response.data) {
      commit(
        "shared/setStatusMessageParameter",
        { key: "error_message", val: err.response.data.message },
        { root: true }
      );
      if (err.response.data.errors) {
        let errors = [];
        for (let key in err.response.data.errors) {
          errors.push(err.response.data.errors[key][0]);
        }

        commit(
          "shared/setStatusMessageParameter",
          { key: "validation_errors", val: errors },
          { root: true }
        );
      }
    }
  },
};
