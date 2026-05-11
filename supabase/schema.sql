-- =============================================================================
-- CPA OTENE AND ASSOCIATES LLP — Supabase Database Schema
-- Production-ready PostgreSQL schema with Row Level Security
-- =============================================================================
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- USERS & PROFILES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'hr', 'super_admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- CONTACT INQUIRIES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organisation TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
  assigned_to UUID REFERENCES public.profiles(id),
  internal_notes TEXT,
  source TEXT DEFAULT 'website',
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
-- Public can insert (submit contact form)
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries
  FOR INSERT WITH CHECK (true);
-- Only admins can view/update inquiries
CREATE POLICY "Admins can manage inquiries" ON public.inquiries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- CONSULTATION BOOKINGS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organisation TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  meeting_type TEXT DEFAULT 'video' CHECK (meeting_type IN ('video', 'in_person', 'phone')),
  office_location TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  confirmation_code TEXT UNIQUE DEFAULT 'CONS-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8)),
  assigned_advisor UUID REFERENCES public.profiles(id),
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit consultation" ON public.consultations
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage consultations" ON public.consultations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- CAREER APPLICATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('full_time', 'part_time', 'contract', 'internship', 'graduate')),
  experience_level TEXT,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_listing_id UUID REFERENCES public.job_listings(id),
  position_title TEXT NOT NULL, -- for open applications
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  cover_letter TEXT,
  cv_url TEXT, -- Supabase Storage URL
  linkedin_url TEXT,
  portfolio_url TEXT,
  current_employer TEXT,
  years_experience INTEGER,
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'reviewing', 'shortlisted', 'interview', 'offer', 'rejected', 'withdrawn')),
  internal_notes TEXT,
  hr_assignee UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active jobs" ON public.job_listings
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage jobs" ON public.job_listings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr', 'super_admin'))
  );

CREATE POLICY "Anyone can apply" ON public.applications
  FOR INSERT WITH CHECK (true);
CREATE POLICY "HR and admins manage applications" ON public.applications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr', 'super_admin'))
  );

-- =============================================================================
-- BLOG / INSIGHTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#0B1F3A',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES public.authors(id),
  category_id UUID REFERENCES public.categories(id),
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  is_downloadable BOOLEAN DEFAULT false,
  pdf_url TEXT,
  read_time_minutes INTEGER,
  view_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view authors" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "Admins manage blog" ON public.blog_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- NEWSLETTER SUBSCRIPTIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  interests TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  confirm_token TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage subscribers" ON public.newsletter_subscribers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- OFFICE LOCATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.office_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  tag TEXT DEFAULT 'Office',
  address TEXT NOT NULL,
  address_line2 TEXT,
  county TEXT,
  country TEXT DEFAULT 'Kenya',
  phone TEXT,
  email TEXT,
  google_maps_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_head_office BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  business_hours JSONB DEFAULT '{"mon_fri": "8:00 AM - 5:30 PM", "saturday": "9:00 AM - 1:00 PM", "sunday": "Closed"}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.office_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view offices" ON public.office_locations
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage offices" ON public.office_locations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Insert office data
INSERT INTO public.office_locations (city, tag, address, phone, email, is_head_office, latitude, longitude) VALUES
  ('Nairobi', 'Head Office', 'Upper Hill Office Park, Off Ngong Road, Nairobi', '+254 700 000 000', 'nairobi@cpaotene.co.ke', true, -1.2921, 36.8219),
  ('Nakuru', 'Regional Office', 'Kenyatta Avenue, Nakuru CBD, Nakuru', '+254 700 000 001', 'nakuru@cpaotene.co.ke', false, -0.3031, 36.0800),
  ('Kisumu', 'Regional Office', 'Oginga Odinga Street, Kisumu CBD, Kisumu', '+254 700 000 002', 'kisumu@cpaotene.co.ke', false, -0.0917, 34.7680),
  ('Bungoma', 'Regional Office', 'Moi Avenue, Bungoma CBD, Bungoma', '+254 700 000 003', 'bungoma@cpaotene.co.ke', false, 0.5635, 34.5606);

-- =============================================================================
-- SERVICES (CMS)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  short_description TEXT,
  full_description TEXT,
  overview TEXT,
  challenges TEXT[] DEFAULT '{}',
  methodology TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  industries TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active services" ON public.services
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage services" ON public.services
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- DOWNLOADABLE RESOURCES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT DEFAULT 'pdf',
  file_size_kb INTEGER,
  category TEXT,
  is_gated BOOLEAN DEFAULT false, -- requires email to download
  download_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view resources" ON public.resources FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage resources" ON public.resources
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- SEO METADATA
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.seo_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  schema_markup JSONB,
  canonical_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read SEO data" ON public.seo_metadata FOR SELECT USING (true);
