import axios from "axios";
import { ActionTypes } from "../../constants/actionTypes";
import { options } from "../../constants/constants";

//aksiyon objesi oluşturan bir fonksiyon
export const setLoading = (payload) => ({
  type: ActionTypes.SET_LOADING,
  payload,
});

// API' dan verileri çekme
export const getMovies = () => {
  return async function (dispatch) {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      options
    );
    // gelen veriyi, reducer'a aktarma
    dispatch({
      type: ActionTypes.SET_MOVIES,
      payload: res.data,
    });
  };
};

export const getGenres = () => (dispatch) => {
  //kategori verilerini çekme
  axios
    .get("https://api.themoviedb.org/3/genre/movie/list", options)
    .then((res) =>
      // reducer' a aktarma
      dispatch({
        type: ActionTypes.SET_GENRES,
        payload: res.data.genres,
      })
    )
    .catch((err) => console.log(err));
};
