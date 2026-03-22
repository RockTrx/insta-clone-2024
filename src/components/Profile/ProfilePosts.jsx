import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProfilePosts({ posts }) {
  return (
    <div className="post-section">
      <div className="posts-container">
        {!posts ? (
          <>
            <Skeleton count={3} width={300} height={300} />
          </>
        ) : posts?.length > 0 ? (
          posts.map((post) => {
            return (
              <div key={post.docid} className="post">
                <img
                  src={post.imageSrc}
                  className="post-image"
                  alt={post.caption}
                />
                <div className="post-hover-wrapper">
                  <p className="post-hover-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="post-hover-icons"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.likes.length}
                  </p>

                  <p className="post-hover-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="post-hover-icons"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.comments.length}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-posts"> No Posts Shared</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePosts;
