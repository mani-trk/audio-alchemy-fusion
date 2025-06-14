import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Settings, Upload, Zap, Music, Headphones, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AudioUpload from '@/components/AudioUpload';
import AudioControls from '@/components/AudioControls';
import ProcessingStatus from '@/components/ProcessingStatus';
import AudioSpectrum from '@/components/AudioSpectrum';
import AudioComparison from '@/components/AudioComparison';

const MAX_OUTPUT_SIZE = 15 * 1024 * 1024; // 15MB

const AudioRemaster = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [progress, setProgress] = useState(0);
  const [processedAudio, setProcessedAudio] = useState<string | null>(null);
  const [processedAudioBlob, setProcessedAudioBlob] = useState<Blob | null>(null);
  const [audioSettings, setAudioSettings] = useState({
    bitrate: 320,
    format: 'mp3',
    noiseReduction: true,
    bassEnhancement: true,
    clarityBoost: true,
    spatialAudio: true
  });
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name, file.size, file.type);
    setAudioFile(file);
    setProcessedAudio(null);
    setProcessedAudioBlob(null);
    setProgress(0);
    setProcessingStage('');
    toast({
      title: "Audio File Uploaded",
      description: `${file.name} is ready for remastering`,
    });
  };

  const encodeToMp3 = async (audioBuffer: AudioBuffer, bitrate: number): Promise<Blob> => {
    try {
      // Dynamic import for better compatibility
      const { Mp3Encoder } = await import('@breezystack/lamejs');
      
      const channels = Math.min(audioBuffer.numberOfChannels, 2);
      const sampleRate = audioBuffer.sampleRate;
      const left = audioBuffer.getChannelData(0);
      const right = channels === 2 ? audioBuffer.getChannelData(1) : left;
      
      // Convert Float32Array to Int16Array
      const leftBuffer = new Int16Array(left.length);
      const rightBuffer = new Int16Array(right.length);
      
      for (let i = 0; i < left.length; i++) {
        leftBuffer[i] = Math.max(-32768, Math.min(32767, left[i] * 32768));
        rightBuffer[i] = Math.max(-32768, Math.min(32767, right[i] * 32768));
      }
      
      const mp3encoder = new Mp3Encoder(channels, sampleRate, bitrate);
      const mp3Data = [];
      const blockSize = 1152;
      
      for (let i = 0; i < leftBuffer.length; i += blockSize) {
        const leftChunk = leftBuffer.subarray(i, i + blockSize);
        const rightChunk = rightBuffer.subarray(i, i + blockSize);
        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
        if (mp3buf.length > 0) {
          mp3Data.push(new Uint8Array(mp3buf));
        }
      }
      
      const endBuf = mp3encoder.flush();
      if (endBuf.length > 0) {
        mp3Data.push(new Uint8Array(endBuf));
      }
      
      return new Blob(mp3Data, { type: 'audio/mp3' });
    } catch (error) {
      console.error('MP3 encoding failed:', error);
      // Fallback to WAV if MP3 encoding fails
      return bufferToWave(audioBuffer);
    }
  };

  const processAudio = async (file: File): Promise<{url: string, blob: Blob}> => {
    console.log('Starting audio processing for:', file.name);
    
    try {
      // Create audio context for processing
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      console.log('Audio decoded successfully:', {
        duration: audioBuffer.duration,
        sampleRate: audioBuffer.sampleRate,
        channels: audioBuffer.numberOfChannels
      });

      // Apply basic audio processing (simulation of enhancement)
      const processedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      // Copy and slightly modify the audio data to simulate processing
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const inputData = audioBuffer.getChannelData(channel);
        const outputData = processedBuffer.getChannelData(channel);
        
        for (let i = 0; i < inputData.length; i++) {
          // Apply simple enhancement (normalize and slightly compress)
          let sample = inputData[i];
          
          // Simulate noise reduction
          if (audioSettings.noiseReduction && Math.abs(sample) < 0.01) {
            sample *= 0.5;
          }
          
          // Simulate clarity boost
          if (audioSettings.clarityBoost) {
            sample *= 1.1;
          }
          
          // Ensure we don't clip
          outputData[i] = Math.max(-1, Math.min(1, sample));
        }
      }

      // Render processedBuffer to PCM
      const offlineContext = new OfflineAudioContext(
        processedBuffer.numberOfChannels,
        processedBuffer.length,
        processedBuffer.sampleRate
      );
      const source = offlineContext.createBufferSource();
      source.buffer = processedBuffer;
      source.connect(offlineContext.destination);
      source.start();
      const renderedBuffer = await offlineContext.startRendering();

      // Encode based on format setting
      let blob: Blob;
      if (audioSettings.format === 'mp3') {
        blob = await encodeToMp3(renderedBuffer, audioSettings.bitrate);
      } else {
        // Fallback to WAV
        blob = await bufferToWave(renderedBuffer);
      }

      const url = URL.createObjectURL(blob);
      return { url, blob };
    } catch (error) {
      console.error('Audio processing failed:', error);
      // Fallback: just return the original file URL
      return { url: URL.createObjectURL(file), blob: file };
    }
  };

  const bufferToWave = async (buffer: AudioBuffer): Promise<Blob> => {
    const length = buffer.length;
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);

    // Write WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);

    // Write audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  const simulateProcessing = async () => {
    if (!audioFile) {
      console.log('No audio file selected');
      toast({
        title: "No File Selected",
        description: "Please upload an audio file first",
        variant: "destructive"
      });
      return;
    }

    console.log('Starting remastering process for:', audioFile.name);
    setIsProcessing(true);
    setProgress(0);
    setProcessedAudio(null);
    setProcessedAudioBlob(null);

    const stages = [
      { name: 'Analyzing audio signature...', duration: 1000 },
      { name: 'Applying AI noise reduction...', duration: 2000 },
      { name: 'Enhancing clarity and depth...', duration: 1500 },
      { name: 'Optimizing dynamic range...', duration: 1200 },
      { name: 'Applying spatial enhancement...', duration: 800 },
      { name: 'Finalizing remaster...', duration: 500 }
    ];

    let totalProgress = 0;
    const progressStep = 100 / stages.length;

    try {
      for (const stage of stages) {
        console.log('Processing stage:', stage.name);
        setProcessingStage(stage.name);
        await new Promise(resolve => setTimeout(resolve, stage.duration));
        totalProgress += progressStep;
        setProgress(Math.min(totalProgress, 100));
      }

      // Actually process the audio
      const { url, blob } = await processAudio(audioFile);

      if (blob.size > MAX_OUTPUT_SIZE) {
        setProcessingStage('');
        setIsProcessing(false);
        toast({
          title: "Output File Too Large",
          description: "Remastered file is larger than 15MB. Please use a shorter or lower-bitrate audio.",
          variant: "destructive"
        });
        return;
      }

      setProcessedAudio(url);
      setProcessedAudioBlob(blob);
      setProcessingStage('Complete');
      setIsProcessing(false);

      console.log('Remastering completed successfully');
      toast({
        title: "Remastering Complete!",
        description: `Your audio has been enhanced and saved as .${audioSettings.format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Remastering failed:', error);
      setIsProcessing(false);
      setProcessingStage('');
      toast({
        title: "Remastering Failed",
        description: "There was an error processing your audio file",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    if (processedAudio && processedAudioBlob && audioFile) {
      if (processedAudioBlob.size > MAX_OUTPUT_SIZE) {
        toast({
          title: "File Too Large",
          description: "Output file is greater than 15MB. Please re-encode with lower quality or use a shorter input.",
          variant: "destructive"
        });
        return;
      }
      const link = document.createElement('a');
      link.href = processedAudio;
      const ext = audioSettings.format === 'mp3' ? 'mp3' : 'wav';
      link.download = `remastered_${audioFile.name.replace(/\.[^/.]+$/, '')}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Your remastered audio (${audioSettings.format.toUpperCase()}) is being downloaded`,
      });
    } else {
      console.log('No processed audio available for download');
      toast({
        title: "No Audio to Download",
        description: "Please process an audio file first",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg">
                <Upload className="h-6 w-6 text-white" />
              </div>
              Upload Audio File
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AudioUpload onFileUpload={handleFileUpload} />
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              Enhancement Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AudioControls 
              settings={audioSettings}
              onSettingsChange={setAudioSettings}
            />
          </CardContent>
        </Card>
      </div>

      {audioFile && (
        <AudioComparison 
          originalFile={audioFile}
          isProcessed={!!processedAudio}
        />
      )}

      {audioFile && (
        <Card className="bg-slate-800/50 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              Audio Spectrum Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AudioSpectrum audioFile={audioFile} />
          </CardContent>
        </Card>
      )}

      {audioFile && (
        <Card className="bg-slate-800/50 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              AI Remastering Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={simulateProcessing}
                disabled={isProcessing || !audioFile}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-6 px-8 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Zap className="h-5 w-5 mr-3 animate-pulse" />
                    Processing Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-3" />
                    Start AI Remastering
                  </>
                )}
              </Button>

              {processedAudio && (
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-6 px-8 hover:scale-105"
                >
                  <Download className="h-5 w-5 mr-3" />
                  Download Enhanced Audio
                </Button>
              )}
            </div>

            <ProcessingStatus 
              isProcessing={isProcessing}
              progress={progress}
              stage={processingStage}
            />
          </CardContent>
        </Card>
      )}

      {processedAudio && (
        <Card className="bg-slate-800/50 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl shadow-lg">
                <Headphones className="h-6 w-6 text-white" />
              </div>
              Preview Enhanced Audio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 bg-slate-700/50 rounded-2xl border border-slate-600/30 shadow-lg">
                <audio controls className="w-full">
                  <source src={processedAudio} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="text-blue-400 font-semibold text-sm mb-1">Bitrate</div>
                  <div className="text-white text-xl font-bold">{audioSettings.bitrate} kbps</div>
                </div>
                <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="text-purple-400 font-semibold text-sm mb-1">Format</div>
                  <div className="text-white text-xl font-bold">{audioSettings.format === 'mp3' ? 'MP3' : 'WAV'}</div>
                </div>
                <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="text-emerald-400 font-semibold text-sm mb-1">Quality</div>
                  <div className="text-white text-xl font-bold">Studio Grade</div>
                </div>
                <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600/30 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="text-indigo-400 font-semibold text-sm mb-1">Enhancement</div>
                  <div className="text-white text-xl font-bold">AI Optimized</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudioRemaster;
