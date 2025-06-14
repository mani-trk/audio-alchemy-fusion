
import React from 'react';
import AudioRemaster from '@/components/AudioRemaster';
import { Music, Guitar, Piano, Drum, Headphones, Waves } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Music Icons with better animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Guitar className="h-32 w-32 text-purple-300 rotate-12 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <Piano className="h-28 w-28 text-pink-300 -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-32 left-20 opacity-10">
          <Drum className="h-36 w-36 text-blue-300 rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-60 left-1/2 transform -translate-x-1/2 opacity-10">
          <Music className="h-24 w-24 text-purple-300 rotate-90 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Headphones className="h-30 w-30 text-pink-300 -rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="absolute top-32 left-1/3 opacity-10">
          <Waves className="h-20 w-20 text-blue-300 rotate-180 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 opacity-10">
          <Guitar className="h-24 w-24 text-purple-300 rotate-270 animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-300/25 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16">
          {/* Enhanced glass effect header container */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 rounded-[2rem] p-12 mb-12 shadow-2xl relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-[2rem]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center items-center gap-6 mb-8">
                <div className="p-4 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                  <Music className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
                <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                  AudioZen Remaster Pro
                </h1>
                <div className="p-4 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                  <Guitar className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light">
                  Transform your audio with cutting-edge AI enhancement
                </p>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-2">
                  Experience crystal-clear sound quality that surpasses industry standards
                </p>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg">
                      <Waves className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2">AI Enhancement</h3>
                  <p className="text-gray-300 text-sm">Advanced algorithms for superior audio quality</p>
                </div>
                
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-lg">
                      <Headphones className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Studio Quality</h3>
                  <p className="text-gray-300 text-sm">Professional-grade audio processing</p>
                </div>
                
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500/30 to-pink-500/30 rounded-lg">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Multiple Formats</h3>
                  <p className="text-gray-300 text-sm">Support for MP3, MP4, WAV, FLAC & more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced glass container for the main component */}
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/8 border border-white/20 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-[2rem]"></div>
          <div className="relative z-10">
            <AudioRemaster />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
