
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface AudioSpectrumProps {
  audioFile: File;
}

const AudioSpectrum: React.FC<AudioSpectrumProps> = ({ audioFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const setupAudio = async () => {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const arrayBuffer = await audioFile.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);
        
        const source = context.createBufferSource();
        const analyserNode = context.createAnalyser();
        
        source.buffer = audioBuffer;
        source.connect(analyserNode);
        analyserNode.connect(context.destination);
        
        analyserNode.fftSize = 256;
        
        setAudioContext(context);
        setAnalyser(analyserNode);
        
        // Start visualization
        drawSpectrum(analyserNode);
      } catch (error) {
        console.log('Audio setup failed:', error);
        // Fallback to animated visualization
        drawFallbackSpectrum();
      }
    };

    setupAudio();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioFile]);

  const drawSpectrum = (analyserNode: AnalyserNode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyserNode.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(0.5, '#ec4899');
        gradient.addColorStop(1, '#f59e0b');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const drawFallbackSpectrum = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 64;
    const barWidth = canvas.width / bars;

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * canvas.height * 0.8;
        const x = i * barWidth;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(0.5, '#ec4899');
        gradient.addColorStop(1, '#f59e0b');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  return (
    <div className="w-full h-48 bg-slate-900/50 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={192}
        className="w-full h-full"
        style={{ background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)' }}
      />
    </div>
  );
};

export default AudioSpectrum;
