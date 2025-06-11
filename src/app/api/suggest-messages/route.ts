// app/api/answer/route.ts
import Together from "together-ai";

const together = new Together();

export async function POST() {
  // const body = await request.json();
  // console.log(body.question);
  const question =
    // body.question + " " +
    "Create three open-ended, friendly questions as one string separated by '||'. They should suit a diverse audience on an anonymous social platform like Qooh.me. Avoid personal topics; focus on universal, positive themes that spark curiosity and good conversation Example: 'What’s a hobby you’ve started?||If you could dine with any historical figure, who?||What simple thing makes you happy?";
  // "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
  // console.log(question);
  const res = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages: [{ role: "user", content: question }],
    stream: true,
    // --- ADDED PARAMETERS BELOW ---
    temperature: 0.9, // Increase this value for more randomness (e.g., 0.8 to 1.0)
    top_p: 0.7, // Adjust this value. Lower values mean less diverse but more focused choices.
    // max_tokens: 100, // Optional: Limit the length of the generated response
    // stop: ["\n"],    // Optional: Stop generation when a specific token is encountered
    // --- ADDED PARAMETERS ABOVE ---
  });

  return new Response(res.toReadableStream());
}
