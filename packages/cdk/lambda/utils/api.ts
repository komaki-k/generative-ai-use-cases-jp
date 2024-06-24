import bedrockApi from './bedrockApi';
import bedrockAgentApi from './bedrockAgentApi';
import sagemakerApi from './sagemakerApi';
import pollyApi from './pollyApi';

const api = {
  bedrock: bedrockApi,
  bedrockAgent: bedrockAgentApi,
  sagemaker: sagemakerApi,
  polly: pollyApi,
};

export default api;
