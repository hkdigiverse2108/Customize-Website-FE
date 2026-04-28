import { CommonFormSectionProps } from "@/type";
import { Row } from "antd";
import { FC } from "react";

const CommonFormSection: FC<CommonFormSectionProps> = ({ title, description, children, className, row }) => {
  const sectionClassName = ["rounded-lg", "border", "border-slate-200", "bg-white", "p-3 md:p-5", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName}>
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">{title}</p>
        {description && <p className="text-sm leading-6 text-slate-500">{description}</p>}
      </div>
      {row ? <Row {...row}>{children}</Row> : children}
    </section>
  );
};

export default CommonFormSection;
