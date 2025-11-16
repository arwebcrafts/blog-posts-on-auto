/**
 * ContentFlow AI - JavaScript SDK
 * Version: 1.0.0
 *
 * Lightweight SDK for integrating ContentFlow AI with custom websites
 */

(function(window) {
  'use strict';

  const ContentFlow = {
    config: {
      apiKey: null,
      apiUrl: 'https://api.contentflow.ai/v1',
      container: null,
      autoLoad: true,
      limit: 10,
      template: null,
    },

    /**
     * Initialize the SDK
     */
    init: function(options) {
      this.config = { ...this.config, ...options };

      if (!this.config.apiKey) {
        console.error('ContentFlow: API key is required');
        return;
      }

      if (!this.config.container) {
        console.error('ContentFlow: Container element is required');
        return;
      }

      if (this.config.autoLoad) {
        this.loadPosts();
      }

      return this;
    },

    /**
     * Load posts from API
     */
    loadPosts: async function(options = {}) {
      const limit = options.limit || this.config.limit;
      const offset = options.offset || 0;

      try {
        const response = await fetch(`${this.config.apiUrl}/posts/published`, {
          headers: {
            'X-API-Key': this.config.apiKey,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const posts = data.posts || [];

        this.renderPosts(posts);

        return posts;
      } catch (error) {
        console.error('ContentFlow: Failed to load posts', error);
        this.renderError(error.message);
      }
    },

    /**
     * Render posts to container
     */
    renderPosts: function(posts) {
      const container = document.querySelector(this.config.container);

      if (!container) {
        console.error('ContentFlow: Container element not found');
        return;
      }

      // Clear container
      container.innerHTML = '';

      // Use custom template if provided
      if (this.config.template && typeof this.config.template === 'function') {
        posts.forEach(post => {
          const html = this.config.template(post);
          container.insertAdjacentHTML('beforeend', html);
        });
      } else {
        // Use default template
        posts.forEach(post => {
          const html = this.defaultTemplate(post);
          container.insertAdjacentHTML('beforeend', html);
        });
      }
    },

    /**
     * Default post template
     */
    defaultTemplate: function(post) {
      return `
        <article class="contentflow-post" data-post-id="${post.id}">
          ${post.featuredImageUrl ? `
            <div class="contentflow-post-image">
              <img src="${post.featuredImageUrl}" alt="${post.featuredImageAlt || post.title}" />
            </div>
          ` : ''}
          <div class="contentflow-post-content">
            <h2 class="contentflow-post-title">
              <a href="#" onclick="ContentFlow.showPost('${post.id}'); return false;">${post.title}</a>
            </h2>
            ${post.metaDescription ? `
              <p class="contentflow-post-excerpt">${post.metaDescription}</p>
            ` : ''}
            <div class="contentflow-post-meta">
              <span class="contentflow-post-date">${this.formatDate(post.publishedAt)}</span>
              ${post.keywords && post.keywords.length > 0 ? `
                <span class="contentflow-post-tags">
                  ${post.keywords.map(keyword => `<span class="tag">${keyword}</span>`).join('')}
                </span>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    },

    /**
     * Show full post (modal or page)
     */
    showPost: async function(postId) {
      try {
        const response = await fetch(`${this.config.apiUrl}/posts/${postId}`, {
          headers: {
            'X-API-Key': this.config.apiKey,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const post = data.post;

        // Create modal
        this.renderModal(post);
      } catch (error) {
        console.error('ContentFlow: Failed to load post', error);
      }
    },

    /**
     * Render post in modal
     */
    renderModal: function(post) {
      // Create modal overlay
      const modal = document.createElement('div');
      modal.className = 'contentflow-modal';
      modal.innerHTML = `
        <div class="contentflow-modal-overlay" onclick="ContentFlow.closeModal()"></div>
        <div class="contentflow-modal-content">
          <button class="contentflow-modal-close" onclick="ContentFlow.closeModal()">×</button>
          <article>
            <h1>${post.title}</h1>
            ${post.featuredImageUrl ? `
              <img src="${post.featuredImageUrl}" alt="${post.featuredImageAlt || post.title}" class="featured-image" />
            ` : ''}
            <div class="contentflow-post-body">
              ${post.content}
            </div>
          </article>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
    },

    /**
     * Close modal
     */
    closeModal: function() {
      const modal = document.querySelector('.contentflow-modal');
      if (modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    },

    /**
     * Render error message
     */
    renderError: function(message) {
      const container = document.querySelector(this.config.container);
      if (container) {
        container.innerHTML = `
          <div class="contentflow-error">
            <p>Failed to load posts: ${message}</p>
          </div>
        `;
      }
    },

    /**
     * Format date
     */
    formatDate: function(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  };

  // Expose to window
  window.ContentFlow = ContentFlow;

  // Auto-init if data-attributes are present
  document.addEventListener('DOMContentLoaded', function() {
    const autoInit = document.querySelector('[data-contentflow-auto-init]');
    if (autoInit) {
      const apiKey = autoInit.getAttribute('data-api-key');
      const container = autoInit.getAttribute('data-container');

      if (apiKey && container) {
        ContentFlow.init({
          apiKey: apiKey,
          container: container
        });
      }
    }
  });

})(window);

// Default CSS (optional - users can override)
if (!document.getElementById('contentflow-default-css')) {
  const style = document.createElement('style');
  style.id = 'contentflow-default-css';
  style.textContent = `
    .contentflow-post {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fff;
    }

    .contentflow-post-image img {
      width: 100%;
      height: auto;
      border-radius: 6px;
      margin-bottom: 1rem;
    }

    .contentflow-post-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }

    .contentflow-post-title a {
      color: #333;
      text-decoration: none;
    }

    .contentflow-post-title a:hover {
      color: #0066cc;
    }

    .contentflow-post-excerpt {
      color: #666;
      margin-bottom: 1rem;
    }

    .contentflow-post-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
      color: #999;
    }

    .contentflow-post-tags {
      display: flex;
      gap: 0.5rem;
    }

    .contentflow-post-tags .tag {
      padding: 0.25rem 0.5rem;
      background: #f0f0f0;
      border-radius: 4px;
    }

    .contentflow-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
    }

    .contentflow-modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
    }

    .contentflow-modal-content {
      position: relative;
      max-width: 800px;
      max-height: 90vh;
      margin: 5vh auto;
      padding: 2rem;
      background: #fff;
      border-radius: 8px;
      overflow-y: auto;
    }

    .contentflow-modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      border: none;
      background: none;
      font-size: 2rem;
      cursor: pointer;
      color: #999;
    }

    .contentflow-modal-close:hover {
      color: #333;
    }

    .contentflow-error {
      padding: 1rem;
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 4px;
      color: #c00;
    }
  `;
  document.head.appendChild(style);
}
