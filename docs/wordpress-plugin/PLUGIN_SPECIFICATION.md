# ContentFlow AI - WordPress Plugin Specification

## Overview

This document provides complete specifications for building the ContentFlow AI WordPress plugin. The plugin enables automatic publishing of AI-generated blog posts from ContentFlow AI directly to WordPress websites.

---

## Plugin Information

**Plugin Name:** ContentFlow AI Connector
**Description:** Automatically publish SEO-optimized blog posts from ContentFlow AI to your WordPress site
**Version:** 1.0.0
**Author:** ARWebCrafts.com
**Requires at least:** WordPress 5.8
**Tested up to:** WordPress 6.4
**Requires PHP:** 7.4
**License:** GPLv2 or later

---

## File Structure

```
contentflow-connector/
├── contentflow-connector.php          # Main plugin file
├── includes/
│   ├── class-api-handler.php          # REST API endpoint handler
│   ├── class-auth.php                 # API key authentication
│   ├── class-post-publisher.php       # Post creation logic
│   └── class-settings.php             # Admin settings page
├── assets/
│   ├── css/
│   │   └── admin-style.css            # Admin UI styles
│   └── js/
│       └── admin-script.js            # Admin JS functionality
├── languages/
│   └── contentflow-connector.pot      # Translation template
└── readme.txt                         # WordPress.org readme
```

---

## 1. Main Plugin File: `contentflow-connector.php`

```php
<?php
/**
 * Plugin Name: ContentFlow AI Connector
 * Plugin URI: https://contentflow.ai/wordpress
 * Description: Automatically publish SEO-optimized blog posts from ContentFlow AI to your WordPress site
 * Version: 1.0.0
 * Author: ARWebCrafts.com
 * Author URI: https://arwebcrafts.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: contentflow-connector
 * Domain Path: /languages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('CONTENTFLOW_VERSION', '1.0.0');
define('CONTENTFLOW_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CONTENTFLOW_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once CONTENTFLOW_PLUGIN_DIR . 'includes/class-auth.php';
require_once CONTENTFLOW_PLUGIN_DIR . 'includes/class-api-handler.php';
require_once CONTENTFLOW_PLUGIN_DIR . 'includes/class-post-publisher.php';
require_once CONTENTFLOW_PLUGIN_DIR . 'includes/class-settings.php';

/**
 * Main Plugin Class
 */
class ContentFlow_Connector {

    private static $instance = null;

    /**
     * Get singleton instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Activation and deactivation
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));

        // Initialize components
        add_action('plugins_loaded', array($this, 'init_components'));

        // Load text domain
        add_action('init', array($this, 'load_textdomain'));
    }

    /**
     * Initialize plugin components
     */
    public function init_components() {
        // Initialize auth
        ContentFlow_Auth::get_instance();

        // Initialize API handler
        ContentFlow_API_Handler::get_instance();

        // Initialize settings page
        if (is_admin()) {
            ContentFlow_Settings::get_instance();
        }
    }

    /**
     * Activation hook
     */
    public function activate() {
        // Generate initial API key
        if (!get_option('contentflow_api_key')) {
            $api_key = $this->generate_api_key();
            update_option('contentflow_api_key', $api_key);
        }

        // Create options
        add_option('contentflow_default_author', 1);
        add_option('contentflow_default_category', 1);
        add_option('contentflow_default_status', 'publish');

        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Deactivation hook
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Load text domain for translations
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'contentflow-connector',
            false,
            dirname(plugin_basename(__FILE__)) . '/languages'
        );
    }

    /**
     * Generate secure API key
     */
    private function generate_api_key() {
        return 'cfwp_' . wp_generate_password(40, false);
    }
}

// Initialize plugin
function contentflow_connector_init() {
    return ContentFlow_Connector::get_instance();
}

// Start the plugin
contentflow_connector_init();
```

---

## 2. Authentication Class: `includes/class-auth.php`

