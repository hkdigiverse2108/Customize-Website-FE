import { CommonFormSectionProps } from "@/type";
import { FC } from "react";

const CommonFormSection: FC<CommonFormSectionProps> = ({ title, children, className }) => {
  const sectionClassName = ["rounded-lg", "border", "border-slate-200", "bg-white", "p-5", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName}>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{title}</p>
      </div>
      {children}
    </section>
  );
};

export default CommonFormSection;
