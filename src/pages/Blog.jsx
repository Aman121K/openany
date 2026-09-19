import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BLOG_POSTS } from "../data/blogPosts";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Blog() {
  return (
    <div className="page">
      <SiteHeader />

      <header className="page-hero">
        <div className="badge">
          <span className="badge-dot" /> Guides &amp; tips
        </div>
        <h1>Blog</h1>
        <p>Guides on downloading, formats, and using video tools responsibly.</p>
      </header>

      <main className="blog-list-container">
        <div className="blog-list">
          {BLOG_POSTS.map((post) => (
            <Link to={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
              <div className="blog-card-meta">
                <span>{formatDate(post.date)}</span>
                <span className="blog-dot">·</span>
                <span>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="blog-card-link">Read more →</span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Blog;
