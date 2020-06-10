export const create = (userId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = () => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "GET",
    })
      // This returns the json response with the user's information.
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};


export const singlePost = (postId) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "GET",
    })
      // This returns the json response with the post information.
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err))
  );
};

// export const listByUser = (userId) => {
//   return (
//     fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         'Content-Type': "application/json",
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       // This returns the json response with the user's information.
//       .then((response) => {
//         return response.json();
//       })
//       .catch((err) => console.log(err))
//   );
// };

export const remove = (postId, token) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "DELETE",
      headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
      // This returns the json response with the user's information.
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const update = (postId, token, post) => {
  return fetch (`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
      },
      body: post
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};