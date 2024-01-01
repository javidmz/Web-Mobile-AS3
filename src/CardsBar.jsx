import { useEffect, useState } from "react";

const CardsBar = ({ search, setSearch, filter, setFilter, sort, setSort }) => {

    // useEffect(() => {

    // }, [search, status, sort]);

  return (
    <div className="w-4/5 px-4 flex justify-between">
        <div className="w-4/5 flex justify-between">
            <div className="flex items-center gap-3">
                <input
                type="text"
                value={search}
                placeholder="Search Flashcard"
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none border-2 border-cyan-600 rounded-lg p-2"
                />
                <button type="submit" className="bg-white w-20 rounded-lg py-2 font-bold hover:opacity-60">Search</button>
            </div>
            <div className="flex justify-between gap-3 items-center">
                <label htmlFor="filter" className="font-bold text-white">Filter</label>
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
                <label htmlFor="sort" className="font-bold text-white">Sort</label>
                <select
                    name="sort"
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="outline-none border-2 border-cyan-600 rounded-lg p-2"
                >
                    <option value="None" defaultValue={true}>
                    --None--
                    </option>
                    <option value="lastUpdated">Last Updated</option>
                    <option value="question">Question</option>
                    <option value="answer">Answer</option>
                </select>

            </div>
        </div>
        <div>+ Add New Flashcard</div>
    </div>
  );
};

export default CardsBar;
