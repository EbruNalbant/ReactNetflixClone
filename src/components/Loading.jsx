import gif from "../assets/loading.gif";
const Loading = () => {
  return (
    <div className="loading">
      <img className="gif" src={gif} />
    </div>
  );
};

export default Loading;
