import { Button } from "@/components/ui/button";
import SearchInputButton from "../common/search-input-button";
import SectionTitle from "../common/section-title";

// type SearchSectionTyle = {};

const SearchSection = () => {
  return (
    <div className="">
      <SectionTitle title="Book List" />
      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <Button variant={"secondary"}>전체</Button>
          <Button variant={"secondary"}>국내도서</Button>
          <Button variant={"secondary"}>해외도서</Button>
        </div>
        <div className="w-full max-w-xs space-y-2 ">
          <SearchInputButton />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
