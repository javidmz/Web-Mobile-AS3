import { useState } from "react";
import { FaShare } from "react-icons/fa";
import AddCard from "./AddCard";

const CardsBar = ({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  isShareIsvisible,
  setIsShareVisible,
  setMessagesToSend,
  handleSend
}) => {
  const [isAddCardVisible, setIsAddCardVisible] = useState(false);

  return (
    <div className="w-4/5 px-4 flex justify-between items-center relative">
      <input
        type="text"
        value={search}
        placeholder="Search Flashcard"
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
        className="outline-none border-2 border-cyan-600 rounded-lg p-2"
      />
      <div className="flex justify-between gap-3 items-center">
        <label htmlFor="filter" className="font-bold text-white">
          Filter
        </label>
        <select
          name="filter"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="outline-none border-2 border-cyan-600 rounded-lg p-2"
        >
          <option value="All" defaultValue={true}>
            --All--
          </option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want To Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <label htmlFor="sort" className="font-bold text-white">
          Sort
        </label>
        <select
          name="sort"
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="outline-none border-2 border-cyan-600 rounded-lg p-2"
        >
          <option value="lastUpdated" defaultValue={true}>Last Updated</option>
          <option value="question">Question</option>
          <option value="answer">Answer</option>
        </select>
      </div>
      <div
        className="px-3 py-2 bg-white font-bold hover:opacity-70 rounded-lg cursor-pointer"
        onClick={() => setIsAddCardVisible(true)}
      >
        + Add New Flashcard
      </div>
      {!isShareIsvisible ? (
        <div
          className="px-3 py-2 bg-white font-bold hover:opacity-70 rounded-lg cursor-pointer flex justify-between items-center gap-2"
          onClick={() => setIsShareVisible(true)}
        >
          <FaShare /> Share
        </div>
      ) : (
        <div className="flex justify-end gap-3">
          <button
            onClick={() => { setIsShareVisible(false); setMessagesToSend([]) }}
            className="p-3 bg-red-700 text-white rounded-lg hover:opacity-70"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="p-3 bg-lime-800 text-white rounded-lg hover:opacity-70"
          >
            Send
          </button>
        </div>
      )}
      {isAddCardVisible && (
        <AddCard setIsAddCardVisible={setIsAddCardVisible} />
      )}
    </div>
  );
};

export default CardsBar;
