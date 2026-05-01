import { SEOSettingResponse } from "@/type";
import { FiSearch, FiActivity, FiFacebook, FiTag } from "react-icons/fi";
import { Tag } from "antd";

interface SEOSettingOverviewProps {
  Data: SEOSettingResponse;
}

const SEOSettingOverview = ({ Data }: SEOSettingOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-brand-100 bg-brand-50/10 transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <FiSearch size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Search Engine Optimization</h3>
            <p className="text-xs text-slate-500 mt-0.5">Control how your store appears in search engine results</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Meta Title</p>
            <p className="text-sm font-semibold text-brand-600 truncate">{Data?.metaTitle || "Not configured"}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Meta Description</p>
            <p className="text-sm text-slate-600 leading-relaxed">{Data?.metaDescription || "No description provided"}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {Data?.metaKeywords && Data.metaKeywords.length > 0 ? (
                Data.metaKeywords.map((tag, i) => (
                  <Tag key={i} className="m-0 bg-slate-50 border-slate-200 text-slate-600 text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <FiTag size={10} /> {tag}
                  </Tag>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No keywords added</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <FiActivity size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Google Analytics ID</p>
            <p className="text-sm font-mono font-medium text-slate-700 truncate">{Data?.googleAnalyticsId || "G-XXXXXXXXXX"}</p>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FiFacebook size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Facebook Pixel ID</p>
            <p className="text-sm font-mono font-medium text-slate-700 truncate">{Data?.facebookPixelId || "XXXXXXXXXXXXXXX"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOSettingOverview;
