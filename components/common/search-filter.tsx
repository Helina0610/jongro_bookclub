import { Button } from "@/components/ui/button";

type ButtonsType = {
  variant: "secondary" | "link" | "default" | "destructive" | "outline" | "ghost" | null | undefined;
  value: string;
};
const buttons: ButtonsType[] = [
  { variant: "secondary", value: "전체" },
  { variant: "secondary", value: "국내도서" },
  { variant: "secondary", value: "해외도서" },
  { variant: "secondary", value: "책후보" },
  { variant: "secondary", value: "릴레이독서" },
];

const SearchFilter = () => {
  return (
    <div className="flex gap-2">
      {buttons.map((button) => (
        <Button key={button.value} variant={button.variant}>
          {button.value}
        </Button>
      ))}
    </div>
  );
};

export default SearchFilter;