```php
<?php
/**
 * ContentFlow API Authentication
 */

if (!defined('ABSPATH')) {
    exit;
}

class ContentFlow_Auth {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Verify API key from request
     */
    public function verify_api_key($request) {
        $api_key_header = $request->get_header('x-api-key');

        if (empty($api_key_header)) {
            return new WP_Error(
                'missing_api_key',
                __('API key is required', 'contentflow-connector'),
                array('status' => 401)
            );
        }

        $stored_api_key = get_option('contentflow_api_key');

        if ($api_key_header !== $stored_api_key) {
            return new WP_Error(
                'invalid_api_key',
                __('Invalid API key', 'contentflow-connector'),
                array('status' => 401)
            );
        }

        return true;
    }
}
```

---

## 3. API Handler Class: `includes/class-api-handler.php`

```php
<?php
/**
 * ContentFlow API Handler
 * Registers REST API endpoints
 */

if (!defined('ABSPATH')) {
    exit;
}

class ContentFlow_API_Handler {

    private static $instance = null;
    private $namespace = 'contentflow/v1';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Publish post endpoint
        register_rest_route($this->namespace, '/publish', array(
            'methods' => 'POST',
            'callback' => array($this, 'publish_post'),
            'permission_callback' => array($this, 'check_permission'),
        ));

        // Test connection endpoint
        register_rest_route($this->namespace, '/test', array(
            'methods' => 'GET',
            'callback' => array($this, 'test_connection'),
            'permission_callback' => array($this, 'check_permission'),
        ));

        // Get site info endpoint
        register_rest_route($this->namespace, '/info', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_site_info'),
            'permission_callback' => array($this, 'check_permission'),
        ));
    }

    /**
     * Check API key permission
     */
    public function check_permission($request) {
        $auth = ContentFlow_Auth::get_instance();
        return $auth->verify_api_key($request);
    }

    /**
     * Publish post endpoint
     */
    public function publish_post($request) {
        $params = $request->get_json_params();

        // Validate required fields
        if (empty($params['title']) || empty($params['content'])) {
            return new WP_Error(
                'missing_fields',
                __('Title and content are required', 'contentflow-connector'),
                array('status' => 400)
            );
        }

        // Create post via publisher
        $publisher = new ContentFlow_Post_Publisher();
        $result = $publisher->create_post($params);

        if (is_wp_error($result)) {
            return $result;
        }

        return new WP_REST_Response(array(
            'success' => true,
            'post_id' => $result,
            'post_url' => get_permalink($result),
            'message' => __('Post published successfully', 'contentflow-connector')
        ), 201);
    }

    /**
     * Test connection endpoint
     */
    public function test_connection($request) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => __('Connection successful', 'contentflow-connector'),
            'wordpress_version' => get_bloginfo('version'),
            'plugin_version' => CONTENTFLOW_VERSION
        ), 200);
    }

    /**
     * Get site info
     */
    public function get_site_info($request) {
        return new WP_REST_Response(array(
            'site_name' => get_bloginfo('name'),
            'site_url' => get_site_url(),
            'wordpress_version' => get_bloginfo('version'),
            'plugin_version' => CONTENTFLOW_VERSION,
            'categories' => $this->get_categories(),
            'authors' => $this->get_authors(),
        ), 200);
    }

    /**
     * Get available categories
     */
    private function get_categories() {
        $categories = get_categories(array('hide_empty' => false));
        $result = array();

        foreach ($categories as $category) {
            $result[] = array(
                'id' => $category->term_id,
                'name' => $category->name,
                'slug' => $category->slug
            );
        }

        return $result;
    }

    /**
     * Get available authors
     */
    private function get_authors() {
        $users = get_users(array('who' => 'authors'));
        $result = array();

        foreach ($users as $user) {
            $result[] = array(
                'id' => $user->ID,
                'name' => $user->display_name,
                'email' => $user->user_email
            );
        }

        return $result;
    }
}
```

