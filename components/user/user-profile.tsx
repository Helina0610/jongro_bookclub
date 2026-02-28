import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import type { UsersResponse } from "@/database/types/users";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const UserProfile = () => {
  const { data: session } = useSession();
  const user_sn = session?.user?.id;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [user, setUser] = React.useState<UsersResponse>();
  const [edit, setEdit] = React.useState(false);

  const fetchUser = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const parms = new URLSearchParams();
      if (user_sn) parms.append("user_sn", user_sn);

      const res = await fetch(`/api/users?${parms.toString()}`);

      if (!res.ok) {
        throw new Error("사용자 조회 실패");
      }

      const data: UsersResponse[] = await res.json();
      setUser(data[0]);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [user_sn]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) {
    return <p>데이터 없음</p>;
  }

  if (edit) {
    return (
      <EditProfile
        user={user}
        onCancel={() => setEdit(false)}
        onSaved={async () => {
          await fetchUser();
          setEdit(false);
        }}
      />
    );
  }

  return (
    <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
      <div className="relative aspect-square w-40 sm:w-48 lg:w-60 overflow-hidden rounded-full">
        <Image alt="사진" src="/두산망곰잠옷.jpg" fill />
      </div>

      <div className="mt-4 text-center lg:text-left space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold">{user.user_name}</h1>
        <p className="text-muted-foreground">{user.user_id}</p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto lg:mx-0">
          {/* 책 읽는 걸 좋아하는 개발자 📚 종로책방 커뮤니티 회원 */}
          {user.profile_context}
        </p>
        <p className="text-sm text-muted-foreground">{user.profile_sns}</p>
        <Button className="mt-3 w-full sm:w-60" onClick={() => setEdit(true)}>
          수정
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;

type EditProfileType = {
  user: UsersResponse;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  onSaved: () => Promise<void>;
};

const EditProfile = ({ user, onCancel, onSaved }: EditProfileType) => {
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("user_sn", user.user_sn);
    formData.append("user_id", user.user_id);

    const res = await fetch("/api/users", {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      alert(error.error ?? "저장 실패");
      return;
    }

    alert("저장되었습니다");
    onCancel(false); // 🔥 핵심
    await onSaved();
  };
  return (
    <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
      <form onSubmit={handleSubmit}>
        <div className="relative aspect-square w-40 sm:w-48 lg:w-60 overflow-hidden rounded-full">
          <Image alt="사진" src="/두산망곰잠옷.jpg" fill />
          {/* TODO: 이미지 저장 */}
          <Input type="file" id="profile_image" />
        </div>

        <div className="mt-4 text-center lg:text-left space-y-1">
          <Field>
            <FieldLabel htmlFor="user_name">이름</FieldLabel>
            <Input id="user_name" name="user_name" placeholder="사용자 이름" defaultValue={user.user_name} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="user_id">아이디</FieldLabel>
            <Input id="user_id" name="user_id" placeholder="사용자 이름" value={user.user_id} disabled />
          </Field>
          <Field>
            <FieldLabel htmlFor="profile_sns">SNS</FieldLabel>
            <Input id="profile_sns" name="profile_sns" placeholder="sns" defaultValue={user.profile_sns ?? ""} />
          </Field>
          <Field>
            <FieldLabel htmlFor="profile_context">소개</FieldLabel>
            <Textarea
              id="profile_context"
              name="profile_context"
              placeholder="소개"
              defaultValue={user.profile_context ?? ""}
            />
          </Field>
          <Button type="submit" className="mt-3 w-full sm:w-60">
            저장
          </Button>
        </div>
      </form>
    </div>
  );
};
