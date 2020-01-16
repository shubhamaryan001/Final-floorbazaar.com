import { API } from "../config";

export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
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

export const update = (userId, token, user) => {
  console.log("USER DATA UPDATE: ", user);
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updatePhoto = (userId, token, user) => {
  return fetch(`${API}/photo/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};

export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/orders/by/user/${userId}`, {
    method: "GET",
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

export const getOrdersHistory = (userId, token) => {
  return fetch(`${API}/orders/by/${userId}`, {
    method: "GET",
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

export const updateOrderCancelled = (userId, token, orderId, cancelled) => {
  return fetch(`${API}/order/${orderId}/cancelled/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ cancelled, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateSecondPayment = (userId, token, orderId, secondpayment) => {
  return fetch(`${API}/order/${orderId}/secondpayment/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ secondpayment, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const GetUser = (token, userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
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

export const GetAllUsers = token => {
  return fetch(`${API}/users`, {
    method: "GET",
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

export const GetAllAdmin = token => {
  return fetch(`${API}/adminusers`, {
    method: "GET",
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

export const GetUserByName = (token, name) => {
  return fetch(`${API}/byName/${name}`, {
    method: "GET",
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

export const GetAllMessages = (token, senderId, receiverId) => {
  return fetch(`${API}/chat-messages/${senderId}/${receiverId}`, {
    method: "GET",
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

export const SendMessage = (
  token,
  senderId,
  senderName,
  receiverId,
  receiverName,
  message
) => {
  return fetch(`${API}/chat-messages/${senderId}/${receiverId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      token,
      senderId,
      senderName,
      receiverId,
      receiverName,
      message
    })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const MarkReceiverMsg = (token, senderName, receiverName) => {
  return fetch(`${API}/receiver-messages/${senderName}/${receiverName}`, {
    method: "GET",
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

export const MarkAllMsg = (token, Name) => {
  return fetch(`${API}/mark-all-messages/${Name}`, {
    method: "GET",
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