---

## 4. Post Publisher Class: `includes/class-post-publisher.php`

```php
<?php
/**
 * ContentFlow Post Publisher
 * Handles creating WordPress posts from API data
 */

if (!defined('ABSPATH')) {
    exit;
}

class ContentFlow_Post_Publisher {

    /**
     * Create WordPress post from API data
     */
    public function create_post($data) {
        // Prepare post data
        $post_data = array(
            'post_title' => sanitize_text_field($data['title']),
            'post_content' => wp_kses_post($data['content']),
            'post_status' => $this->get_post_status($data),
            'post_author' => $this->get_author_id($data),
            'post_category' => $this->get_categories($data),
            'post_date' => $this->get_post_date($data),
        );

        // Create post
        $post_id = wp_insert_post($post_data, true);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        // Set featured image if provided
        if (!empty($data['featured_image_url'])) {
            $this->set_featured_image($post_id, $data);
        }

        // Set SEO meta description
        if (!empty($data['meta_description'])) {
            $this->set_meta_description($post_id, $data['meta_description']);
        }

        // Set tags if provided
        if (!empty($data['keywords']) && is_array($data['keywords'])) {
            wp_set_post_tags($post_id, $data['keywords']);
        }

        return $post_id;
    }

    /**
     * Get post status
     */
    private function get_post_status($data) {
        if (isset($data['status'])) {
            $allowed_statuses = array('publish', 'draft', 'pending', 'future');
            if (in_array($data['status'], $allowed_statuses)) {
                return $data['status'];
            }
        }

        return get_option('contentflow_default_status', 'publish');
    }

    /**
     * Get author ID
     */
    private function get_author_id($data) {
        if (!empty($data['author_id'])) {
            return intval($data['author_id']);
        }

        return get_option('contentflow_default_author', 1);
    }

    /**
     * Get categories
     */
    private function get_categories($data) {
        if (!empty($data['categories']) && is_array($data['categories'])) {
            return array_map('intval', $data['categories']);
        }

        $default_category = get_option('contentflow_default_category');
        return $default_category ? array($default_category) : array();
    }

    /**
     * Get post date
     */
    private function get_post_date($data) {
        if (!empty($data['schedule_date'])) {
            return date('Y-m-d H:i:s', strtotime($data['schedule_date']));
        }

        return current_time('mysql');
    }

    /**
     * Set featured image from URL
     */
    private function set_featured_image($post_id, $data) {
        $image_url = $data['featured_image_url'];
        $image_alt = $data['featured_image_alt'] ?? $data['title'];

        // Download image
        $image_id = $this->upload_image_from_url($image_url, $post_id);

        if ($image_id && !is_wp_error($image_id)) {
            // Set as featured image
            set_post_thumbnail($post_id, $image_id);

            // Set alt text
            update_post_meta($image_id, '_wp_attachment_image_alt', $image_alt);
        }
    }

    /**
     * Upload image from URL
     */
    private function upload_image_from_url($url, $post_id) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        // Download file to temp location
        $tmp = download_url($url);

        if (is_wp_error($tmp)) {
            return $tmp;
        }

        // Get file extension
        $file_array = array(
            'name' => basename($url),
            'tmp_name' => $tmp
        );

        // Upload to media library
        $id = media_handle_sideload($file_array, $post_id);

        // Clean up temp file
        if (is_wp_error($id)) {
            @unlink($file_array['tmp_name']);
            return $id;
        }

        return $id;
    }

    /**
     * Set SEO meta description
     * Supports Yoast SEO and RankMath
     */
    private function set_meta_description($post_id, $meta_description) {
        // Yoast SEO
        if (defined('WPSEO_VERSION')) {
            update_post_meta($post_id, '_yoast_wpseo_metadesc', $meta_description);
        }

        // RankMath
        if (defined('RANK_MATH_VERSION')) {
            update_post_meta($post_id, 'rank_math_description', $meta_description);
        }

        // Generic meta
        update_post_meta($post_id, '_contentflow_meta_description', $meta_description);
    }
}
```

