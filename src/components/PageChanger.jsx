import { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PageChanger = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.page]);

  return (
    <div className="w-4/5 xs:w-[325px] h-10 mx-auto my-10 flex	text-slate-50">
      {props.page != 1 ? (
        <Link
          to={props.page != 1 ? `/cards/${props.page - 1}` : ""}
          className="w-1/4 h-full"
          onClick={() => { props.setPage(props.page - 1); props.setFilter("All"); props.setSearch("") }}
        >
          <button
            className={`w-full h-full flex items-center justify-center border-2 border-white bg-slate-700 rounded-l-lg text-sm font-semibold ${
              props.page != 1 ? "hover:bg-white hover:text-black" : ""
            }`}
          >
            <FaArrowLeft className="mr-2" /> Prev
          </button>
        </Link>
      ) : (
        <button
          className={`w-1/4 h-full flex items-center justify-center border-2 border-white bg-slate-700 rounded-l-lg text-sm font-semibold`}
          disabled={true}
        >
          <FaArrowLeft className="mr-2" /> Prev
        </button>
      )}
      <div className="w-1/2 h-full flex items-center justify-center border-2 border-white bg-white text-black font-semibold">
        Page {props.page} of {props.totalPages}
      </div>
      {props.page != props.totalPages ? (
        <Link
          to={`/cards/${props.page + 1}`}
          className="w-1/4 h-full"
          onClick={() => { props.setPage(props.page + 1); props.setFilter("All"); props.setSearch("") }}
        >
          <button
            className={`w-full h-full flex items-center justify-center border-2 border-white bg-slate-700 rounded-r-lg text-sm font-semibold ${
              props.page != props.totalPages
                ? "hover:bg-white hover:text-black"
                : ""
            }`}
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        </Link>
      ) : (
        <button
          className={`w-1/4 h-full flex items-center justify-center border-2 border-white bg-slate-700 rounded-r-lg text-sm font-semibold`}
          disabled={true}
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default PageChanger;