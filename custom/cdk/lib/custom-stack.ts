import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface CustomStackProps extends cdk.StackProps {
  baseStackOutputs: { [key: string]: string };
}

export class CustomStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CustomStackProps) {
    super(scope, id, props);

    const baseBucketName = props.baseStackOutputs['bucketName'];

    new s3.Bucket(this, 'CustomBucket', {
      bucketName: `${baseBucketName}-custom`,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  }
}
