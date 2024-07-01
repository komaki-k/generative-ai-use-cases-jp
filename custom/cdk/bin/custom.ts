#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CustomStack } from '../lib/custom-stack';
import { CloudFrontWafStack } from  '../../../packages/cdk/lib/cloud-front-waf-stack';
import { DashboardStack } from  '../../../packages/cdk/lib/dashboard-stack';
import { GenerativeAiUseCasesStack } from  '../../../packages/cdk/lib/generative-ai-use-cases-stack';
import { SearchAgentStack } from '../../../packages/cdk/lib/search-agent-stack';

const app = new cdk.App();

/**
 * 設計思想
 * 
 * 既存のスタックは本来のgenU側で行われるので、ここでは追加のスタックのみ
 * 設定ファイルはgenUに合わせてcustom/cdk.jsonで有効化・無効化を設定
 * 
 * 一旦ここではナレッジベースの作成を有効化のみで行えるようにしてみる
 */

new CustomStack(app, 'CustomStack', {
  baseStackOutputs: {
    // 必要に応じてBaseStackからの出力値を渡す
    bucketName: 'example-bucket-name'
  }
});

app.synth();