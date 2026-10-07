/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if the API request was successful
 * @property {number} [statusCode] - HTTP status code
 * @property {string} [message] - Response message
 * @property {*} [data] - Response data
 */

/**
 * @typedef {Object} ApiError
 * @property {boolean} success - Always false for errors
 * @property {number} statusCode - HTTP status code
 * @property {string} message - Error message
 * @property {Object} [errors] - Detailed error information
 */

/**
 * @typedef {Object} Pagination
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {number} total - Total number of items
 * @property {number} pages - Total number of pages
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success - Indicates if the API request was successful
 * @property {number} statusCode - HTTP status code
 * @property {string} message - Response message
 * @property {Array<*>} data - Array of items
 * @property {Pagination} pagination - Pagination metadata
 */