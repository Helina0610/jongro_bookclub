import SearchFilter from "@/components/common/search-filter";
import SearchInputButton from "@/components/common/search-input-button";

const SearchSection = () => {
  return (
    <div>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter />
        <div className="w-full sm:max-w-xs">
          <SearchInputButton />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
