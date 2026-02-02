import { Bell, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HeaderSection = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        {/* Logo */}
        <div className="font-serif font-bold text-2xl sm:text-3xl">종로책방</div>

        {/* Navigation (desktop only) */}
        <nav className="hidden md:flex font-serif">
          <div className="flex gap-2.5">
            <Button variant="ghost" size="lg" asChild>
              <Link href="/books">Book List</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/wishlist">Wish List</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/community">Community</Link>
            </Button>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>
          <Button variant="secondary" size="icon" asChild>
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
