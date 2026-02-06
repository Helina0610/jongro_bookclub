import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionTitle from "../common/section-title";

const posts = [
  {
    post_id: 1,
    post_title: "2025년도 연말 독서모임 어워즈 결과",
    post_context:
      "한 해 동안 가장 활발히 활동해주신 분들과 인기 도서를 선정했습니다. 참여해주신 모든 분들께 감사드립니다!",
    post_date: "2025.12.13",
    post_user_id: "홍주",
    top: true,
  },
  {
    post_id: 2,
    post_title: "2026년 1월 독서모임 안내",
    post_context: "2026년 첫 독서모임은 1월 셋째 주에 진행될 예정입니다. 자세한 일정과 장소는 추후 공지하겠습니다.",
    post_date: "2025.12.28",
    post_user_id: "홍주",
    top: false,
  },
  {
    post_id: 3,
    post_title: "12월 선정 도서 공지",
    post_context: "12월 독서모임 선정 도서는 『눈과 돌멩이』입니다. 미리 읽고 자유롭게 의견을 나눠주세요.",
    post_date: "2025.12.05",
    post_user_id: "홍주",
    top: false,
  },
  {
    post_id: 4,
    post_title: "독서모임 후기 공유 이벤트",
    post_context: "독서모임 후기를 남겨주신 분들 중 추첨을 통해 소정의 상품을 드립니다. 많은 참여 부탁드려요!",
    post_date: "2025.11.20",
    post_user_id: "홍주",
    top: false,
  },
  {
    post_id: 5,
    post_title: "커뮤니티 이용 규칙 안내",
    post_context: "모두가 즐거운 독서모임을 위해 기본적인 커뮤니티 이용 규칙을 확인해주세요.",
    post_date: "2025.11.01",
    post_user_id: "홍주",
    top: false,
  },
];

const images = [
  {
    url: "/images/20250920_134125.jpg",
    title: "1",
  },
  {
    url: "/images/20250927_095229.jpg",
    title: "2",
  },
  {
    url: "/images/20251012_185700.jpg",
    title: "3",
  },
  {
    url: "/images/20251016_194915.jpg",
    title: "4",
  },
  {
    url: "/images/20251031_133141.jpg",
    title: "5",
  },
  {
    url: "/images/20251213_122313.jpg",
    title: "6",
  },
];

const CommunitySection = () => {
  return (
    <div>
      {/* 공지사항 */}
      <div>
        <SectionTitle title="공지사항" />
        <div className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">제목</TableHead>

                {/* PC 이상에서만 표시 */}
                <TableHead className="hidden sm:table-cell">내용</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead className="hidden sm:table-cell text-right">작성자</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.post_id}>
                  <TableCell className="font-medium">{post.post_title}</TableCell>
                  <TableCell className="hidden sm:table-cell">{post.post_context}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{post.post_date}</TableCell>
                  <TableCell className="hidden sm:table-cell text-right">{post.post_user_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="h-4" />
        </div>
      </div>
      {/* 사진첩 */}
      <div>
        <SectionTitle title="사진" />

        <div className="w-full columns-2 sm:columns-3 md:columns-3 gap-4">
          {images.map((image) => (
            <div key={image.title} className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg">
              <Image
                src={image.url}
                alt={image.title}
                title={image.title}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
