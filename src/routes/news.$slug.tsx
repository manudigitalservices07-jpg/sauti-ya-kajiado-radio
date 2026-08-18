import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { articles, images } from "@/data/station";
import { supabase } from "@/integrations/supabase/client";
import { CommentSection } from "@/components/CommentSection";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => {
    const a = articles.find((x) => x.slug === params.slug);
    const title = a ? `${a.title} — Bus Radio 99.9FM` : "News story — Bus Radio 99.9FM";
    const description = a?.excerpt ?? "A news story from the Bus Radio 99.9FM newsroom in Kajiado County.";
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: NewsDetail,
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const staticArticle = articles.find((a) => a.slug === slug);

  const { data: dbPost, isLoading } = useQuery({
    queryKey: ["news-post", slug],
    enabled: !staticArticle,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const post = staticArticle
    ? {
        title: staticArticle.title,
        category: staticArticle.category,
        author: staticArticle.author,
        date: staticArticle.date,
        image: staticArticle.image || images.fieldTeam,
        paragraphs: staticArticle.body,
      }
    : dbPost
      ? {
          title: dbPost.title,
          category: dbPost.category,
          author: dbPost.author,
          date: dbPost.created_at.slice(0, 10),
          image: dbPost.image_url || images.studio,
          paragraphs: dbPost.body.split("\n").filter(Boolean),
        }
      : null;

  if (!post) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-bold">{isLoading ? "Loading story…" : "Story not found"}</h1>
        <Link to="/news" className="mt-4 inline-block font-semibold text-primary">
          Back to all news
        </Link>
      </div>
    );
  }

  return (
    <article className="container-x max-w-3xl py-10">
      <Link to="/news" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All news
      </Link>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">{post.category}</p>
      <h1 className="mt-2 text-3xl leading-tight md:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {post.date} · {post.author}
      </p>
      <img src={post.image} alt="" className="mt-6 w-full rounded-2xl object-cover object-top" />
      <div className="mt-6 space-y-4 text-base leading-relaxed">
        {post.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <CommentSection target={`news:${slug}`} />
    </article>
  );
}
