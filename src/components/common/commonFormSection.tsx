import { CommonFormSectionProps } from "@/type";
import { FC } from "react";

const CommonFormSection: FC<CommonFormSectionProps> = ({ title, description, children, className }) => {
  const sectionClassName = ["rounded-lg", "border", "border-slate-200", "bg-white", "p-5", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName}>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">{title}</p>
        {description && <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>}
      </div>
      {children}
    </section>
  );
};

export default CommonFormSection;
