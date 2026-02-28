import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionTitle from "../common/section-title";
import CommunityPost from "./community-post";

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
        <CommunityPost />
      </div>
      {/* 사진첩 */}
      <div>
        <SectionTitle title="갤러리" />
        <div>준비중</div>
        {/* <div className="w-full columns-2 sm:columns-3 md:columns-3 gap-4">
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
        </div> */}
      </div>
    </div>
  );
};

export default CommunitySection;
