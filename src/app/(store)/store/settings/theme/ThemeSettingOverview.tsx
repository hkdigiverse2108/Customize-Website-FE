import { ThemeSettingResponse } from "@/type";
import { FiLayout, FiCheckCircle, FiExternalLink, FiSettings } from "react-icons/fi";
import { Tag, Badge } from "antd";

interface ThemeSettingOverviewProps {
  Data: ThemeSettingResponse;
}

const ThemeSettingOverview = ({ Data }: ThemeSettingOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/50 to-white shadow-sm overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <FiLayout size={120} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          <div className="w-full md:w-48 h-32 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
             <FiLayout size={40} className="text-slate-300" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-slate-900 text-lg">Active Storefront Theme</h3>
              <Tag color="processing" className="m-0 uppercase font-bold text-[10px] rounded-full border-0 px-2.5">Published</Tag>
            </div>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              This theme is currently live on your storefront. All customers will see this layout and design.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-2">
                <FiCheckCircle size={14} className="text-emerald-500" />
                <span className="text-xs font-semibold text-slate-700">Theme ID: <span className="font-mono text-slate-400 ml-1">{Data?.themeId || "Default"}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FiSettings size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Configuration Status</h4>
            <p className="text-xs text-slate-500 mb-3">Custom parameters applied to this theme</p>
            <Badge status={Data?.themeConfig && Object.keys(Data.themeConfig).length > 0 ? "success" : "default"} text={
              <span className="text-xs font-medium text-slate-600">
                {Data?.themeConfig && Object.keys(Data.themeConfig).length > 0 
                  ? `${Object.keys(Data.themeConfig).length} custom variables applied` 
                  : "No custom configuration"}
              </span>
            } />
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <FiExternalLink size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Preview Store</h4>
            <p className="text-xs text-slate-500 mb-3">See how your changes look in real-time</p>
            <a href="#" target="_blank" className="text-xs font-bold text-brand-600 flex items-center gap-1 hover:underline">
              View live storefront <FiExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingOverview;
