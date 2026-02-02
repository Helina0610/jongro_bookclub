import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import type { BookEntity } from "@/app/books/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

type BookContent = {
  book: BookEntity;
};

const BookContent = ({ book }: BookContent) => {
  const { bookId, coverURL, genre, title, writer, description } = book;
  const tags = ["한국소설"];
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="relative w-80 aspect-2/3 overflow-hidden rounded-lg">
            <Image src={coverURL} alt={book.title} fill className="object-cover" />
          </div>
        </div>

        {/* Book Info */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
          <p className="text-muted-foreground text-lg">
            {writer} · {"까치"}
          </p>

          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant={"outline"}>
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-4" />

          <div>
            <h2 className="text-xl font-semibold mb-2">책 소개</h2>
            <p className="leading-relaxed text-muted-foreground">{book.description}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <div className="">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/두산망곰잠옷.jpg" alt="@user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            <InputGroup>
              <InputGroupTextarea id="block-end-textarea" placeholder="Write a comment..." />
              <InputGroupAddon align="block-end">
                <InputGroupText>0/280</InputGroupText>
                <InputGroupButton variant="default" size="sm" className="ml-auto">
                  Post
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar className="h-10 w-10">
          <AvatarImage src="/두산망곰잠옷.jpg" alt="@user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Comment Body */}
        <div className="flex-1 rounded-lg border bg-muted/40 px-4 py-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="text-sm font-medium">사용자명</div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <p className="mt-2 text-sm leading-relaxed">
            담담하게 지나갈 일이 아닌데 잊어버리고 언급하기 꺼려하는 모습들을 볼 때 주인공들이 얼마나 힘들었는지 짐작할
            수 있었다.
          </p>

          {/* Footer */}
          <p className="mt-3 text-xs text-muted-foreground">2026-02-01</p>
        </div>
      </div>
    </div>
  );
};

export default BookContent;
