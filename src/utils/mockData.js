/**
 * Mock data utilities for development and testing
 */

import { ENABLE_MOCK_DATA } from '../constants';

/**
 * @typedef {Object} MockPost
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} author
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} MockUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatarUrl]
 */

/**
 * Generate mock posts
 * @param {number} count - Number of posts to generate
 * @returns {MockPost[]}
 */
export const generateMockPosts = (count = 10) => {
  const posts = [];
  const authors = [
    'John Doe',
    'Jane Smith',
    'Alex Johnson',
    'Sarah Williams',
    'Michael Brown',
    'Emily Davis',
    'David Wilson',
    'Jessica Martinez'
  ];

  for (let i = 0; i < count; i++) {
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);

    posts.push({
      id: `post-${i + 1}`,
      title: `Sample Post Title ${i + 1}`,
      content: `This is the content for post ${i + 1}. It contains some sample text to demonstrate how a blog post might look in the application. The content can be multiple paragraphs long and may include various formatting options.`,
      author: authors[Math.floor(Math.random() * authors.length)],
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString()
    });
  }

  return posts;
};

/**
 * Generate mock users
 * @param {number} count - Number of users to generate
 * @returns {MockUser[]}
 */
export const generateMockUsers = (count = 10) => {
  const users = [];
  const domains = ['example.com', 'test.com', 'demo.com', 'mail.com'];

  for (let i = 0; i < count; i++) {
    const firstName = `User${i + 1}`;
    const lastName = `Lastname${i + 1}`;
    const domain = domains[Math.floor(Math.random() * domains.length)];

    users.push({
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      avatarUrl: i % 3 === 0 ? `https://i.pravatar.cc/150?img=${i + 1}` : undefined
    });
  }

  return users;
};

/**
 * Check if mock data should be used
 * @returns {boolean}
 */
export const shouldUseMockData = () => {
  return ENABLE_MOCK_DATA;
};

/**
 * Mock fetch implementation for development
 * @param {string} url - API endpoint
 * @param {RequestInit} [options] - Fetch options
 * @returns {Promise<Response>}
 */
export const mockFetch = async (url, options = {}) => {
  if (!shouldUseMockData()) {
    throw new Error('Mock data is disabled');
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body) : null;

  // Mock posts endpoints
  if (url.startsWith('/api/posts')) {
    if (method === 'GET') {
      if (url === '/api/posts') {
        const searchParams = new URLSearchParams(url.split('?')[1]);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const author = searchParams.get('author');

        const allPosts = generateMockPosts(50);
        let filteredPosts = author
          ? allPosts.filter(post => post.author === author)
          : allPosts;

        const total = filteredPosts.length;
        const pages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedPosts = filteredPosts.slice(start, end);

        return new Response(JSON.stringify({
          success: true,
          data: paginatedPosts,
          pagination: {
            page,
            limit,
            total,
            pages
          }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (url.match(/\/api\/posts\/post-\d+/)) {
        const postId = url.split('/').pop();
        const allPosts = generateMockPosts(50);
        const post = allPosts.find(p => p.id === postId);

        if (post) {
          return new Response(JSON.stringify({
            success: true,
            data: post
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({
            success: false,
            message: 'Post not found'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    } else if (method === 'POST') {
      const newPost = {
        id: `post-${Math.floor(Math.random() * 1000)}`,
        title: body.title,
        content: body.content,
        author: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return new Response(JSON.stringify({
        success: true,
        data: newPost
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (method === 'PUT') {
      const postId = url.split('/').pop();
      const updatedPost = {
        id: postId,
        title: body.title,
        content: body.content,
        author: 'Current User',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      };

      return new Response(JSON.stringify({
        success: true,
        data: updatedPost
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (method === 'DELETE') {
      return new Response(JSON.stringify({
        success: true,
        message: 'Post deleted successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Mock users endpoints
  if (url.startsWith('/api/users')) {
    if (method === 'GET') {
      const searchParams = new URLSearchParams(url.split('?')[1]);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');

      const allUsers = generateMockUsers(50);
      const total = allUsers.length;
      const pages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedUsers = allUsers.slice(start, end);

      return new Response(JSON.stringify({
        success: true,
        data: paginatedUsers,
        pagination: {
          page,
          limit,
          total,
          pages
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Mock auth endpoints
  if (url === '/api/auth/login' && method === 'POST') {
    const { email, password } = body;

    if (email === 'admin@example.com' && password === 'password') {
      return new Response(JSON.stringify({
        success: true,
        message: 'Login successful',
        data: {
          token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
          user: {
            id: 'user-1',
            name: 'Admin User',
            email: 'admin@example.com'
          }
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (email === 'user@example.com' && password === 'password') {
      return new Response(JSON.stringify({
        success: true,
        message: 'Login successful',
        data: {
          token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
          user: {
            id: 'user-2',
            name: 'Regular User',
            email: 'user@example.com'
          }
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid credentials'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (url === '/api/auth/register' && method === 'POST') {
    return new Response(JSON.stringify({
      success: true,
      message: 'Registration successful',
      data: {
        token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
        user: {
          id: `user-${Math.floor(Math.random() * 1000)}`,
          name: body.name,
          email: body.email
        }
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (url === '/api/auth/refresh' && method === 'POST') {
    return new Response(JSON.stringify({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
        user: {
          id: 'user-1',
          name: 'Admin User',
          email: 'admin@example.com'
        }
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Default response for unmocked endpoints
  return new Response(JSON.stringify({
    success: false,
    message: 'Endpoint not mocked'
  }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
};