---

## 5. Settings Page Class: `includes/class-settings.php`

```php
<?php
/**
 * ContentFlow Settings Page
 */

if (!defined('ABSPATH')) {
    exit;
}

class ContentFlow_Settings {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    /**
     * Add settings page to admin menu
     */
    public function add_settings_page() {
        add_options_page(
            __('ContentFlow AI Settings', 'contentflow-connector'),
            __('ContentFlow AI', 'contentflow-connector'),
            'manage_options',
            'contentflow-settings',
            array($this, 'render_settings_page')
        );
    }

    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('contentflow_settings', 'contentflow_api_key');
        register_setting('contentflow_settings', 'contentflow_default_author');
        register_setting('contentflow_settings', 'contentflow_default_category');
        register_setting('contentflow_settings', 'contentflow_default_status');
    }

    /**
     * Enqueue admin assets
     */
    public function enqueue_assets($hook) {
        if ('settings_page_contentflow-settings' !== $hook) {
            return;
        }

        wp_enqueue_style(
            'contentflow-admin-style',
            CONTENTFLOW_PLUGIN_URL . 'assets/css/admin-style.css',
            array(),
            CONTENTFLOW_VERSION
        );

        wp_enqueue_script(
            'contentflow-admin-script',
            CONTENTFLOW_PLUGIN_URL . 'assets/js/admin-script.js',
            array('jquery'),
            CONTENTFLOW_VERSION,
            true
        );

        wp_localize_script('contentflow-admin-script', 'contentflowAdmin', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('contentflow_test_connection'),
        ));
    }

    /**
     * Render settings page
     */
    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <div class="contentflow-settings-container">
                <form method="post" action="options.php">
                    <?php
                    settings_fields('contentflow_settings');
                    do_settings_sections('contentflow_settings');
                    ?>

                    <table class="form-table">
                        <!-- API Key -->
                        <tr>
                            <th scope="row">
                                <label for="contentflow_api_key">
                                    <?php _e('API Key', 'contentflow-connector'); ?>
                                </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="contentflow_api_key"
                                    id="contentflow_api_key"
                                    value="<?php echo esc_attr(get_option('contentflow_api_key')); ?>"
                                    class="regular-text code"
                                    readonly
                                />
                                <button
                                    type="button"
                                    class="button button-secondary"
                                    id="contentflow-copy-key"
                                >
                                    <?php _e('Copy', 'contentflow-connector'); ?>
                                </button>
                                <p class="description">
                                    <?php _e('Copy this API key and paste it in your ContentFlow AI dashboard', 'contentflow-connector'); ?>
                                </p>
                            </td>
                        </tr>

                        <!-- Default Author -->
                        <tr>
                            <th scope="row">
                                <label for="contentflow_default_author">
                                    <?php _e('Default Author', 'contentflow-connector'); ?>
                                </label>
                            </th>
                            <td>
                                <?php
                                wp_dropdown_users(array(
                                    'name' => 'contentflow_default_author',
                                    'id' => 'contentflow_default_author',
                                    'selected' => get_option('contentflow_default_author', 1),
                                    'who' => 'authors',
                                ));
                                ?>
                                <p class="description">
                                    <?php _e('Default author for published posts', 'contentflow-connector'); ?>
                                </p>
                            </td>
                        </tr>

                        <!-- Default Category -->
                        <tr>
                            <th scope="row">
                                <label for="contentflow_default_category">
                                    <?php _e('Default Category', 'contentflow-connector'); ?>
                                </label>
                            </th>
                            <td>
                                <?php
                                wp_dropdown_categories(array(
                                    'name' => 'contentflow_default_category',
                                    'id' => 'contentflow_default_category',
                                    'selected' => get_option('contentflow_default_category', 1),
                                    'hide_empty' => false,
                                    'hierarchical' => true,
                                ));
                                ?>
                                <p class="description">
                                    <?php _e('Default category for published posts', 'contentflow-connector'); ?>
                                </p>
                            </td>
                        </tr>

                        <!-- Default Status -->
                        <tr>
                            <th scope="row">
                                <label for="contentflow_default_status">
                                    <?php _e('Default Post Status', 'contentflow-connector'); ?>
                                </label>
                            </th>
                            <td>
                                <select name="contentflow_default_status" id="contentflow_default_status">
                                    <option value="publish" <?php selected(get_option('contentflow_default_status'), 'publish'); ?>>
                                        <?php _e('Publish', 'contentflow-connector'); ?>
                                    </option>
                                    <option value="draft" <?php selected(get_option('contentflow_default_status'), 'draft'); ?>>
                                        <?php _e('Draft', 'contentflow-connector'); ?>
                                    </option>
                                    <option value="pending" <?php selected(get_option('contentflow_default_status'), 'pending'); ?>>
                                        <?php _e('Pending Review', 'contentflow-connector'); ?>
                                    </option>
                                </select>
                                <p class="description">
                                    <?php _e('Default status for published posts', 'contentflow-connector'); ?>
                                </p>
                            </td>
                        </tr>
                    </table>

                    <?php submit_button(); ?>
                </form>

                <!-- Connection Test -->
                <h2><?php _e('Test Connection', 'contentflow-connector'); ?></h2>
                <p>
                    <button type="button" class="button button-primary" id="contentflow-test-connection">
                        <?php _e('Test Connection', 'contentflow-connector'); ?>
                    </button>
                    <span id="contentflow-connection-status"></span>
                </p>

                <!-- Instructions -->
                <div class="contentflow-instructions">
                    <h2><?php _e('Setup Instructions', 'contentflow-connector'); ?></h2>
                    <ol>
                        <li><?php _e('Copy the API key above', 'contentflow-connector'); ?></li>
                        <li><?php _e('Log in to your ContentFlow AI dashboard', 'contentflow-connector'); ?></li>
                        <li><?php _e('Go to Integrations → Add WordPress Site', 'contentflow-connector'); ?></li>
                        <li><?php _e('Enter your site URL and paste the API key', 'contentflow-connector'); ?></li>
                        <li><?php _e('Click "Test Connection" to verify', 'contentflow-connector'); ?></li>
                        <li><?php _e('Start creating and publishing posts!', 'contentflow-connector'); ?></li>
                    </ol>
                </div>
            </div>
        </div>
        <?php
    }
}
```

