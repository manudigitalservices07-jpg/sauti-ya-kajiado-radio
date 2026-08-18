type Props = { eyebrow?: string; title: string; description?: string };

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="border-b border-border bg-ink text-ink-foreground">
      <div className="container-x py-12 md:py-16">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-2 max-w-3xl text-3xl md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">{description}</p>}
      </div>
    </section>
  );
}
