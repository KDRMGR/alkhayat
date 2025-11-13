-- =====================================================
-- KHAT ALRIYADAH CMS - COMPLETE DATABASE SCHEMA
-- =====================================================
-- This schema supports a full-featured admin panel for
-- managing all website content with draft/publish workflow
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. SITE SETTINGS TABLE
-- =====================================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'Khat Alriyadah',
  company_tagline TEXT DEFAULT 'Contracting Company',
  logo_url TEXT DEFAULT '/WhatsApp Image 2025-10-24 at 3.06.52 AM.jpeg',
  commercial_registration TEXT DEFAULT '1010293232',
  founded_year INTEGER DEFAULT 2011,
  vision_statement TEXT DEFAULT 'Supporting Saudi Arabia''s Vision 2030',
  copyright_text TEXT DEFAULT '© 2024 Khat Alriyadah Contracting Company. All rights reserved.',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (id) VALUES (uuid_generate_v4());

-- =====================================================
-- 2. HERO SECTION TABLE
-- =====================================================
CREATE TABLE hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  youtube_video_id TEXT NOT NULL DEFAULT 'DuT3njy9hWg',
  main_title TEXT NOT NULL DEFAULT 'AL-KHAYAT',
  tagline TEXT NOT NULL DEFAULT 'Crafting Digital Excellence',
  overlay_opacity DECIMAL(3,2) DEFAULT 0.40,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default hero
INSERT INTO hero_section (id) VALUES (uuid_generate_v4());

-- =====================================================
-- 3. ABOUT SECTION TABLE
-- =====================================================
CREATE TABLE about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge_text TEXT DEFAULT 'About Khat Alriyadah',
  main_heading TEXT DEFAULT 'Building Saudi Arabia''s',
  gradient_heading TEXT DEFAULT 'Future Infrastructure',
  subtitle TEXT DEFAULT 'Pioneering construction excellence since 2011 with world-class engineering and innovation',
  intro_paragraph TEXT,
  commitment_paragraph TEXT,
  vision_badge_title TEXT DEFAULT 'Vision 2030 Partner',
  vision_badge_description TEXT DEFAULT 'Supporting Saudi Arabia''s transformation journey',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default about
INSERT INTO about_section (
  id,
  intro_paragraph,
  commitment_paragraph
) VALUES (
  uuid_generate_v4(),
  'Khat Alriyadah Construction Est. (KRIYADAH) was founded in 2011 with its headquarters in Riyadh, Saudi Arabia. We are a leading construction company committed to delivering exceptional results across diverse project scales.',
  'Our commitment to outstanding job completion, exceptional customer service, and superior safety performance has established us as a partner of choice in Saudi Arabia''s construction industry.'
);

-- =====================================================
-- 4. HIGHLIGHTS TABLE (For About Section)
-- =====================================================
CREATE TABLE highlights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_highlights_order ON highlights(display_order);

-- Insert default highlights
INSERT INTO highlights (title, display_order) VALUES
  ('General Contracting Excellence', 1),
  ('Construction Management', 2),
  ('Turn-Key Project Delivery', 3),
  ('Design-Build Services', 4),
  ('Preconstruction Planning', 5),
  ('All Project Sizes', 6);

-- =====================================================
-- 5. ACHIEVEMENTS TABLE (For About Section)
-- =====================================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL, -- lucide icon name
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  color TEXT DEFAULT 'green', -- green, cyan, blue
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_achievements_order ON achievements(display_order);

-- Insert default achievements
INSERT INTO achievements (icon_name, value, label, color, display_order) VALUES
  ('Building2', '500+', 'Projects Delivered', 'green', 1),
  ('Users', '50+', 'Expert Team', 'cyan', 2),
  ('TrendingUp', '12+', 'Years Experience', 'blue', 3),
  ('Globe', '100%', 'Client Satisfaction', 'green', 4);

-- =====================================================
-- 6. BOTTOM FEATURES TABLE (For About Section)
-- =====================================================
CREATE TABLE bottom_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  gradient TEXT DEFAULT 'from-green-600 to-green-500',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bottom_features_order ON bottom_features(display_order);

