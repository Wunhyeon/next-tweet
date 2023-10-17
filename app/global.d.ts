import { Database as DB } from "@/lib/database.types";

type Tweet = DB["public"]["Tables"]["tweets"]["Row"];
type Profiles = DB["public"]["Tables"]["profiles"]["Row"];

declare global {
  type Database = DB;
  type TweetWithAuthor = Tweet & {
    // intersection type
    author: Profiles;
    likes: number;
    user_has_liked_tweet: boolean;
  };
}
