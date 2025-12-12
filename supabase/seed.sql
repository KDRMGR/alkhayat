-- ============================================================================
-- Supabase Database Seed Script
-- ============================================================================
-- This script populates the database with initial content from the website
-- IMPORTANT: Run 001_initial_schema.sql FIRST before running this script
-- ============================================================================

-- Note: The migration file already inserts default data, so this seed script
-- will UPDATE existing records rather than inserting new ones

-- ============================================================================
-- 1. UPDATE SITE SETTINGS (already created by migration)
-- ============================================================================
UPDATE site_settings SET
  company_name = 'Khat Alriyadah Contracting Company',
  company_tagline = 'Crafting Digital Excellence',
  logo_url = '/WhatsApp Image 2025-10-24 at 3.06.52 AM.jpeg',
  commercial_registration = '1010293232',
  founded_year = 2011,
  vision_statement = 'Supporting Saudi Arabia''s Vision 2030',
  copyright_text = '© 2024 Khat Alriyadah Contracting Company. All rights reserved.'
WHERE id IS NOT NULL;

-- ============================================================================
-- 2. UPDATE HERO SECTION (already created by migration)
-- ============================================================================
UPDATE hero_section SET
  youtube_video_id = 'DuT3njy9hWg',
  main_title = 'AL-KHAYAT',
  tagline = 'Crafting Digital Excellence',
  overlay_opacity = 0.40,
  is_published = true
WHERE id IS NOT NULL;

-- ============================================================================
-- 3. UPDATE ABOUT SECTION (already created by migration)
-- ============================================================================
UPDATE about_section SET
  badge_text = 'About Khat Alriyadah',
  main_heading = 'Excellence in Construction &',
  gradient_heading = 'Engineering',
  subtitle = 'Since 2011, Khat Alriyadah has been at the forefront of construction excellence in Saudi Arabia',
  intro_paragraph = 'Khat Alriyadah Construction Est. (KRIYADAH) was founded in 2011 with its headquarters in Riyadh, Saudi Arabia. We are a leading construction company committed to delivering exceptional results across diverse project scales.',
  commitment_paragraph = 'Our commitment to outstanding job completion, exceptional customer service, and superior safety performance has established us as a partner of choice in Saudi Arabia''s construction industry.',
  vision_badge_title = 'Vision 2030 Partner',
  vision_badge_description = 'Supporting Saudi Arabia''s transformation journey',
  is_published = true
WHERE id IS NOT NULL;

-- ============================================================================
-- 4. UPDATE HIGHLIGHTS (migration already created 6 items)
-- ============================================================================
-- Update existing highlights
DO $$
DECLARE
  highlight_ids UUID[];
BEGIN
  -- Get all highlight IDs in order
  SELECT ARRAY_AGG(id ORDER BY display_order) INTO highlight_ids FROM highlights;

  -- Update each one
  IF array_length(highlight_ids, 1) >= 1 THEN
    UPDATE highlights SET title = 'Over 500 successful projects completed' WHERE id = highlight_ids[1];
  END IF;
  IF array_length(highlight_ids, 1) >= 2 THEN
    UPDATE highlights SET title = '12+ years of industry expertise' WHERE id = highlight_ids[2];
  END IF;
  IF array_length(highlight_ids, 1) >= 3 THEN
    UPDATE highlights SET title = 'Certified by Saudi Ministry of Construction' WHERE id = highlight_ids[3];
  END IF;
  IF array_length(highlight_ids, 1) >= 4 THEN
    UPDATE highlights SET title = 'General Contracting Excellence' WHERE id = highlight_ids[4];
  END IF;
  IF array_length(highlight_ids, 1) >= 5 THEN
    UPDATE highlights SET title = 'Turn-Key Project Delivery' WHERE id = highlight_ids[5];
  END IF;
  IF array_length(highlight_ids, 1) >= 6 THEN
    UPDATE highlights SET title = 'Design-Build Services' WHERE id = highlight_ids[6];
  END IF;
END $$;

-- ============================================================================
-- 5. CLEAR AND INSERT PROJECTS
-- ============================================================================
TRUNCATE TABLE projects CASCADE;

INSERT INTO projects (title, location, description, category, display_order, is_published) VALUES
  ('King Fahad International Stadium', 'Riyadh, Saudi Arabia', 'Major renovation and modernization of iconic sports complex', 'Sports', 1, true),
  ('KAPSARC Research Center', 'Riyadh, Saudi Arabia', 'State-of-the-art research facility construction', 'Commercial', 2, true),
  ('Arabian Centres Mall', 'Jeddah, Saudi Arabia', 'Large-scale retail and commercial complex development', 'Commercial', 3, true),
  ('Riyadh Metro Infrastructure', 'Riyadh, Saudi Arabia', 'Metro line support structures and station facilities', 'Infrastructure', 4, true),
  ('Al Faisaliah Healthcare Complex', 'Riyadh, Saudi Arabia', 'Modern medical facility with advanced infrastructure', 'Healthcare', 5, true),
  ('Industrial Complex Phase II', 'Dammam, Saudi Arabia', 'Expansion of manufacturing and logistics facilities', 'Industrial', 6, true);

