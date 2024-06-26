import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromMessages([
  ["human", "Tell me a short joke about {topic}"],
]);
const model = new ChatOpenAI({});
const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);

const response = await chain.invoke({
  topic: "ice cream",
});
console.log(response);
