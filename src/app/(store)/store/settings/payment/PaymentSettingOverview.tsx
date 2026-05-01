import { PaymentSettingResponse } from "@/type";
import { Tag } from "antd";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { SiRazorpay, SiPhonepe } from "react-icons/si";

interface PaymentSettingOverviewProps {
  Data: PaymentSettingResponse;
}

const PaymentSettingOverview = ({ Data }: PaymentSettingOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Razorpay Section */}
      <div className={`p-5 rounded-xl border ${Data?.isRazorpay ? 'border-brand-200 bg-brand-50/20' : 'border-slate-200 bg-slate-50/50'} transition-all`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <SiRazorpay size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Razorpay</h3>
              <p className="text-xs text-slate-500 mt-0.5">Accept payments via Credit Card, UPI, Wallets, and NetBanking</p>
            </div>
          </div>
          {Data?.isRazorpay ? (
            <Tag color="success" variant="filled" className="m-0 font-medium"><span className="flex items-center gap-1.5"><FiCheckCircle /> Active</span></Tag>
          ) : (
            <Tag color="error" variant="filled" className="m-0 font-medium"><span className="flex items-center gap-1.5"><FiXCircle /> Disabled</span></Tag>
          )}
        </div>
        
        {Data?.isRazorpay && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">API Key</p>
              <p className="text-sm font-medium text-slate-900 break-all bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.razorpayApiKey || "Not configured"}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">API Secret</p>
              <p className="text-sm font-medium text-slate-900 break-all bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">••••••••••••••••</p>
            </div>
          </div>
        )}
      </div>

      {/* PhonePe Section */}
      <div className={`p-5 rounded-xl border ${Data?.isPhonePe ? 'border-brand-200 bg-brand-50/20' : 'border-slate-200 bg-slate-50/50'} transition-all`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <SiPhonepe size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">PhonePe</h3>
              <p className="text-xs text-slate-500 mt-0.5">Accept fast UPI and Wallet payments via PhonePe</p>
            </div>
          </div>
          {Data?.isPhonePe ? (
            <Tag color="success" variant="filled" className="m-0 font-medium"><span className="flex items-center gap-1.5"><FiCheckCircle /> Active</span></Tag>
          ) : (
            <Tag color="error" variant="filled" className="m-0 font-medium"><span className="flex items-center gap-1.5"><FiXCircle /> Disabled</span></Tag>
          )}
        </div>
        
        {Data?.isPhonePe && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Merchant ID (API Key)</p>
              <p className="text-sm font-medium text-slate-900 break-all bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">{Data?.phonePeApiKey || "Not configured"}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Salt Key (API Secret)</p>
              <p className="text-sm font-medium text-slate-900 break-all bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">••••••••••••••••</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Salt Index (Version)</p>
              <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm inline-block">{Data?.phonePeVersion || "1"}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default PaymentSettingOverview;
