-- ============================================================================
-- VERIFICATION QUERIES
-- Run these queries to check what data exists in your database
-- ============================================================================

-- Check all table row counts
SELECT 'site_settings' as table_name, COUNT(*) as row_count FROM site_settings
UNION ALL
SELECT 'hero_section', COUNT(*) FROM hero_section
UNION ALL
SELECT 'about_section', COUNT(*) FROM about_section
UNION ALL
SELECT 'highlights', COUNT(*) FROM highlights
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'videos', COUNT(*) FROM videos
UNION ALL
SELECT 'faqs', COUNT(*) FROM faqs
UNION ALL
SELECT 'partners', COUNT(*) FROM partners
UNION ALL
SELECT 'contact_info', COUNT(*) FROM contact_info
ORDER BY table_name;

-- ============================================================================
-- View actual data in each table
-- ============================================================================

-- Site Settings
SELECT 'SITE SETTINGS' as section;
SELECT company_name, company_tagline, founded_year FROM site_settings;

-- Hero Section
SELECT 'HERO SECTION' as section;
SELECT youtube_video_id, main_title, tagline FROM hero_section;

-- Projects (should have 6)
SELECT 'PROJECTS' as section;
SELECT title, category, location FROM projects ORDER BY display_order;

-- Videos (should have 3)
SELECT 'VIDEOS' as section;
SELECT title, youtube_id, category FROM videos ORDER BY display_order;

-- FAQs (should have 6)
SELECT 'FAQS' as section;
SELECT LEFT(question, 50) as question_preview, display_order FROM faqs ORDER BY display_order;

-- Partners (should have 11)
SELECT 'PARTNERS' as section;
SELECT name, display_order FROM partners ORDER BY display_order;

-- Contact Info
SELECT 'CONTACT INFO' as section;
SELECT phone_primary, email FROM contact_info;
