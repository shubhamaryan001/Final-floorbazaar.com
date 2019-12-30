import { API } from "../config";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Coupon Api's
export const createCoupon = (token, coupon) => {
  console.log(JSON.stringify(coupon));
  return fetch(`${API}/coupon/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(coupon)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCoupon = ({ code }) => {
  return fetch(`${API}/coupon/${code}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getUserBalance = ({ userId }) => {
  return fetch(`${API}/wallet/balance/${userId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const addUserWallet = payload => {
  return fetch(`${API}/wallet/add/${payload.userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`
    },
    body: JSON.stringify(payload.wallet)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deductUserWallet = payload => {
  return fetch(`${API}/wallet/deduct/${payload.userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`
    },
    body: JSON.stringify(payload.wallet)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderStatus = (
  userId,
  token,
  orderId,
  status,
  orderEmail,
  orderMobile
) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status, orderId, orderEmail, orderMobile })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getSingleOrder = (orderId, userId, token) => {
  return fetch(`${API}/order/${userId}/${orderId}`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderPlaced = (userId, token, orderId, placed) => {
  return fetch(`${API}/order/${orderId}/placed/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ placed, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderProcessing = (userId, token, orderId, processing) => {
  return fetch(`${API}/order/${orderId}/processing/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ processing, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderUnderconstruction = (
  userId,
  token,
  orderId,
  underconstruction
) => {
  return fetch(`${API}/order/${orderId}/underconstruction/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ underconstruction, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderReady = (userId, token, orderId, ready) => {
  return fetch(`${API}/order/${orderId}/ready/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ ready, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderFinished = (userId, token, orderId, finished) => {
  return fetch(`${API}/order/${orderId}/finished/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ finished, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderFile1 = (orderId, userId, token, order) => {
  return fetch(`${API}/file/${orderId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: order
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
