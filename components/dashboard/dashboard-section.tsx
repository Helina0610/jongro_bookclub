import { Clock, MapPin } from "lucide-react";
import type { BookEntity } from "@/app/books/page";
import BookList from "../books/books-list";
import SectionTitle from "../common/section-title";
import { Card, CardContent } from "../ui/card";

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
    <div>
      <div className="space-y-4">
        <SectionTitle title="2월 독서모임" />

        <Card>
          <CardContent>
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-muted-foreground">일정</h3>
              <div className="relative rounded-md border p-3 pl-6 text-sm ">
                <div className="font-medium">2월 독서모임</div>
                <div className="text-xs text-muted-foreground">
                  <MapPin />
                  혜화역
                </div>
                <div className="text-xs text-muted-foreground">
                  <Clock />
                  2026.02.01
                </div>
              </div>
              {/* {events.map((event) => (
                <div
                  key={event.title}
                  className="relative rounded-md border bg-muted/50 p-3 pl-6 text-sm
                         before:absolute before:left-2 before:top-3 before:h-2 before:w-2
                         before:rounded-full before:bg-primary"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-muted-foreground">{event.from}</div>
                </div>
              ))} */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 🗓 Schedule */}

                {/* 📚 Book List */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">이번 달 도서</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <BookList bookList={bookList} />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">이번 달 릴레이도서</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <BookList bookList={relayBook} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSection;
