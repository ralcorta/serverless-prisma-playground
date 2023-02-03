import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
	service: 'serverless-playground',
	frameworkVersion: '3',
	provider: {
		name: 'aws',
		runtime: 'nodejs16.x',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
		}
	},
	plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node16',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10
			// watch: {
			// 	pattern: ['src/**/*.ts']
			// 	// ignore: ['temp/**/*']
			// }
		}
	},
	package: {
		individually: true,
		patterns: [
			'node_modules/.prisma/client/schema.prisma',
			'node_modules/.prisma/client/libquery_engine-*',
			'node_modules/.prisma/client/libquery_engine-rhel-*',
			'!node_modules/prisma/libquery_engine-*',
			'!node_modules/@prisma/engines/**'
		]
	},
	functions: {
		listProduct: {
			handler: 'src/lambda/product-list.handler',
			events: [
				{
					http: {
						path: '/product',
						method: 'get'
					}
				}
			]
		},
		createProduct: {
			handler: 'src/lambda/product-create.handler',
			events: [
				{
					http: {
						path: '/product',
						method: 'post'
					}
				}
			]
		}
	}
};

module.exports = serverlessConfiguration;
