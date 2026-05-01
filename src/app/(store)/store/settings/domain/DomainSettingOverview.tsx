import { CommonButton } from "@/attribute";
import { DomainSettingResponse } from "@/type";
import { Dropdown, MenuProps, Tag } from "antd";
import { FiAlertCircle, FiCheckCircle, FiGlobe, FiMoreVertical } from "react-icons/fi";

interface DomainSettingOverviewProps {
  domains: DomainSettingResponse[];
  getMenuProps: (domain: DomainSettingResponse) => MenuProps;
  setIsModalOpen: (open: boolean) => void;
}

const DomainSettingOverview = ({ domains, getMenuProps, setIsModalOpen }: DomainSettingOverviewProps) => {
  if (domains.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50">
        <FiGlobe className="mx-auto h-12 w-12 text-slate-300 mb-3" />
        <h3 className="text-sm font-semibold text-slate-900">No custom domains</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">You haven't connected any custom domains yet. Click the Add Domain button above to get started.</p>
        <div className="mt-6">
          <CommonButton onClick={() => setIsModalOpen(true)} size="small" type="primary" variant="outlined">
            Connect Domain
          </CommonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {domains.map((domain) => (
        <div key={domain._id} className={`rounded-xl border ${domain.isPrimary ? 'border-brand-200 bg-brand-50/30' : 'border-slate-200 bg-white'} overflow-hidden flex flex-col relative transition-all hover:shadow-md`}>
          
          {/* Card Header */}
          <div className={`px-5 py-4 border-b ${domain.isPrimary ? 'border-brand-100' : 'border-slate-100'} flex justify-between items-start`}>
            <div className="flex items-center gap-3 truncate">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${domain.isPrimary ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>
                <FiGlobe size={20} />
              </div>
              <div className="truncate">
                <h4 className="font-semibold text-slate-900 text-[15px] truncate" title={domain.domain}>{domain.domain}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[11px] font-medium uppercase tracking-wide flex items-center gap-1 ${domain.status === 'verified' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {domain.status === 'verified' ? <FiCheckCircle size={12} /> : <FiAlertCircle size={12} />}
                    {domain.status === 'verified' ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
            
            <Dropdown menu={getMenuProps(domain)} trigger={['click']} placement="bottomRight">
              <button className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0">
                <FiMoreVertical size={16} />
              </button>
            </Dropdown>
          </div>

          {/* Card Body */}
          <div className="p-5 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">SSL Certificate</span>
              {domain.sslEnabled ? (<Tag color="success" variant="filled" className="m-0 text-[10px]">Active</Tag>) : (<Tag color="warning" variant="filled" className="m-0 text-[10px]">Pending</Tag>)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Domain Type</span>
              {domain.isPrimary ? (<Tag color="success" variant="filled" className="m-0 text-[10px] font-bold">PRIMARY</Tag>) : (<span className="text-[11px] text-slate-600">Secondary</span>)}
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default DomainSettingOverview;
