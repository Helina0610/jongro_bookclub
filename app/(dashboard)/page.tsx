import React from "react";
import BookList from "@/components/books/books-list";
import { Card } from "@/components/ui/card";
import type { BookEntity } from "../books/page";
import DashboardSection from "@/components/dashboard/dashboard-section";

const bookList: BookEntity[] = [
  {
    bookId: "1",
    title: "우아한 유령",
    writer: "장진영",
    genre: "한국소설",
    coverURL: "/bookcover/우아한유령.jpg",
    description: " ",
  },
  {
    bookId: "2",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
];

const DashBoardPage = () => {
  return (
    <div>
      <DashboardSection bookList={bookList}/>
    </div>
  );
};

export default DashBoardPage;
