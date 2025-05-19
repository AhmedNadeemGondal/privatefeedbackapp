// app/api/answer/route.ts
import Together from "together-ai";

const together = new Together();

export async function POST(request: Request) {
  const question =
    "Create three open-ended, friendly questions as one string separated by '||'. They should suit a diverse audience on an anonymous social platform like Qooh.me. Avoid personal topics; focus on universal, positive themes that spark curiosity and good conversation Example: 'What’s a hobby you’ve started?||If you could dine with any historical figure, who?||What simple thing makes you happy?";
  // "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  const res = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages: [{ role: "user", content: question }],
    stream: true,
  });

  return new Response(res.toReadableStream());
}
