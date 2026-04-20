import React from 'react';
import { X, Download, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export interface CaseFile {
  id: string;
  createdBy: string;
  createdAt: string;
  fileName: string;
  category: string;
  url?: string;
}

interface ManageCaseFilesDialogProps {
  files: CaseFile[];
  onClose: () => void;
}

export const ManageCaseFilesDialog: React.FC<ManageCaseFilesDialogProps> = ({ files, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-5xl mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight leading-none pt-0.5">Manage Case Files</h2>
            {files.length > 0 && (
              <button 
                onClick={() => {
                  alert(`Downloading all ${files.length} files...`);
                  // In a real app: files.forEach(f => window.open(f.url, '_blank'));
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                <Download size={14} strokeWidth={3} />
                Download All Files
              </button>
            )}
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm">
            <thead className="bg-white dark:bg-slate-900">
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium">
                <th className="px-6 py-4 text-left font-medium">Created By</th>
                <th className="px-6 py-4 text-left font-medium">Created At</th>
                <th className="px-6 py-4 text-left font-medium">File Name</th>
                <th className="px-6 py-4 text-center font-medium">Category</th>
                <th className="px-6 py-4 text-center font-medium">Download File</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {files.map(file => (
                <tr key={file.id} className="text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono">{file.createdBy}</td>
                  <td className="px-6 py-4">{file.createdAt}</td>
                  <td className="px-6 py-4 text-slate-500">{file.fileName}</td>
                  <td className="px-6 py-4 text-center">{file.category}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm transition-colors">
                      <Download size={16} className="text-slate-600" />
                      Download
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-md font-medium text-sm transition-colors">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {files.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                    No files found for this case.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button disabled className="flex items-center gap-1 px-3 py-1.5 text-slate-300 font-medium text-sm cursor-not-allowed">
              <ChevronLeft size={16} /> Previous
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 rounded-md text-sm font-medium">
              1
            </button>
            <button disabled className="flex items-center gap-1 px-3 py-1.5 text-slate-300 font-medium text-sm cursor-not-allowed">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
