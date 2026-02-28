"use client";
import { EllipsisVertical, Heart, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
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
import { useBooks } from "@/lib/hooks/use_book";
import { Button } from "../ui/button";

type BookContentType = {
  bookSn: string;
};

const BookContent = ({ bookSn }: BookContentType) => {
  const { books } = useBooks({ bookSn: bookSn });

  if (books.length === 0) return;
  const book = books[0];
  const { title, author, publisher, book_cover, book_category, book_description, wish_yn, book_type } = book;
  const tags = book_category?.split(">") ?? [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="relative w-80 aspect-2/3 overflow-hidden rounded-lg">
            <Image src={book_cover ?? ""} alt={title ?? ""} fill className="object-cover" />
          </div>
        </div>

        {/* Book Info */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <Button variant={"ghost"}>
              <Heart className="h-5 w-5" fill={wish_yn === "Y" ? "currentColor" : "none"} />
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            {author} · {publisher}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="default">{book_type}</Badge>
            <Separator orientation="vertical" />
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="leading-relaxed text-muted-foreground text-sm">2026-02-14</p>
          <Separator className="my-2" />
          <div>
            <h2 className="text-xl font-semibold mb-2">책 소개</h2>
            <p className="leading-relaxed text-muted-foreground">{book_description}</p>
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
        <Avatar className="h-10 w-10">
          <AvatarImage src="/두산망곰잠옷.jpg" alt="@user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        ;
        <div className="flex-1 rounded-lg border px-4 py-3">
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
        ;
      </div>
    </div>
  );
};

export default BookContent;