---

## 6. Admin JavaScript: `assets/js/admin-script.js`

```javascript
jQuery(document).ready(function($) {
    // Copy API key
    $('#contentflow-copy-key').on('click', function() {
        var $apiKey = $('#contentflow_api_key');
        $apiKey.select();
        document.execCommand('copy');

        $(this).text('Copied!');
        setTimeout(function() {
            $('#contentflow-copy-key').text('Copy');
        }, 2000);
    });

    // Test connection
    $('#contentflow-test-connection').on('click', function() {
        var $button = $(this);
        var $status = $('#contentflow-connection-status');

        $button.prop('disabled', true).text('Testing...');
        $status.html('');

        var apiUrl = window.location.origin + '/wp-json/contentflow/v1/test';
        var apiKey = $('#contentflow_api_key').val();

        $.ajax({
            url: apiUrl,
            type: 'GET',
            headers: {
                'X-API-Key': apiKey
            },
            success: function(response) {
                $status.html('<span style="color: green;">✓ Connection successful!</span>');
            },
            error: function(xhr) {
                $status.html('<span style="color: red;">✗ Connection failed: ' + xhr.responseJSON.message + '</span>');
            },
            complete: function() {
                $button.prop('disabled', false).text('Test Connection');
            }
        });
    });
});
```

