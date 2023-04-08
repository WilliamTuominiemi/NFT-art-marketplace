import { LikeButton } from "@/components/post/like-button";
import { UserHoverCard } from "@/components/post/user-hover-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Like, Post, User } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MoreHorizontal, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post & {
    user: User;
    likes: Like[];
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-3xl">
          <Image
            src={post.image}
            height={1000}
            width={1000}
            alt="Post image"
            className="rounded-2xl p-2"
          />
        </DialogContent>
      </Dialog>

      <div className="group rounded-md border border-slate-200 shadow-md hover:shadow-lg dark:border-slate-800">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md border-b border-slate-200 dark:border-slate-800">
          <Image
            src={post.image}
            height={500}
            width={500}
            alt="Post image"
            onClick={() => setIsOpen(true)}
            className="object-cover object-top transition-all duration-500 hover:cursor-pointer group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col space-y-4 px-4 pb-4 pt-2">
          <div className="flex w-full flex-row justify-between space-x-2">
            <div className="flex flex-row space-x-1 truncate pt-2">
              <UserHoverCard user={post.user}>
                <Link
                  className="text-sm font-medium underline-offset-2 hover:cursor-pointer hover:underline"
                  href={`/user/${post.user.id}`}
                >
                  {post.user.name}
                </Link>
              </UserHoverCard>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {`${"·"} ${dayjs(post.createdAt).fromNow()}`}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              aria-label="More"
              className="rounded-full"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-row space-x-2">
            <LikeButton post={post} />
            <Button
              size="sm"
              variant="ghost"
              aria-label="Share"
              className="px-3 text-blue-400 dark:text-blue-400 dark:hover:text-blue-400"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
