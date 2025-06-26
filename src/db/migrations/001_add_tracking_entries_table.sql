-- Add tracking_entries table for better data tracking
CREATE TABLE IF NOT EXISTS public.tracking_entries (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  category text NOT NULL,
  value numeric NOT NULL,
  unit text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tracking_entries_pkey PRIMARY KEY (id),
  CONSTRAINT tracking_entries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_tracking_entries_user_date ON public.tracking_entries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_tracking_entries_category ON public.tracking_entries(category);

-- Enable RLS (Row Level Security)
ALTER TABLE public.tracking_entries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own tracking entries" ON public.tracking_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tracking entries" ON public.tracking_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tracking entries" ON public.tracking_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tracking entries" ON public.tracking_entries
  FOR DELETE USING (auth.uid() = user_id);
