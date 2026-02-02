import SearchFilter from "@/components/common/search-filter";
import SearchInputButton from "@/components/common/search-input-button";

const SearchSection = () => {
  return (
    <div className="">
      <div className="flex justify-between mt-2">
        <SearchFilter />
        <div className="w-full max-w-xs space-y-2 ">
          <SearchInputButton />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
