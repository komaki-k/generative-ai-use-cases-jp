import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

const client = new PollyClient({
  region: process.env.VITE_APP_REGION
})

const pollyApi = {
  synthesize: async (text: string): Promise<void> => {
    const command = new SynthesizeSpeechCommand({
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: 'Tomoko'
    });

    try {
      const data = await client.send(command)
      if (data && data.AudioStream instanceof Buffer) {
        // TODO fix any
        const audioBlob = new Blob([data.AudioStream] as any, {type: 'audio/mp3'})
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        await audio.play();
      }
    } catch (err) {
      console.error('Error synthesizing speech:', err);
    }
  }
}

export default pollyApi;
