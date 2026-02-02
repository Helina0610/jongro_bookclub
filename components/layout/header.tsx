import { Bell, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HeaderSection = () => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="font-serif font-bold text-3xl">종로책방</div>
        <div className="flex justify-between font-serif">
          <div className="flex gap-2.5">
            <div>
              <Button variant={"ghost"} size={"lg"}>
                <Link href="/books">Book List</Link>
              </Button>
            </div>
            <div>
              <Button variant={"ghost"} size={"lg"}>
                <Link href="/wishlist">Wish List</Link>
              </Button>
            </div>
            <div>
              <Button variant={"ghost"} size={"lg"}>
                <Link href="/community">Community</Link>
              </Button>
            </div>
          </div>
          {/* <div className="w-full max-w-xs space-y-2 ">
          <div className="flex rounded-md shadow-xs">
            <Input type="text" placeholder="Search" />
            <Button className="ml-2">
              <Search />
            </Button>
          </div>
        </div> */}
        </div>
        <div className="mr-2">
          <Button variant={"ghost"} className="mr-2">
            <Bell />
          </Button>
          <Button variant={"secondary"}>
            <Link href="/user">
              <User />
            </Link>
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default HeaderSection;
