import { MailSettingResponse } from "@/type";
import { FiMail, FiServer, FiUser, FiLock } from "react-icons/fi";

interface MailSettingOverviewProps {
  Data: MailSettingResponse;
}

const MailSettingOverview = ({ Data }: MailSettingOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-brand-200 bg-brand-50/20 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FiMail size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Sender Information</h3>
              <p className="text-xs text-slate-500 mt-0.5">Details that appear on your outgoing emails</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">From Name</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.fromName || "Not set"}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">From Email</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.fromEmail || "Not set"}</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-slate-200 bg-white transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <FiServer size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Email Provider Configuration</h3>
            <p className="text-[11px] text-slate-500 uppercase tracking-wide">Provider: <span className="font-bold text-brand-600">{Data?.provider?.toUpperCase() || "SMTP"}</span></p>
          </div>
        </div>

        {Data?.provider === "smtp" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">SMTP Host</p>
              <p className="text-sm font-medium text-slate-700">{Data?.host || "N/A"}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Port</p>
              <p className="text-sm font-medium text-slate-700">{Data?.port || "N/A"}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Security</p>
              <p className="text-sm font-medium text-slate-700">{Data?.secure ? "SSL/TLS" : "None"}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><FiUser size={14} /></div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Username</p>
              <p className="text-sm font-medium text-slate-700">{Data?.auth?.user || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><FiLock size={14} /></div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Password</p>
              <p className="text-sm font-medium text-slate-700">••••••••••••</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailSettingOverview;
