import { Clock, MapPin } from "lucide-react";
import type { BookEntity } from "@/app/books/page";
import BookList from "../books/books-list";
import SectionTitle from "../common/section-title";
import TanstackTable from "../common/tanstack-table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type DashboardSectionType = {
  bookList: BookEntity[];
};

const events = [
  {
    title: "Team Sync Meeting",
    from: "2025-06-12T09:00:00",
    to: "2025-06-12T10:00:00",
  },
  {
    title: "Design Review",
    from: "2025-06-12T11:30:00",
    to: "2025-06-12T12:30:00",
  },
  {
    title: "Client Presentation",
    from: "2025-06-12T14:00:00",
    to: "2025-06-12T15:00:00",
  },
];

const relayBook: BookEntity[] = [
  {
    bookId: "12",
    title: "우아한 유령",
    writer: "장진영",
    genre: "한국소설",
    coverURL: "/bookcover/안녕이라그랬어.jpg",
    description: " ",
  },
];
const DashboardSection = ({ bookList }: DashboardSectionType) => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Section Title */}
        <SectionTitle title="2월 독서모임" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 📅 일정 */}
          <Card>
            <CardHeader>
              <CardTitle>일정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="rounded-md border p-3 text-sm space-y-2">
                  <div className="font-medium">2월 독서모임</div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    혜화역
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    2026.02.01
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 📚 이번 달 도서 */}
          <Card>
            <CardHeader>
              <CardTitle>이번 달 도서</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <BookList bookList={bookList} />
              </div>
            </CardContent>
          </Card>

          {/* 🔁 릴레이 도서 */}
          <Card>
            <CardHeader>
              <CardTitle>이번 달 릴레이 도서</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <BookList bookList={relayBook} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>공지사항</CardTitle>
            </CardHeader>
            <CardContent>
              <TanstackTable />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>사진첩</CardTitle>
            </CardHeader>
            <CardContent>준비중</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