-- Insert default features
INSERT INTO bottom_features (icon_name, title, description, gradient, display_order) VALUES
  ('Building2', 'Premium Projects', 'Delivering landmark infrastructure across Saudi Arabia', 'from-green-600 to-green-500', 1),
  ('Shield', 'Safety First', 'Uncompromising commitment to safety standards', 'from-cyan-600 to-cyan-500', 2),
  ('Award', 'Quality Assured', 'ISO certified processes and excellence', 'from-blue-600 to-blue-500', 3);

-- =====================================================
-- 7. STATS TABLE (Reusable across multiple sections)
-- =====================================================
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL, -- 'animated_stats', 'civil_works', etc.
  icon_name TEXT NOT NULL,
  value INTEGER NOT NULL,
  label TEXT NOT NULL,
  suffix TEXT DEFAULT '+', -- '+', '%', '/7', etc.
  gradient TEXT DEFAULT 'from-green-600 to-green-500',
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stats_section ON stats(section);
CREATE INDEX idx_stats_order ON stats(display_order);

-- Insert default stats for animated_stats section
INSERT INTO stats (section, icon_name, value, label, suffix, gradient, description, display_order) VALUES
  ('animated_stats', 'Building2', 500, 'Projects Completed', '+', 'from-green-600 to-green-500', 'Across Saudi Arabia', 1),
  ('animated_stats', 'Users', 50, 'Expert Team', '+', 'from-cyan-600 to-cyan-500', 'Professionals', 2),
  ('animated_stats', 'Award', 12, 'Years Excellence', '+', 'from-blue-600 to-blue-500', 'Since 2011', 3),
  ('animated_stats', 'CheckCircle', 100, 'Quality Standard', '%', 'from-green-600 to-green-500', 'ISO Certified', 4),
  ('animated_stats', 'TrendingUp', 99, 'Client Satisfaction', '%', 'from-cyan-600 to-cyan-500', 'Happy Clients', 5),
  ('animated_stats', 'Zap', 24, 'Support Available', '/7', 'from-blue-600 to-blue-500', 'Always Here', 6);

-- Insert stats for civil_works section
INSERT INTO stats (section, icon_name, value, label, suffix, gradient, display_order) VALUES
  ('civil_works', 'HardHat', 50, 'Expert Team', '+', 'from-green-600 to-green-500', 1),
  ('civil_works', 'ClipboardCheck', 100, 'Quality Control', '%', 'from-cyan-600 to-cyan-500', 2),
  ('civil_works', 'TrendingUp', 95, 'On-Time Delivery', '%', 'from-blue-600 to-blue-500', 3),
  ('civil_works', 'Award', 100, 'Client Satisfaction', '%', 'from-green-600 to-cyan-500', 4);

-- =====================================================
-- 8. OBJECTIVES TABLE
-- =====================================================
CREATE TABLE objectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  gradient TEXT DEFAULT 'from-green-600 to-green-500',
  size TEXT DEFAULT 'regular', -- 'large', 'regular', 'tall'
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_objectives_order ON objectives(display_order);

-- Insert default objectives
INSERT INTO objectives (icon_name, title, description, gradient, size, display_order) VALUES
  ('Target', 'Quality Management', 'Delivering superior quality in every project through rigorous standards and best practices', 'from-green-600 to-green-500', 'large', 1),
  ('TrendingUp', 'Dedication', 'Committed to excellence and continuous improvement', 'from-cyan-600 to-cyan-500', 'regular', 2),
  ('Users', 'Human Capital', 'Investing in team growth and professional development', 'from-blue-600 to-blue-500', 'regular', 3),
  ('Lightbulb', 'Innovation', 'Embracing cutting-edge technologies and modern methods', 'from-green-500 to-cyan-500', 'regular', 4),
  ('UsersRound', 'Team Work', 'Fostering collaboration across all project teams', 'from-cyan-500 to-blue-500', 'regular', 5),
  ('DollarSign', 'Resource Optimization', 'Maximum efficiency and value in every project', 'from-blue-600 to-cyan-500', 'tall', 6);

