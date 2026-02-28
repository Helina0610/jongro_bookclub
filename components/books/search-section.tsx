import SearchFilter from "@/components/common/search-filter";
import SearchInputButton from "@/components/common/search-input-button";

type SearchSectionType = {
  onInputChange: React.Dispatch<React.SetStateAction<string>>;
  onBookTypeChange: React.Dispatch<React.SetStateAction<string>>;
};

const SearchSection = ({ onInputChange, onBookTypeChange }: SearchSectionType) => {
  return (
    <div>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter onBookTypeChange={onBookTypeChange} />
        <div className="w-full sm:max-w-xs">
          <SearchInputButton onInputChange={onInputChange} />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
