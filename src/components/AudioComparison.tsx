
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Volume2, Zap, BarChart3 } from 'lucide-react';

interface AudioComparisonProps {
  originalFile: File;
  isProcessed: boolean;
}

const AudioComparison: React.FC<AudioComparisonProps> = ({ originalFile, isProcessed }) => {
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement>(null);
  const [originalMetrics, setOriginalMetrics] = useState({
    bitrate: 128,
    dynamicRange: 45,
    snr: 62,
    clarity: 75
  });
  const [processedMetrics, setProcessedMetrics] = useState({
    bitrate: 320,
    dynamicRange: 68,
    snr: 89,
    clarity: 95
  });

  useEffect(() => {
    drawWaveform(originalCanvasRef.current, 'original');
    if (isProcessed) {
      drawWaveform(processedCanvasRef.current, 'processed');
    }
  }, [originalFile, isProcessed]);

  const drawWaveform = (canvas: HTMLCanvasElement | null, type: 'original' | 'processed') => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Generate waveform data
    const samples = 200;
    const waveformData = [];
    
    for (let i = 0; i < samples; i++) {
      const baseAmplitude = type === 'original' ? 0.6 : 0.8;
      const noise = type === 'original' ? 0.3 : 0.1;
      const amplitude = baseAmplitude + (Math.random() - 0.5) * noise;
      waveformData.push(amplitude * Math.sin((i / samples) * Math.PI * 8) * (height / 3));
    }

    // Draw waveform
    const barWidth = width / samples;
    
    for (let i = 0; i < samples; i++) {
      const barHeight = Math.abs(waveformData[i]);
      const x = i * barWidth;
      
      // Create gradient based on type
      const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
      if (type === 'original') {
        gradient.addColorStop(0, '#ef4444');
        gradient.addColorStop(0.5, '#f97316');
        gradient.addColorStop(1, '#ef4444');
      } else {
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(0.5, '#06d6a0');
        gradient.addColorStop(1, '#10b981');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight * 2);
    }

    // Add frequency overlay for processed version
    if (type === 'processed') {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#06d6a0';
      for (let i = 0; i < samples; i += 10) {
        const x = i * barWidth;
        const overlayHeight = Math.random() * 20 + 5;
        ctx.fillRect(x, centerY - overlayHeight, barWidth * 2, overlayHeight * 2);
      }
      ctx.globalAlpha = 1;
    }
  };

  const MetricCard = ({ 
    icon: Icon, 
    label, 
    original, 
    processed, 
    unit, 
    color 
  }: {
    icon: React.ElementType;
    label: string;
    original: number;
    processed: number;
    unit: string;
    color: string;
  }) => {
    const improvement = processed - original;
    const improvementPercent = ((improvement / original) * 100).toFixed(1);

    return (
      <div className="bg-slate-800/80 border border-slate-600/50 rounded-xl p-4 hover:bg-slate-800 transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-slate-300 text-sm font-medium">{label}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Original</span>
            <span className="text-sm text-slate-300">{original}{unit}</span>
          </div>
          
          {isProcessed && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Enhanced</span>
                <span className="text-sm text-emerald-400 font-semibold">{processed}{unit}</span>
              </div>
              
              <div className="flex items-center gap-2 pt-1 border-t border-slate-600/30">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">+{improvementPercent}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-slate-900/90 border border-slate-700/50 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-3 text-xl">
          <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          Audio Quality Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Waveform Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h3 className="text-slate-300 font-semibold">Original Audio</h3>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
              <canvas
                ref={originalCanvasRef}
                width={400}
                height={120}
                className="w-full h-24 rounded"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <h3 className="text-slate-300 font-semibold">Enhanced Audio</h3>
              {!isProcessed && (
                <span className="text-xs text-slate-500 italic">(Preview after processing)</span>
              )}
            </div>
            <div className={`bg-slate-800/50 rounded-lg p-4 border border-slate-600/30 ${!isProcessed ? 'opacity-50' : ''}`}>
              <canvas
                ref={processedCanvasRef}
                width={400}
                height={120}
                className="w-full h-24 rounded"
              />
              {!isProcessed && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg">
                  <span className="text-slate-400 text-sm">Process audio to see enhancement</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quality Metrics Comparison
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={Volume2}
              label="Bitrate"
              original={originalMetrics.bitrate}
              processed={processedMetrics.bitrate}
              unit=" kbps"
              color="bg-blue-600"
            />
            
            <MetricCard
              icon={BarChart3}
              label="Dynamic Range"
              original={originalMetrics.dynamicRange}
              processed={processedMetrics.dynamicRange}
              unit=" dB"
              color="bg-purple-600"
            />
            
            <MetricCard
              icon={TrendingUp}
              label="Signal/Noise"
              original={originalMetrics.snr}
              processed={processedMetrics.snr}
              unit=" dB"
              color="bg-indigo-600"
            />
            
            <MetricCard
              icon={Zap}
              label="Clarity Index"
              original={originalMetrics.clarity}
              processed={processedMetrics.clarity}
              unit="%"
              color="bg-emerald-600"
            />
          </div>
        </div>

        {isProcessed && (
          <div className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-600/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              <h4 className="text-emerald-400 font-semibold text-lg">Enhancement Summary</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-slate-300">✨ Noise reduction applied</div>
                <div className="text-slate-300">🎵 Bass frequencies enhanced</div>
                <div className="text-slate-300">🔊 Dynamic range optimized</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-300">🎧 Spatial audio processing</div>
                <div className="text-slate-300">⚡ High-frequency clarity boost</div>
                <div className="text-slate-300">🎚️ Professional mastering applied</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioComparison;
