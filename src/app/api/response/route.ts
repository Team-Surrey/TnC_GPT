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


  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 100,
    chunkOverlap: 20,
  });
    const loader = new ApifyDatasetLoader( "IthgZdVXyQvgoj6lR", {
      datasetMappingFunction: (item) => 
        new Document({
          pageContent: (item.text || "") as string,
          metadata: {
            url: item.url,
          },
        }),
    })
    const docs = await splitter.splitDocuments(await loader.load());
    let vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

    const chain = RetrievalQAChain.fromLLM(
      new GoogleVertexAI({
        authOptions: {
          credentials: credObj,
        },
        temperature: 0.1,
        topP: 0.95,
        topK: 40,
        model: "text-bison@002",
      }),
      vectorStore.asRetriever(5),
      {
        returnSourceDocuments: true,
      },
    )

    const temp2 = `
    Summarize the terms and conditions for signing up for the company ${prompt} in the format:
    Heading of company name
    Summary of what is important in Terms and Conditions: 
      - bullet points
    Things to be aware of:
      - bullet points

    If the company name provided isn't real, dont make up a random response and tell the user to please make sure the company they are asking about is real.
    
  `

  const result = await chain.call({query: temp2});
  console.log(result);
  return result;
}
