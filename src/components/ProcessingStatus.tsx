
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Zap, CheckCircle } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  progress: number;
  stage: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ isProcessing, progress, stage }) => {
  if (!isProcessing && !stage) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {stage === 'Complete' ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : (
          <Zap className={`h-5 w-5 text-purple-400 ${isProcessing ? 'animate-pulse' : ''}`} />
        )}
        <div className="flex-1">
          <div className="text-white text-sm font-medium">
            {stage === 'Complete' ? 'Remastering Complete!' : stage}
          </div>
          {isProcessing && (
            <div className="text-gray-400 text-xs">
              Processing with advanced AI algorithms...
            </div>
          )}
        </div>
      </div>
      
      {(isProcessing || stage === 'Complete') && (
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2 bg-slate-700"
          />
          <div className="text-right text-xs text-gray-400">
            {Math.round(progress)}%
          </div>
        </div>
      )}

      {stage === 'Complete' && (
        <div className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
          <div className="text-green-400 text-sm font-medium">
            ✨ Studio-Grade Enhancement Applied
          </div>
          <div className="text-green-300 text-xs mt-1">
            Your audio has been transformed with cutting-edge AI processing
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;
