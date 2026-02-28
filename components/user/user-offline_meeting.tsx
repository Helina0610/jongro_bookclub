import Image from "next/image";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

const UserOfflineMeeting = () => {
  return (
    <Card>
      <CardTitle className="px-6 pt-6">2026 독서모임 현황</CardTitle>
      <CardContent>
        {/* 참여 정보 */}
        <div className="grid gap-4">
          <div>
            <Field className="w-full">
              <FieldLabel htmlFor="progress-upload">
                <span>참여율</span>
                <span className="ml-auto">66%</span>
              </FieldLabel>
              <Progress value={66} id="progress-upload" />
            </Field>
          </div>
          <div className="grid gap-2 grid-cols-4 sm:grid-cols-6 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="relative aspect-square w-12 sm:w-16 lg:w-full overflow-hidden rounded-md border"
              >
                <Image src="/완독도장.png" alt={`stamp-${index}`} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserOfflineMeeting;