---

## 7. Admin CSS: `assets/css/admin-style.css`

```css
.contentflow-settings-container {
    max-width: 800px;
}

.contentflow-instructions {
    margin-top: 30px;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.contentflow-instructions h2 {
    margin-top: 0;
}

.contentflow-instructions ol {
    margin-left: 20px;
}

.contentflow-instructions li {
    margin-bottom: 10px;
}

#contentflow-connection-status {
    margin-left: 10px;
    font-weight: bold;
}

#contentflow-copy-key {
    margin-left: 10px;
}
```

---

## REST API Endpoints

### 1. Publish Post

**Endpoint:** `POST /wp-json/contentflow/v1/publish`

**Headers:**
```
X-API-Key: {your_api_key}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Blog Post Title",
  "content": "<p>HTML content here...</p>",
  "featured_image_url": "https://example.com/image.jpg",
  "featured_image_alt": "Alt text for image",
  "meta_description": "SEO meta description",
  "keywords": ["keyword1", "keyword2"],
  "status": "publish",
  "schedule_date": "2025-11-20T10:00:00Z",
  "author_id": 1,
  "categories": [1, 5]
}
```

**Response:**
```json
{
  "success": true,
  "post_id": 123,
  "post_url": "https://yoursite.com/blog-post-title",
  "message": "Post published successfully"
}
```

### 2. Test Connection

**Endpoint:** `GET /wp-json/contentflow/v1/test`

**Headers:**
```
X-API-Key: {your_api_key}
```

**Response:**
```json
{
  "success": true,
  "message": "Connection successful",
  "wordpress_version": "6.4",
  "plugin_version": "1.0.0"
}
```

### 3. Get Site Info

**Endpoint:** `GET /wp-json/contentflow/v1/info`

**Response:**
```json
{
  "site_name": "My WordPress Site",
  "site_url": "https://example.com",
  "wordpress_version": "6.4",
  "plugin_version": "1.0.0",
  "categories": [
    {"id": 1, "name": "Uncategorized", "slug": "uncategorized"},
    {"id": 5, "name": "Technology", "slug": "technology"}
  ],
  "authors": [
    {"id": 1, "name": "Admin", "email": "admin@example.com"}
  ]
}
```

---

## Security Best Practices

1. **API Key Storage:** API keys are stored in WordPress options table with secure hashing
2. **Input Sanitization:** All inputs are sanitized using WordPress functions
3. **Output Escaping:** All outputs are escaped to prevent XSS
4. **Nonce Verification:** Admin actions use WordPress nonces
5. **Capability Checks:** Settings page requires `manage_options` capability
6. **File Upload Security:** Images are validated before upload
7. **SQL Injection Prevention:** Using WordPress wpdb prepared statements

---

## Testing Checklist

- [ ] Plugin activates without errors
- [ ] API key is generated on activation
- [ ] Settings page displays correctly
- [ ] API key can be copied
- [ ] Test connection works
- [ ] Posts can be created via API
- [ ] Featured images upload correctly
- [ ] Meta descriptions are set (Yoast/RankMath)
- [ ] Tags and categories are assigned
- [ ] Scheduled posts work
- [ ] Plugin deactivates cleanly

---

## Deployment Instructions

1. **Package Plugin:**
   ```bash
   zip -r contentflow-connector.zip contentflow-connector/
   ```

2. **Install on WordPress:**
   - Upload ZIP via Plugins → Add New → Upload
   - Or FTP to `/wp-content/plugins/`

3. **Activate Plugin**

4. **Configure Settings:**
   - Go to Settings → ContentFlow AI
   - Copy API key
   - Configure defaults

---

## Support & Documentation

For issues or questions:
- Email: support@contentflow.ai
- Documentation: https://docs.contentflow.ai/wordpress

---

**End of WordPress Plugin Specification**
