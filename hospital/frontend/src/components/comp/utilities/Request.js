import Cookies from "universal-cookie";

const cookies = new Cookies();

const addRefreshToken = (token) => {
    cookies.set("refresh_token", token, { path: "/" });
}

const RefreshTokenCall = async (setAuthToken, setAuthenticated) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/refresh/", {
      credentials: "same-origin",
    });

    const data = await res.json();

    if (
      data["error"] === "Not a valid token" ||
      data["error"] === "No refresh token detected"
    ) {
      setAuthenticated(false);
      throw Error();
    } else {
      setAuthToken(data["token"]);
      setAuthenticated(true);
    }
  } catch (err) {
    console.log("Login again : token not found " + err);
  }
};

const onLogin = async (obj, setAuthToken, setAuthenticated) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();
    setAuthToken(data["token"]);
    setAuthenticated(true);
    addRefreshToken(data["refresh_token"]);
    localStorage.setItem("username", data["username"]);
    localStorage.setItem("id", data["id"]);
  } catch (err) {
    alert("Enter Correct Username and Password");
  }
};


const onSignUp = async (obj, setAuthToken, setAuthenticated) => {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            if (res.ok) {
              return res;
            } else {
              throw Error(`bad request ${res.status}`);
            }
          })
          .catch(console.error);
  
        const data = await res.json();
  
        if (data["created"] == 0) {
          alert(data["error"]);
        } else {
          setAuthToken(data["token"]);
          setAuthenticated(true);
          addRefreshToken(data["refresh_token"]);
          localStorage.setItem("username", data["username"]);
          localStorage.setItem("id", data["id"]);
        }
      } catch (err) {
        alert("Enter Correct Username and Password");
      }
};


const updateTimeTable = async (obj, authToken, setTimeTable) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/time-table/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),

    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();

    setTimeTable(data);
    
  } catch (err) {}
};

const BookSlot = async (obj, authToken) => {
  try {
    
    const res = await fetch("http://127.0.0.1:8000/api/booking/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "token " + authToken,
      },
      body: JSON.stringify(obj),

    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();
      console.log(data)

  } catch (err) {}
};

const userBookingDetail = async (authToken, setBookings) => {
  try {
    
    const res = await fetch("http://127.0.0.1:8000/api/booking/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "token " + authToken,
      },

    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();
    setBookings(data)

  } catch (err) {}
};


const deleteBookedSlot = async (obj, authToken) => {
  try {
    
    const res = await fetch("http://127.0.0.1:8000/api/delete-booked-slot/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "token " + authToken,
      },
      body: JSON.stringify(obj),

    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();
    alert(data)

  } catch (err) {}
};

export { RefreshTokenCall };
export { onLogin };
export { onSignUp };
export { updateTimeTable };
export { BookSlot };
export { userBookingDetail };
export { deleteBookedSlot };