-- ============================================================================
-- 6. CLEAR AND INSERT VIDEOS
-- ============================================================================
TRUNCATE TABLE videos CASCADE;

INSERT INTO videos (title, description, youtube_id, category, thumbnail_gradient, display_order, is_published) VALUES
  ('Project Showcase 2024', 'Latest completed projects and ongoing developments', 'DuT3njy9hWg', 'Showcase', 'from-green-600 to-cyan-600', 1, true),
  ('Safety Standards', 'Our commitment to world-class safety protocols', 'dQw4w9WgXcQ', 'Safety', 'from-blue-600 to-cyan-600', 2, true),
  ('Innovation in Construction', 'Modern techniques and technologies we employ', 'dQw4w9WgXcQ', 'Technology', 'from-cyan-600 to-green-600', 3, true);

-- ============================================================================
-- 7. CLEAR AND INSERT FAQs
-- ============================================================================
TRUNCATE TABLE faqs CASCADE;

INSERT INTO faqs (question, answer, display_order, is_published) VALUES
  ('What types of construction projects does Khat Alriyadah handle?', 'We specialize in a wide range of construction projects including industrial facilities, infrastructure development, residential complexes, healthcare facilities, and commercial buildings. Our expertise covers general contracting, construction management, and turn-key projects with design-build capabilities.', 1, true),
  ('How long has Khat Alriyadah been in the construction industry?', 'Since 2011, we have been delivering excellence in construction and engineering services across Saudi Arabia. With over 12 years of experience, we have successfully completed more than 500 projects, establishing ourselves as a trusted partner in the industry.', 2, true),
  ('What is your approach to project management?', 'We employ comprehensive project management methodologies that include detailed planning, continuous monitoring, quality control, and transparent communication. Our experienced team ensures projects are completed on time, within budget, and to the highest quality standards.', 3, true),
  ('Do you provide design-build services?', 'Yes, we offer complete design-build services, allowing us to manage your project from initial concept through final construction. This integrated approach streamlines the process, reduces costs, and ensures better coordination between design and construction phases.', 4, true),
  ('What safety standards do you follow?', 'Safety is our top priority. We adhere to international safety standards and Saudi Arabian regulations, implementing comprehensive safety protocols on all our projects. Our team receives regular training, and we maintain strict safety monitoring throughout the construction process.', 5, true),
  ('How can I request a quote for my project?', 'You can request a quote by contacting us through our website contact form, calling our office directly, or visiting us at our location. Our team will schedule a consultation to discuss your project requirements and provide a detailed proposal.', 6, true);

-- ============================================================================
-- 8. CLEAR AND INSERT PARTNERS
-- ============================================================================
TRUNCATE TABLE partners CASCADE;

INSERT INTO partners (name, logo_url, website_url, display_order, is_active) VALUES
  ('Al Gharir Construction', NULL, NULL, 1, true),
  ('Advanced Holding Co.', NULL, NULL, 2, true),
  ('Shield House Ltd. Co.', NULL, NULL, 3, true),
  ('Amana', NULL, NULL, 4, true),
  ('Kinan', NULL, NULL, 5, true),
  ('China Railway Construction', NULL, NULL, 6, true),
  ('Arabian Centres', NULL, NULL, 7, true),
  ('KAPSARC', NULL, NULL, 8, true),
  ('Youssef Marroun Contracting', NULL, NULL, 9, true),
  ('Al-Tamimi Group', NULL, NULL, 10, true),
  ('J&P International Contractors', NULL, NULL, 11, true);

-- ============================================================================
-- 9. UPDATE CONTACT INFO (already created by migration)
-- ============================================================================
UPDATE contact_info SET
  phone_primary = '+966 124 547 22',
  phone_secondary = '+966 540 084 867',
  email = 'Eng.ahmedabdeen@gmail.com',
  address = 'Almoaizelat Dist., Riyadh, Kingdom of Saudi Arabia',
  get_in_touch_heading = 'Get in Touch',
  get_in_touch_description = 'Have a project in mind? We''d love to hear from you. Our team is ready to discuss your construction needs and provide expert guidance.'
WHERE id IS NOT NULL;

-- ============================================================================
-- SEED SCRIPT COMPLETED
-- ============================================================================
-- All initial data has been inserted/updated
-- You can now start the development server and see the seeded content
-- ============================================================================

-- Verify data was seeded correctly
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
SELECT 'contact_info', COUNT(*) FROM contact_info;
