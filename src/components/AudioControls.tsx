
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface AudioSettings {
  bitrate: number;
  format: string;
  noiseReduction: boolean;
  bassEnhancement: boolean;
  clarityBoost: boolean;
  spatialAudio: boolean;
}

interface AudioControlsProps {
  settings: AudioSettings;
  onSettingsChange: (settings: AudioSettings) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({ settings, onSettingsChange }) => {
  const updateSetting = (key: keyof AudioSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-white text-sm font-medium">Audio Quality</Label>
        <div className="flex gap-2">
          {[128, 320].map((bitrate) => (
            <Button
              key={bitrate}
              onClick={() => updateSetting('bitrate', bitrate)}
              variant={settings.bitrate === bitrate ? 'default' : 'outline'}
              className={`${
                settings.bitrate === bitrate
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'border-slate-600 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {bitrate} kbps
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-white text-sm font-medium">Output Format</Label>
        <div className="flex gap-2">
          {['mp3', 'mp4'].map((format) => (
            <Button
              key={format}
              onClick={() => updateSetting('format', format)}
              variant={settings.format === format ? 'default' : 'outline'}
              className={`${
                settings.format === format
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'border-slate-600 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {format.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-white text-sm font-medium">AI Enhancements</Label>
        <div className="space-y-3">
          {[
            { key: 'noiseReduction', label: 'AI Noise Reduction', description: 'Remove background noise and artifacts' },
            { key: 'bassEnhancement', label: 'Bass Enhancement', description: 'Enrich low-frequency response' },
            { key: 'clarityBoost', label: 'Clarity Boost', description: 'Enhance vocal and instrument clarity' },
            { key: 'spatialAudio', label: 'Spatial Audio', description: 'Create immersive 3D soundstage' }
          ].map((enhancement) => (
            <div key={enhancement.key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{enhancement.label}</div>
                <div className="text-gray-400 text-xs">{enhancement.description}</div>
              </div>
              <Switch
                checked={settings[enhancement.key as keyof AudioSettings] as boolean}
                onCheckedChange={(checked) => updateSetting(enhancement.key as keyof AudioSettings, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
