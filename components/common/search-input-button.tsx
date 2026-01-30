import { Search } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchInputButton = () => {
  return (
    <div className="flex rounded-md shadow-xs">
      <Input type="text" placeholder="Search" />
      <Button className="ml-2">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInputButton;
