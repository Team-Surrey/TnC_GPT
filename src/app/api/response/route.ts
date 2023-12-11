"use server";
import { NextResponse } from "next/server";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";
import { ApifyDatasetLoader } from "langchain/document_loaders/web/apify_dataset";
import { Document } from "langchain/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { readFileSync } from "fs";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { GoogleVertexAIEmbeddings } from "langchain/embeddings/googlevertexai";
//import { VectorstoreIndexCreator } from "langchain/indexes";

export async function POST(req: any) {
  const res = await req.json();
  const text = res.input.text;
  //const text = req.nextUrl.searchParams.get(["text"]);
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
        temperature: 0.1,
        topP: 0.95,
        topK: 40,
        model: "text-bison@002",
    })
    const temp2 = `
    Summarize the terms and conditions for signing up for the company ${prompt} in the format:
    Heading of company name
    Summary of what is important in Terms and Conditions: 
      - bullet points
    Things to be aware of:
      - bullet points

    If the company name provided isn't real, dont make up a random response and tell the user to please make sure the company they are asking about is real.
    
  `

  const result = await model.call(temp2);
  console.log(result);
  return result;
}
