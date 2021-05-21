import { useState } from "react";
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";
const DropDown = ({ sortBy, orderBy, onSortChange, onOrderChange }) => {
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onSortChange("petName")}
        >
          Pet Name {sortBy === "petName" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onSortChange("ownerName")}
        >
          Owner Name {sortBy === "ownerName" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onSortChange("aptDate")}
        >
          Date {sortBy === "aptDate" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem"
          onClick={() => onOrderChange("asc")}
        >
          Asc {orderBy === "asc" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onOrderChange("desc")}
        >
          Desc {orderBy === "desc" && <BiCheck />}
        </div>
      </div>
    </div>
  );
};

const Search = ({
  onQueryChange,
  query,
  sortBy,
  onSortChange,
  orderBy,
  onOrderChange,
}) => {
  const [toggleDropDown, settoggleDropDown] = useState(false);

  const dropDownHandler = () => {
    settoggleDropDown(!toggleDropDown);
  };
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search"
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={dropDownHandler}
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      {toggleDropDown && (
        <DropDown
          sortBy={sortBy}
          orderBy={orderBy}
          onSortChange={(mySort) => onSortChange(mySort)}
          onOrderChange={(myOrder) => onOrderChange(myOrder)}
        />
      )}
    </div>
  );
};

export default Search;
