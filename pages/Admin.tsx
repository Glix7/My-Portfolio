
import React, { useEffect } from 'react';
import { Database, ExternalLink, ArrowLeft } from 'lucide-react';
import { pb } from '../lib/pocketbase';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
    
    // Simple redirect component as requested to remove complex checks
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="max-w-md w-full text-center border border-white/10 bg-[#050505] p-10 rounded-3xl shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-white/5 border border-white/10">
                        <Database size={32} className="text-primary" />
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold font-display uppercase tracking-wider mb-2">Backend Access</h1>
                <p className="text-textMuted text-sm mb-8">
                    Go to PocketBase Dashboard
                </p>

                <div className="space-y-4">
                    <a 
                        href={`${pb.baseUrl}/_`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-filled w-full flex items-center justify-center gap-2"
                    >
                        Open Dashboard <ExternalLink size={16} />
                    </a>
                    
                    <Link 
                        to="/" 
                        className="btn btn-white w-full flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Admin;