-- =====================================================
-- 9. COMMITMENTS TABLE
-- =====================================================
CREATE TABLE commitments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_commitments_order ON commitments(display_order);

-- Insert default commitments
INSERT INTO commitments (icon_name, title, description, display_order) VALUES
  ('CheckCircle', 'Total Solutions', 'Providing complete solutions from design, supply of material, installation, commission and after sales services.', 1),
  ('Users', 'Close Collaboration', 'Promising close collaboration to understand your unique business needs with ready assistance by our experienced Engineers for technical support.', 2),
  ('Award', 'Highest Quality', 'Providing the highest level of quality to meet all expectations. Our quality staff ensures clients that our products and services maintain their cutting edge.', 3),
  ('TrendingDown', 'Competitive Pricing', 'Constantly improving our efficiency and effectiveness to offer all clients the best competitive pricing at all times.', 4);

-- =====================================================
-- 10. CORE VALUES TABLE
-- =====================================================
CREATE TABLE core_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_core_values_order ON core_values(display_order);

-- =====================================================
-- 11. FEATURES TABLE (Interactive Showcase & Solutions)
-- =====================================================
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL, -- 'interactive_showcase', 'solutions'
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT DEFAULT 'green',
  shadow_color TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_features_section ON features(section);
CREATE INDEX idx_features_order ON features(display_order);

-- =====================================================
-- 12. SERVICES TABLE
-- =====================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color TEXT DEFAULT 'from-green-600 to-green-500',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_order ON services(display_order);

-- Insert default services
INSERT INTO services (title, icon_name, color, display_order) VALUES
  ('Mechanical', 'Wrench', 'from-green-600 to-green-500', 1),
  ('Cables', 'Cable', 'from-blue-600 to-cyan-500', 2),
  ('CCTV, Fire & Safety', 'Camera', 'from-cyan-500 to-blue-500', 3),
  ('Data Centre & Power', 'Cpu', 'from-green-500 to-cyan-500', 4),
  ('Drainage Products', 'Droplet', 'from-blue-600 to-blue-500', 5),
  ('Electrical', 'Zap', 'from-green-600 to-green-500', 6);

-- =====================================================
-- 13. SERVICE ITEMS TABLE
-- =====================================================
CREATE TABLE service_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_items_service ON service_items(service_id);
CREATE INDEX idx_service_items_order ON service_items(display_order);

-- Insert service items (will need to match service_id from actual inserts)
-- You'll populate these after services are created

-- =====================================================
-- 14. PROJECTS TABLE
-- =====================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Warehouse', 'Commercial', 'Industrial', etc.
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_order ON projects(display_order);
CREATE INDEX idx_projects_published ON projects(is_published);

-- Insert default projects
INSERT INTO projects (title, location, description, category, display_order) VALUES
  ('Panda Distribution Center', 'KAEC', 'Central warehouses for Panda in King Abdullah Economic City', 'Warehouse', 1),
  ('Industrial City Admin Building', 'Al-Haer', 'Administrative building for industrial city', 'Commercial', 2),
  ('Nova Factory & Warehouses', 'Al-Saad', '120,000 Sq.M factory and warehouse complex', 'Industrial', 3),
  ('Corona Hospital', 'National Guard', 'Specialized hospital facility for National Guard', 'Healthcare', 4),
  ('Dr. Sulaiman Al Habib Hospital', 'Khobar', 'Major healthcare facility', 'Healthcare', 5),
  ('Time Square - Riyadh Boulevard', 'Riyadh', 'Steel erection and finishing works', 'Commercial', 6),
  ('MODON 16 Ready Built Factories', '2nd Industrial City, Riyadh', 'Erection of 16 pre-engineered steel factories', 'Industrial', 7),
  ('Workers Construction Village', 'NEOM', 'Installation of Zamil PEB buildings (30,000 Sq.M)', 'Accommodation', 8),
  ('King Abdel Aziz University Stadium', 'Jeddah', 'Fire-rated system for steel structure', 'Sports', 9);

-- =====================================================
-- 15. VIDEOS TABLE (Video Gallery)
-- =====================================================
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_gradient TEXT DEFAULT 'from-green-600 to-cyan-600',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_order ON videos(display_order);
CREATE INDEX idx_videos_published ON videos(is_published);

