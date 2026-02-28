import Image from "next/image";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const UserReply = () => {
  return (
    <Card>
      <CardTitle className="px-6 pt-6">My Log</CardTitle>

      <CardContent className="space-y-4">
        {/* Log Item */}
        <div className="flex gap-4 rounded-lg border p-3 hover:bg-muted/50 transition">
          {/* Book Cover */}
          <div className="relative w-20 shrink-0 overflow-hidden rounded-md aspect-2/3">
            <Image src="/bookcover/눈과돌멩이.jpg" alt="눈과돌멩이" fill className="object-cover" />
          </div>

          {/* Log Content */}
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">눈과 돌멩이</div>
            <p className="text-sm text-muted-foreground line-clamp-4 h-2/3">
              Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt
              sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore
              occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut
              eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate
              sunt elit mollit officia ad enim sit consectetur enim.
            </p>
            <span className="text-xs text-muted-foreground">2026-02-01</span>
          </div>
        </div>

        {/* Log Item 2 */}
        <div className="flex gap-4 rounded-lg border p-3 hover:bg-muted/50 transition">
          <div className="relative w-20 shrink-0 overflow-hidden rounded-md aspect-2/3">
            <Image src="/bookcover/우아한유령.jpg" alt="우아한유령" fill className="object-cover" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">눈과 돌멩이</div>
            <p className="text-sm text-muted-foreground line-clamp-4 h-2/3">
              Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt
              sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore
              occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut
              eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate
              sunt elit mollit officia ad enim sit consectetur enim.
            </p>
            <span className="text-xs text-muted-foreground">2026-02-02</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserReply;
