import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BLOG_POSTS, getPostBySlug } from "../data/blogPosts";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} — Video Downloader Blog`;
    return () => {
      document.title = "Video Downloader - Download Facebook, Instagram, YouTube & TikTok Videos Free";
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="page">
      <SiteHeader />

      <header className="page-hero">
        <div className="badge">
          <span className="badge-dot" /> {formatDate(post.date)} · {post.readTime}
        </div>
        <h1>{post.title}</h1>
      </header>

      <main className="legal-container blog-post">
        <Link to="/blog" className="blog-back-link">
          ← Back to all guides
        </Link>

        {post.sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </div>
        ))}

        <div className="blog-cta">
          <p>Ready to try it yourself?</p>
          <Link to="/" className="link-btn">
            Go to the downloader →
          </Link>
        </div>

        {otherPosts.length > 0 && (
          <div className="blog-related">
            <h2>More guides</h2>
            <div className="blog-related-list">
              {otherPosts.map((p) => (
                <Link to={`/blog/${p.slug}`} key={p.slug} className="blog-related-item">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default BlogPost;
