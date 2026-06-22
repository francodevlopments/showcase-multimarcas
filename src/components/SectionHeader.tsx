import { Link } from "react-router-dom";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function SectionHeader({ eyebrow, title, description, actionLabel, actionHref }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="max-w-2xl text-3xl font-semibold tracking-normal text-ink md:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/62">{description}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link className="button-secondary w-fit" to={actionHref}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
