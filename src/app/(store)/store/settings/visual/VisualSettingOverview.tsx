import { VisualSettingResponse } from "@/type";
import { FiEye, FiLock, FiLayout, FiCode } from "react-icons/fi";
import { Avatar, Tag } from "antd";

interface VisualSettingOverviewProps {
  Data: VisualSettingResponse;
}

const VisualSettingOverview = ({ Data }: VisualSettingOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-brand-100 bg-brand-50/10 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FiEye size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Branding & Identity</h3>
              <p className="text-xs text-slate-500 mt-0.5">Basic visual elements of your store</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase">Favicon</span>
              <Avatar shape="square" size={40} src={Data?.favicon || null} className="border border-slate-100 bg-slate-50" />
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Custom CSS</p>
              <div className="max-h-20 overflow-auto bg-slate-50 p-2 rounded border border-slate-100">
                <code className="text-[10px] text-slate-600 whitespace-pre">{Data?.customCSS || "/* No custom styles */"}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FiLock size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Store Protection</h3>
              <p className="text-xs text-slate-500 mt-0.5">Control access to your storefront</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-sm text-slate-600">Password Protection</span>
              <Tag color={Data?.passwordProtection?.enabled ? "success" : "default"} className="m-0 uppercase font-bold text-[10px]">
                {Data?.passwordProtection?.enabled ? "Active" : "Inactive"}
              </Tag>
            </div>
            {Data?.passwordProtection?.enabled && (
              <p className="text-xs text-slate-500 italic mt-2">
                "Visitors must enter a password to see your store."
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <FiLayout size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Checkout Visuals</h3>
            <p className="text-xs text-slate-500 mt-0.5">Customize the look of your checkout page</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logo</p>
            <div className="h-24 w-full bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
              {Data?.checkoutPage?.logo ? <img src={Data.checkoutPage.logo || undefined} alt="Logo" className="max-h-full" /> : <span className="text-[10px] text-slate-400 italic">No Logo</span>}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Banner</p>
            <div className="h-24 w-full bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
              {Data?.checkoutPage?.banner ? <img src={Data.checkoutPage.banner || undefined} alt="Banner" className="w-full object-cover" /> : <span className="text-[10px] text-slate-400 italic">No Banner</span>}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accent Color</p>
            <div className="h-24 w-full rounded-lg border border-slate-100 flex flex-col items-center justify-center gap-2" style={{ backgroundColor: `${Data?.checkoutPage?.accentColor}10` }}>
              <div className="h-8 w-8 rounded-full border border-white shadow-sm" style={{ backgroundColor: Data?.checkoutPage?.accentColor || "#000000" }} />
              <span className="text-xs font-mono font-bold text-slate-600">{Data?.checkoutPage?.accentColor || "#000000"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualSettingOverview;
