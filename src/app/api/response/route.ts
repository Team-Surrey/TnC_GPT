"use server";
import { NextResponse } from "next/server";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";

export async function POST(req: any) {
  const res = await req.json();
  const text = res.input.text;
  console.log(text);
  const langPred = await openAiPredict(text);

  return NextResponse.json(langPred);
}

async function openAiPredict(prompt: string) {
  const cred = process.env.VERTEX_AI_CREDENTIALS;
  if (!cred) return { error: "No credentials" };
  const credObj = JSON.parse(cred);
  const model = new GoogleVertexAI({
    authOptions: {
      credentials: credObj,
    },
    temperature: 0.2,
    topP: 0.95,
    topK: 40,

  });
  
  const temp2 = `
    Summarize the terms of service of company ${prompt} in the format:
    Heading of company name
    Summary of Tos: 
      - bullet points
    Things to be aware of:
      - bullet points

    If the company name provided isn't real, dont make up a random response and tell the user to please make sure the company they are asking about is real.
    
  `
  const result = await model.call(temp2);
  console.log(result);
  return result;
}