CREATE POLICY "Admins manage SEO" ON public.seo_metadata
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- USEFUL INDEXES FOR PERFORMANCE
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);

-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- SEED DATA — Blog Categories
-- =============================================================================
INSERT INTO public.categories (name, slug, description, color) VALUES
  ('ESG & Sustainability', 'esg', 'Environmental, social, and governance insights', '#16a34a'),
  ('Tax Advisory', 'tax', 'Tax law, compliance, and planning insights', '#2563eb'),
  ('IFRS Advisory', 'ifrs', 'International financial reporting standards', '#7c3aed'),
  ('Governance', 'governance', 'Board governance and institutional frameworks', '#d97706'),
  ('Risk & Compliance', 'risk', 'Enterprise risk management and compliance', '#dc2626'),
  ('Audit & Assurance', 'audit', 'Audit practice and internal controls', '#0d9488'),
  ('Public Sector', 'public-sector', 'Government and public institution insights', '#475569'),
  ('Technology & Cybersecurity', 'technology', 'Digital risk and technology insights', '#4f46e5')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- CLIENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  kra_pin TEXT NOT NULL UNIQUE,
  industry TEXT NOT NULL,
  employees TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  contact_person TEXT,
  account_manager UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'prospect')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own client profile" ON public.clients
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = account_manager);
CREATE POLICY "Users can update own client profile" ON public.clients
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all clients" ON public.clients
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.audit_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- ONBOARDING REQUESTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.onboarding_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  kra_pin TEXT NOT NULL,
  industry TEXT NOT NULL,
  employees TEXT NOT NULL,
  website TEXT,
  service_type TEXT NOT NULL,
  form_data JSONB NOT NULL, -- Store complete form submission
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'qualified', 'client', 'rejected')),
  assigned_to UUID REFERENCES public.profiles(id),
  internal_notes TEXT,
  ai_assessment JSONB, -- Store AI agent assessment
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.onboarding_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit onboarding request" ON public.onboarding_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own requests" ON public.onboarding_requests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage requests" ON public.onboarding_requests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.onboarding_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_onboarding_status ON public.onboarding_requests(status);
CREATE INDEX IF NOT EXISTS idx_onboarding_service_type ON public.onboarding_requests(service_type);
CREATE INDEX IF NOT EXISTS idx_onboarding_created ON public.onboarding_requests(created_at DESC);

-- =============================================================================
-- DOCUMENTS (File uploads)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size_kb INTEGER,
  storage_url TEXT NOT NULL, -- Supabase Storage path
  document_type TEXT NOT NULL, -- e.g., 'invoice', 'receipt', 'statement', 'tax_return', 'other'
  description TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can upload documents" ON public.documents
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid())
  );
CREATE POLICY "Clients can view own documents" ON public.documents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid())
  );
CREATE POLICY "Admins can view all documents" ON public.documents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =============================================================================
-- DOCUMENT VERSIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  storage_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size_kb INTEGER,
  version_number INTEGER NOT NULL DEFAULT 1,
  uploaded_by UUID REFERENCES auth.users(id),
  notes TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Document versions belong to clients" ON public.document_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.documents d
      JOIN public.clients c ON c.id = d.client_id
      WHERE d.id = document_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Admins manage document versions" ON public.document_versions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE INDEX IF NOT EXISTS idx_document_versions_document_id ON public.document_versions(document_id);

-- =============================================================================
-- AUDIT LOGS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id),
  entity TEXT NOT NULL,
  entity_id UUID,
  action TEXT NOT NULL,
  actor_id UUID REFERENCES auth.users(id),
  details JSONB,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view own audit logs" ON public.audit_logs
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
    OR actor_id = auth.uid()
  );
CREATE POLICY "Admins can manage audit logs" ON public.audit_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE INDEX IF NOT EXISTS idx_audit_logs_client_id ON public.audit_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity);

-- =============================================================================
-- INVOICE MANAGEMENT
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  currency TEXT NOT NULL DEFAULT 'KES',
  amount_due NUMERIC(12,2) NOT NULL DEFAULT 0,
  amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  description TEXT,
  external_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own invoices" ON public.invoices
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );
CREATE POLICY "Admins manage invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Admins manage invoice items" ON public.invoice_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON public.invoice_items(invoice_id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.invoice_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- CLIENT TASKS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.client_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'blocked')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  due_date DATE,
  assigned_to UUID REFERENCES public.profiles(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.client_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view own tasks" ON public.client_tasks
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );
CREATE POLICY "Clients can create tasks" ON public.client_tasks
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );
CREATE POLICY "Admins manage tasks" ON public.client_tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE INDEX IF NOT EXISTS idx_client_tasks_client_id ON public.client_tasks(client_id);
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.client_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