-- Insert default videos (update YouTube IDs with actual ones)
INSERT INTO videos (title, description, youtube_id, category, thumbnail_gradient, display_order) VALUES
  ('Panda Distribution Center - KAEC', 'Construction progress of central warehouses for Panda', 'dQw4w9WgXcQ', 'Warehouse', 'from-green-600 to-cyan-600', 1),
  ('MODON Industrial Complex', 'Erection of 16 ready-built factories in 2nd Industrial City', 'dQw4w9WgXcQ', 'Industrial', 'from-blue-600 to-purple-600', 2),
  ('Workers Construction Village - NEOM', 'Installation of Zamil PEB buildings for NEOM project', 'dQw4w9WgXcQ', 'Accommodation', 'from-purple-600 to-pink-600', 3),
  ('Corona Hospital Construction', 'Specialized hospital facility construction for National Guard', 'dQw4w9WgXcQ', 'Healthcare', 'from-pink-600 to-rose-600', 4);

-- =====================================================
-- 16. FAQS TABLE
-- =====================================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_faqs_order ON faqs(display_order);
CREATE INDEX idx_faqs_published ON faqs(is_published);

-- Insert default FAQs
INSERT INTO faqs (question, answer, display_order) VALUES
  ('What types of construction projects does Khat Alriyadah handle?', 'We specialize in a wide range of construction projects including industrial facilities, infrastructure development, residential complexes, healthcare facilities, and commercial buildings. Our expertise covers general contracting, construction management, and turn-key projects with design-build capabilities.', 1),
  ('How long has Khat Alriyadah been in the construction industry?', 'Since 2011, we have been delivering excellence in construction and engineering services across Saudi Arabia. With over 12 years of experience, we have successfully completed more than 500 projects, establishing ourselves as a trusted partner in the industry.', 2),
  ('What is your approach to project management?', 'We employ comprehensive project management methodologies that include detailed planning, continuous monitoring, quality control, and transparent communication. Our experienced team ensures projects are completed on time, within budget, and to the highest quality standards.', 3),
  ('Do you provide design-build services?', 'Yes, we offer complete design-build services, allowing us to manage your project from initial concept through final construction. This integrated approach streamlines the process, reduces costs, and ensures better coordination between design and construction phases.', 4),
  ('What safety standards do you follow?', 'Safety is our top priority. We adhere to international safety standards and Saudi Arabian regulations, implementing comprehensive safety protocols on all our projects. Our team receives regular training, and we maintain strict safety monitoring throughout the construction process.', 5),
  ('How can I request a quote for my project?', 'You can request a quote by contacting us through our website contact form, calling our office directly, or visiting us at our location. Our team will schedule a consultation to discuss your project requirements and provide a detailed proposal.', 6);

-- =====================================================
-- 17. PARTNERS TABLE
-- =====================================================
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_partners_order ON partners(display_order);

-- Insert default partners
INSERT INTO partners (name, display_order) VALUES
  ('Al Gharir Construction', 1),
  ('Advanced Holding Co.', 2),
  ('Shield House Ltd. Co.', 3),
  ('Amana', 4),
  ('Kinan', 5),
  ('China Railway Construction', 6),
  ('Arabian Centres', 7),
  ('KAPSARC', 8),
  ('Youssef Marroun Contracting', 9),
  ('Al-Tamimi Group', 10),
  ('J&P International Contractors', 11);

-- =====================================================
-- 18. CIVIL WORKS SECTION TABLE
-- =====================================================
CREATE TABLE civil_works_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge_text TEXT DEFAULT 'Civil Works',
  main_heading TEXT DEFAULT 'Excellence in',
  gradient_heading TEXT DEFAULT 'Civil Engineering',
  description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default civil works
INSERT INTO civil_works_section (
  id,
  description
) VALUES (
  uuid_generate_v4(),
  'We offer our expertise with the help of our experienced surveyors and Civil and Construction engineers to provide you with excellent and speedy progress reports with the quality that is matching customer highest satisfaction.'
);

