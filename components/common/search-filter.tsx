import { Button } from "@/components/ui/button";

type ButtonsType = {
  variant: "secondary" | "link" | "default" | "destructive" | "outline" | "ghost" | null | undefined;
  value: string;
};
const buttons: ButtonsType[] = [
  { variant: "secondary", value: "전체" },
  { variant: "secondary", value: "국내도서" },
  { variant: "secondary", value: "해외도서" },
  { variant: "secondary", value: "릴레이독서" },
];

type SearchFilterType = {
  onBookTypeChange: React.Dispatch<React.SetStateAction<string>>;
  selectedBookType: string;
};

const SearchFilter = ({ onBookTypeChange, selectedBookType }: SearchFilterType) => {
  return (
    <div className="flex gap-2 overflow-auto">
      {buttons.map((button) => {
        const isActive = selectedBookType === button.value;

        return (
          <Button
            key={button.value}
            variant={isActive ? "default" : button.variant}
            onClick={() => onBookTypeChange(button.value)}
            className={isActive ? "text-white font-semibold" : "font-medium"}
          >
            {button.value}
          </Button>
        );
      })}
    </div>
  );
};

export default SearchFilter;
