export const runtime = "nodejs";

type GenerateRequest = {
  prompt: string;
  image: string; // data URL or http(s) URL
};

export async function POST(request: Request) {
  try {
    const { prompt, image } = (await request.json()) as GenerateRequest;

    if (!prompt || !image) {
      return new Response(
        JSON.stringify({ error: "Missing prompt or image" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfigured: missing OPENROUTER_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use Gemini for image generation
    const model = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash-image-preview";

    const body = {
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: image } }
          ],
        },
      ],
      max_tokens: 1000,
    };

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_NAME || "Nano Banana",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      // Try to extract a helpful error message from OpenRouter
      let message: string | undefined;
      let providerBody: any = null;
      const contentType = resp.headers.get("content-type") || "";
      try {
        if (contentType.includes("application/json")) {
          providerBody = await resp.json();
        } else {
          providerBody = await resp.text();
        }
      } catch {
        // ignore parse errors
      }

      if (typeof providerBody === "string") {
        message = providerBody.slice(0, 1000);
      } else if (providerBody?.error) {
        if (typeof providerBody.error === "string") message = providerBody.error;
        else if (typeof providerBody.error?.message === "string") message = providerBody.error.message;
      }
      if (!message && typeof providerBody?.message === "string") {
        message = providerBody.message;
      }

      return new Response(
        JSON.stringify({
          error: message || "OpenRouter error",
          status: resp.status,
          details: typeof providerBody === "string" ? providerBody : undefined,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();

    // Extract image URLs from Gemini response format
    const images: string[] = [];

    // Function to recursively search for images in the response
    function collectImages(obj: any) {
      if (!obj) return;

      if (Array.isArray(obj)) {
        for (const item of obj) {
          collectImages(item);
        }
        return;
      }

      if (typeof obj === "object") {
        // Check for various image URL patterns
        if (obj.url && typeof obj.url === "string" && /^https?:\/\//.test(obj.url)) {
          images.push(obj.url);
        }

        // Check for image_url structure
        if (obj.image_url && obj.image_url.url && typeof obj.image_url.url === "string") {
          images.push(obj.image_url.url);
        }

        // Check for data URLs
        if (obj.data && obj.mime_type && typeof obj.data === "string" && typeof obj.mime_type === "string") {
          images.push(`data:${obj.mime_type};base64,${obj.data}`);
        }

        // Recursively check all properties
        for (const value of Object.values(obj)) {
          collectImages(value);
        }
      }

      // Check if it's a string that might be a URL
      if (typeof obj === "string" && /^https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)/i.test(obj)) {
        images.push(obj);
      }
    }

    collectImages(data);

    // Also check the content text for URLs
    if (data?.choices?.[0]?.message?.content) {
      const content = data.choices[0].message.content;
      if (typeof content === "string") {
        // Look for image URLs in the text
        const urlMatches = content.match(/https?:\/\/[^\s)]+\.(jpg|jpeg|png|gif|webp)/gi);
        if (urlMatches) {
          images.push(...urlMatches);
        }
      }
    }

    // Debug logging
    console.log("Full API response:", JSON.stringify(data, null, 2));
    console.log("Found images:", images);

    if (images.length === 0) {
      // Return friendly message with HTTP 200 so client can render a nice notice
      return new Response(
        JSON.stringify({
          images: [],
          error: "The model did not return an image. Try a more specific prompt (e.g. 'return a PNG image of ...') or switch to a model that outputs images.",
          raw: data,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Server error", message: err?.message ?? String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