-- =====================================================
-- 19. CIVIL WORKS FEATURES TABLE
-- =====================================================
CREATE TABLE civil_works_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feature_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_civil_works_features_order ON civil_works_features(display_order);

-- Insert default civil works features
INSERT INTO civil_works_features (feature_text, display_order) VALUES
  ('Professional Civil Engineers', 1),
  ('Experienced Surveyors', 2),
  ('Quality Progress Reports', 3),
  ('Customer-Focused Approach', 4);

-- =====================================================
-- 20. CONTACT INFORMATION TABLE
-- =====================================================
CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_primary TEXT NOT NULL DEFAULT '+966 124 547 22',
  phone_secondary TEXT DEFAULT '+966 540 084 867',
  email TEXT NOT NULL DEFAULT 'Eng.ahmedabdeen@gmail.com',
  address TEXT NOT NULL DEFAULT 'Almoaizelat Dist., Riyadh, Kingdom of Saudi Arabia',
  get_in_touch_heading TEXT DEFAULT 'Get in Touch',
  get_in_touch_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default contact info
INSERT INTO contact_info (
  id,
  get_in_touch_description
) VALUES (
  uuid_generate_v4(),
  'Have a project in mind? We''d love to hear from you. Our team is ready to discuss your construction needs and provide expert guidance.'
);

-- =====================================================
-- 21. FORM SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_read ON form_submissions(is_read);
CREATE INDEX idx_submissions_date ON form_submissions(submitted_at DESC);

-- =====================================================
-- 22. MEDIA ASSETS TABLE
-- =====================================================
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image', 'video', 'document'
  mime_type TEXT,
  file_size INTEGER, -- in bytes
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_type ON media_assets(file_type);
CREATE INDEX idx_media_uploaded ON media_assets(created_at DESC);

-- =====================================================
-- 23. AUDIT LOG TABLE
-- =====================================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_record ON audit_log(record_id);
CREATE INDEX idx_audit_date ON audit_log(created_at DESC);

-- =====================================================
-- TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON hero_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_section_updated_at BEFORE UPDATE ON about_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_highlights_updated_at BEFORE UPDATE ON highlights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bottom_features_updated_at BEFORE UPDATE ON bottom_features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_objectives_updated_at BEFORE UPDATE ON objectives FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_commitments_updated_at BEFORE UPDATE ON commitments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_core_values_updated_at BEFORE UPDATE ON core_values FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_items_updated_at BEFORE UPDATE ON service_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_civil_works_section_updated_at BEFORE UPDATE ON civil_works_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_civil_works_features_updated_at BEFORE UPDATE ON civil_works_features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE bottom_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE civil_works_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE civil_works_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Public read access for published content (anon users)
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hero_section FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON about_section FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON highlights FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON achievements FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON bottom_features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON stats FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON objectives FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON commitments FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON core_values FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON service_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON videos FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON partners FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON civil_works_section FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON civil_works_features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON media_assets FOR SELECT USING (true);

-- Authenticated users (admin) full access
CREATE POLICY "Admin full access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON hero_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON about_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON highlights FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON achievements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON bottom_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON objectives FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON commitments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON core_values FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON service_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON civil_works_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON civil_works_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON form_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON media_assets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON audit_log FOR SELECT USING (auth.role() = 'authenticated');

-- Allow anonymous form submissions
CREATE POLICY "Allow form submissions" ON form_submissions FOR INSERT WITH CHECK (true);

-- =====================================================
-- STORAGE BUCKET FOR MEDIA
-- =====================================================
-- Run this in Supabase Dashboard > Storage
-- or use Supabase CLI:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('media', 'media', true);
--
-- CREATE POLICY "Public read access" ON storage.objects FOR SELECT
-- USING (bucket_id = 'media');
--
-- CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
--
-- CREATE POLICY "Authenticated delete" ON storage.objects FOR DELETE
-- USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- =====================================================
-- SCHEMA COMPLETE
-- =====================================================
-- Run this migration in Supabase Dashboard > SQL Editor
-- or use Supabase CLI: supabase db push
-- =====================================================
