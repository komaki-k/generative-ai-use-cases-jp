import { Construct } from "constructs";

export interface PollyProps {
}

export class Polly extends Construct {
  constructor(scope: Construct, id: string, props: PollyProps) {
    super(scope, id);
  }
}