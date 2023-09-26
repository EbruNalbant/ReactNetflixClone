import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import { getGenres, getMovies, setLoading } from "../redux/actions/actions";
import ListMovies from "../components/ListMovies";

const MainPage = () => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store.movieReducer);

  useEffect(() => {
    dispatch(setLoading(true));
    // popüler film verisini çekme ve store'a aktarma
    dispatch(getMovies());
    // kategorileri çekme ve store'a aktarım
    dispatch(getGenres());
  }, []);
  return (
    <div>
      <Hero />
      {/* kategoriler için filmleri listeleyecek bileşenin ekrana basılması*/}
      {state.genres.map((genre) => (
        <ListMovies key={genre.id} genre={genre} />
      ))}
    </div>
  );
};

export default MainPage;
