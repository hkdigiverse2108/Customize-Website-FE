import { TaxSettingResponse } from "@/type";
import { Tag } from "antd";
import { FiCheckCircle, FiXCircle, FiPercent } from "react-icons/fi";

interface TaxSettingOverviewProps {
  Data: TaxSettingResponse;
}

const TaxSettingOverview = ({ Data }: TaxSettingOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-xl border ${Data?.taxEnabled ? 'border-brand-200 bg-brand-50/20' : 'border-slate-200 bg-slate-50/50'} transition-all`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg ${Data?.taxEnabled ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'} flex items-center justify-center shrink-0 shadow-sm`}>
              <FiPercent size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Store Tax Rules</h3>
              <p className="text-xs text-slate-500 mt-0.5">Configure how taxes are calculated and displayed on your store</p>
            </div>
          </div>
          {Data?.taxEnabled ? (
            <Tag color="success" variant="filled" className="m-0 font-medium"><span className="flex items-center gap-1.5"><FiCheckCircle /> Active</span></Tag>
          ) : (
            <Tag color="error" variant="filled" className="m-0 font-medium"><span className="flex items-center gap-1.5"><FiXCircle /> Disabled</span></Tag>
          )}
        </div>
        
        {Data?.taxEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Tax Name</p>
              <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.taxName || "Not configured"}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Tax Rate</p>
              <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.taxPercentage || 0}%</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Pricing Strategy</p>
              <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">
                {Data?.isTaxIncluded ? "Prices are inclusive of tax" : "Prices exclude tax (added at checkout)"}
              </p>
            </div>
            {Data?.gstNumber && (
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">GST/Tax ID Number</p>
                <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data.gstNumber}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxSettingOverview;
