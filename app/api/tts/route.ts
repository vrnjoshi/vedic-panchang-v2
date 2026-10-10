import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, language } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    // Call the Gemini API requesting an AUDIO modality response
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: `Speak the following astronomical update naturally in ${language === 'hi' ? 'Hindi' : 'English'}:\n\n${text}` }]
          }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: language === 'hi' ? "Aoede" : "Puck" 
                }
              }
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", errText);
      return NextResponse.json({ error: "Failed to generate audio from Gemini" }, { status: response.status });
    }

    const data = await response.json();
    
    // Extract the base64 audio string from the Gemini response parts
    const audioPart = data.candidates[0]?.content?.parts?.find(
      (part: any) => part.inlineData?.mimeType?.startsWith('audio/')
    );
    
    if (!audioPart) {
      throw new Error("No audio data returned from model");
    }

    return NextResponse.json({ audioBase64: audioPart.inlineData.data });
    
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}