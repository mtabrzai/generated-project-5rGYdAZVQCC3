import { useState, useEffect } from 'react';
import { API_BASE_URL, HTTP_STATUS, QUERY_KEYS } from '../constants';

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} author
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} UsePostsReturn
 * @property {Post[]} posts - List of posts
 * @property {boolean} isLoading - Loading state
 * @property {Error|null} error - Error state
 * @property {() => Promise<void>} refetch - Refetch posts
 * @property {boolean} hasNextPage - Whether more posts are available
 * @property {() => Promise<void>} loadMore - Load more posts
 */

/**
 * Custom hook to fetch and manage posts
 * @param {Object} [options] - Options for posts query
 * @param {number} [options.limit=10] - Number of posts to fetch per request
 * @param {string} [options.author] - Filter posts by author
 * @returns {UsePostsReturn}
 */
export const usePosts = (options = {}) => {
  const { limit = 10, author } = options;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchPosts = async (pageNum = 1, shouldAppend = false) => {
    try {
      setIsLoading(true);
      setError(null);

      let url = `${API_BASE_URL}/posts?page=${pageNum}&limit=${limit}`;
      if (author) {
        url += `&author=${encodeURIComponent(author)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch posts');
      }

      const data = await response.json();

      setPosts(shouldAppend ? [...posts, ...data.data] : data.data);
      setHasNextPage(data.pagination.page * data.pagination.limit < data.pagination.total);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchPosts(1, false);
    setPage(1);
  };

  const loadMore = async () => {
    if (isLoading || !hasNextPage) return;
    const nextPage = page + 1;
    await fetchPosts(nextPage, true);
    setPage(nextPage);
  };

  useEffect(() => {
    fetchPosts();
  }, [limit, author]);

  return {
    posts,
    isLoading,
    error,
    refetch,
    hasNextPage,
    loadMore,
  };
};