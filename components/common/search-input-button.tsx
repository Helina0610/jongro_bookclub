import { Search } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type SearchInputButtonType = {
  onInputChange: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInputButton = ({ onInputChange }: SearchInputButtonType) => {
  return (
    <div className="flex rounded-md shadow-xs gap-1">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="검색조건" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="title">제목</SelectItem>
            <SelectItem value="author">작가</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input type="text" placeholder="Search" onChange={(e) => onInputChange(e.target.value)} />
      <Button className="ml-2">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInputButton;
