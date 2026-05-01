import { RegionSettingResponse } from "@/type";
import { FiGlobe, FiDollarSign, FiClock, FiMaximize } from "react-icons/fi";

interface RegionSettingOverviewProps {
  Data: RegionSettingResponse;
}

const RegionSettingOverview = ({ Data }: RegionSettingOverviewProps) => {
  const infoCard = (title: string, value: string, icon: any) => (
    <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-sm font-semibold text-slate-800">{value || "Not Set"}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-brand-100 bg-brand-50/10 transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <FiGlobe size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Regional Standards</h3>
            <p className="text-xs text-slate-500 mt-0.5">Define your store's localized measurements and formats</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoCard("Currency", `${Data?.currency || "INR"} (${Data?.currencySymbol || "₹"})`, <FiDollarSign size={18} />)}
          {infoCard("Timezone", Data?.timezone || "Asia/Kolkata", <FiClock size={18} />)}
          {infoCard("Measurement", Data?.unitSystem?.toUpperCase() || "METRIC", <FiMaximize size={18} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <h3 className="font-bold text-slate-800 text-sm mb-4">Weight & Dimensions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Weight Unit</p>
              <p className="text-sm font-semibold text-slate-700">{Data?.weightUnit || "kg"}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Length Unit</p>
              <p className="text-sm font-semibold text-slate-700">{Data?.lengthUnit || "cm"}</p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-center">
          <p className="text-xs text-slate-500 leading-relaxed italic">
            "These settings affect how your products are displayed and how shipping rates are calculated based on weight and size."
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegionSettingOverview;
