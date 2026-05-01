import { NotificationSettingResponse } from "@/type";
import { FiBell, FiMail, FiMessageSquare, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Tag } from "antd";

interface NotificationSettingOverviewProps {
  Data: NotificationSettingResponse;
}

const NotificationSettingOverview = ({ Data }: NotificationSettingOverviewProps) => {
  const renderToggles = (title: string, toggles: any, icon: any, color: string) => (
    <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-50">
        <div className={`h-8 w-8 rounded-lg ${color} text-white flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {Object.entries(toggles || {}).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-1">
            <span className="text-xs font-medium text-slate-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            {value ? (
              <Tag color="success" variant="filled" className="m-0 border-0 text-[10px] uppercase font-bold py-0 px-2 rounded-full">Enabled</Tag>
            ) : (
              <Tag color="default" variant="filled" className="m-0 border-0 text-[10px] uppercase font-bold py-0 px-2 rounded-full">Disabled</Tag>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-brand-100 bg-brand-50/10 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FiBell size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Notification Preferences</h3>
              <p className="text-xs text-slate-500 mt-0.5">Control how you and your customers receive updates</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Sender Name</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.senderName || "Default Store Name"}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Sender Email</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.senderEmail || "default@store.com"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderToggles("Email Notifications", Data?.emailNotifications, <FiMail size={16} />, "bg-indigo-500")}
        {renderToggles("SMS Notifications", Data?.smsNotifications, <FiMessageSquare size={16} />, "bg-emerald-500")}
      </div>
    </div>
  );
};

export default NotificationSettingOverview;
