import React, { useState } from 'react';
import { X, FileText, Upload as UploadIcon } from 'lucide-react';

interface UploadFileDialogProps {
  onClose: () => void;
  caseId: string;
}

export const UploadFileDialog: React.FC<UploadFileDialogProps> = ({ onClose, caseId }) => {
  const [chosenFiles, setChosenFiles] = useState<{ id: string, name: string, category: string }[]>([]);

  const handleBrowse = (category: string) => {
    // Mocking file selection
    const mockFileName = `invoice_${Math.random().toString(36).substring(2, 8).toUpperCase()}.pdf`;
    setChosenFiles([...chosenFiles, { id: Math.random().toString(), name: mockFileName, category }]);
  };

  const UploadBox = ({ title, category }: { title: string, category: string }) => (
    <div className="flex-[1] min-w-[200px] border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 transition-colors hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm cursor-pointer" onClick={() => handleBrowse(category)}>
      <FileText className="text-slate-700 dark:text-slate-300 mb-2" size={24} />
      <h3 className="text-[15px] font-medium text-slate-700 dark:text-slate-200 mb-3">{title}</h3>
      <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-4" />
      <UploadIcon className="text-slate-300 dark:text-slate-500 mb-2" size={20} />
      <p className="text-[13px] text-slate-400 dark:text-slate-500 mb-1">Drag and drop or</p>
      <button 
        className="text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleBrowse(category);
        }}
      >
        Browse
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-[800px] max-w-[95vw] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-[16px] font-medium text-slate-500 dark:text-slate-400">Upload File</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <h3 className="text-center text-[20px] font-medium text-slate-800 dark:text-slate-200 mb-8">
            Upload files by category
          </h3>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <UploadBox title="Proof of Delivery" category="POD" />
            <UploadBox title="Proof of Purchase" category="POP" />
            <UploadBox title="Other Files" category="Other Files" />
          </div>

          <h4 className="text-[16px] font-medium text-slate-800 dark:text-slate-200 mb-4">Chosen files</h4>
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex flex-col bg-white dark:bg-slate-900">
            <div className="flex items-center px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-[13px] font-medium text-slate-500">
              <span className="flex-1">File Name</span>
              <span className="w-[150px]">Category</span>
            </div>
            
            <div className="min-h-[80px] bg-white dark:bg-slate-900 flex flex-col">
               {chosenFiles.length === 0 ? (
                 <div className="flex-1 flex items-center justify-center text-[14px] text-slate-500 dark:text-slate-400 py-6">
                   Please upload a file
                 </div>
               ) : (
                 <div className="divide-y divide-slate-100 dark:divide-slate-800">
                   {chosenFiles.map(f => (
                     <div key={f.id} className="flex items-center px-6 py-4 text-[13.5px] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                       <span className="flex-1 font-medium">{f.name}</span>
                       <span className="w-[150px]">{f.category}</span>
                       <button 
                         className="p-1.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-md transition-all absolute right-8"
                         onClick={() => setChosenFiles(prev => prev.filter(file => file.id !== f.id))}
                         title="Remove file"
                       >
                         <X size={14} />
                       </button>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[14px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-[14px] font-bold transition-colors"
            onClick={() => {
              // Add to global state if possible, or just close
              onClose();
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
