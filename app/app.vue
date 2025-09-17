<template>
  <div class="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#1b173d] to-[#2b215f] text-white flex flex-col">
    <header class="py-16 text-center">
      <h1
        class="text-4xl md:text-6xl font-extrabold tracking-wide mb-4 animate-fadeInDown drop-shadow-[0_0_12px_#7c3aed]">
        YouTube Transcript Fetcher
      </h1>
      <p class="text-lg md:text-2xl text-gray-300 animate-fadeIn delay-200">
        Fetch and save transcripts from any YouTube video instantly.
      </p>
    </header>
    <main class="flex-grow flex items-center justify-center px-4">
      <div
        class="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-xl animate-fadeInUp border border-white/20">
        <div class="mb-6">
          <input v-model="videoInput" type="text" placeholder="Enter YouTube Video ID or URL"
            class="w-full px-6 py-3 rounded-lg border border-white/30 placeholder-gray-300 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
        </div>
        <div class="mb-6 flex flex-col md:flex-row gap-4 justify-center">
          <button @click="fetchTranscript" :disabled="loading"
            class="flex-1 px-6 py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:-translate-y-1 hover:scale-105 shadow-[0_0_12px_rgba(139,92,246,0.5)] hover:shadow-[0_0_18px_rgba(139,92,246,0.7)]">
            <span v-if="loading" class="animate-pulse">Fetching...</span>
            <span v-else>🚀 Fetch Transcript</span>
          </button>
          <button v-if="transcript" @click="downloadTranscript"
            class="flex-1 px-6 py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 transition transform hover:-translate-y-1 hover:scale-105 shadow-[0_0_12px_rgba(34,197,94,0.5)] hover:shadow-[0_0_18px_rgba(34,197,94,0.7)]">
            💾 Download
          </button>
        </div>
        <p :class="statusClass" class="text-center mb-4">{{ status }}</p>
        <div v-if="transcript"
          class="bg-black/30 border border-white/20 p-4 rounded-lg max-h-80 overflow-y-auto text-gray-100 whitespace-pre-wrap animate-fadeIn">
          {{ transcript }}
        </div>
      </div>
    </main>

    <div class="h-[1px] w-full bg-white/10 my-10"></div>
    <section class="py-16 text-center animate-fadeIn">
      <h2 class="text-3xl md:text-4xl font-extrabold tracking-wide mb-10 drop-shadow-[0_0_10px_#9333ea]">
        🛠️ How to Use
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div
          class="p-6 bg-white/10 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_20px_#a78bfa]">
          <h3 class="font-semibold text-xl mb-3">🔗 Step 1: Enter a Link</h3>
          <p class="text-gray-300">
            Paste a YouTube video URL or ID in the input field above.
          </p>
        </div>
        <div
          class="p-6 bg-white/10 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_20px_#a78bfa]">
          <h3 class="font-semibold text-xl mb-3">
            ⚡ Step 2: Fetch Transcript
          </h3>
          <p class="text-gray-300">
            Hit
            <span class="text-purple-400 font-semibold">Fetch Transcript</span>
            and wait a few seconds.
          </p>
        </div>
        <div
          class="p-6 bg-white/10 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_20px_#a78bfa]">
          <h3 class="font-semibold text-xl mb-3">💾 Step 3: Save It</h3>
          <p class="text-gray-300">
            Download the transcript as a .txt file for offline use.
          </p>
        </div>
      </div>
    </section>
    <footer class="py-8 text-center text-gray-400 text-sm border-t border-white/10">
      <p>
        &copy; {{ new Date().getFullYear() }} <NuxtLink href="https://github.com/M1dnght-dev" class="underline hover:text-white transition duration-300">M1dnght-dev</NuxtLink>. All rights reserved.
        |
        <NuxtLink href="https://m1dnght.dev/terms" class="underline hover:text-white transition duration-300">Terms of Service</NuxtLink>
        | 
        <NuxtLink href="https://m1dnght.dev/privacy" class="underline hover:text-white transition duration-300">Privacy Policy</NuxtLink>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const videoInput = ref("");
const transcript = ref("");
const status = ref("");
const statusClass = ref("text-center text-gray-300");
const loading = ref(false);

function extractVideoId(input: string) {
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v");
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
  } catch {
    return input;
  }
  return input;
}

const fetchTranscript = async () => {
  const videoId = extractVideoId(videoInput.value.trim());
  if (!videoId) {
    status.value = "Please enter a valid YouTube Video ID or URL.";
    statusClass.value = "text-red-500";
    return;
  }

  loading.value = true;
  status.value = "Fetching transcript...";
  statusClass.value = "text-blue-400";
  transcript.value = "";

  try {
    const data = await $fetch("/api/transcript", {
      method: "GET",
      params: { videoId },
    });

    if (data?.success) {
      transcript.value = data.transcript;
      status.value = "✅ Transcript fetched successfully!";
      statusClass.value = "text-green-400";
    } else {
      status.value = `Error: ${data?.error || "Unknown error"}`;
      statusClass.value = "text-red-500";
    }
  } catch (err: any) {
    status.value = `Unexpected error: ${err?.message || "Unknown error"}`;
    statusClass.value = "text-red-500";
  } finally {
    loading.value = false;
  }
};

const downloadTranscript = () => {
  const blob = new Blob([transcript.value], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${videoInput.value.trim() || "transcript"}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<style>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInDown {
  animation: fadeInDown 0.8s ease forwards;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease forwards;
}

.animate-fadeIn {
  animation: fadeInUp 1s ease forwards;
}
</style>
