
CREATE POLICY "anyone can upload submissions" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'submissions');
CREATE POLICY "admins read submissions" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'submissions' AND public.is_admin());
CREATE POLICY "admins delete submissions" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'submissions' AND public.is_admin());

CREATE POLICY "admins upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "media readable" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');
CREATE POLICY "admins manage media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());
